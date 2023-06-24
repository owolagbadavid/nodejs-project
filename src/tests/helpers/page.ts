
import type { Page, Browser } from 'puppeteer';
import * as puppeteer from 'puppeteer';
import userFactory from '../factories/user.factory';
import sessionFactory from '../factories/session.factory';
export type MyPage = Page & Browser & CustomPage;
export default class CustomPage {
	static async build() {
		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox']
		});

		const page = await browser.newPage();

		const customPage = new CustomPage(page);

		return new Proxy(customPage, {
			get: function (target, property){
				return target[property] || browser[property]?.bind(browser) || page[property]?.bind(page);
			}
		}) as MyPage;
	}
	constructor(public page: Page) {}

	async login() {

		const user = await userFactory();

		const { session, sig } = sessionFactory(user);
    
		await this.page.setCookie({ name: 'session', value: session });
		await this.page.setCookie({ name: 'session.sig', value: sig });

		await this.page.goto('http://localhost:3000/blogs');
		await this.page.waitForSelector('a[href="/auth/logout"]');

	}

	async getContentsOf(selector: string) {
		return this.page.$eval(selector, (el)=> el.innerHTML);
	}

	async get(path: string) {
		return this.page.evaluate((_path: string)=>{
			return fetch(_path,{
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => res.json());
		}, path);
	}

	async post(path: string, data: object ) {
		return this.page.evaluate((_path: string, _data: object)=>{
			return fetch(_path,{
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(_data)
			}).then(res => res.json());
		}, path, data);

	}

	execRequests(actions: { method: string, path: string, data?: object }[]): Promise<unknown[]> {
		return Promise.all(actions.map(({method, path, data}) => {
			return this[method](path, data);

		})
		);
	}
}
