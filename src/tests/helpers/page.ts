
import type { Page, Browser } from 'puppeteer';
import * as puppeteer from 'puppeteer';
import userFactory from '../factories/user.factory';
import sessionFactory from '../factories/session.factory';
export type MyPage = Page & Browser & CustomPage;
export default class CustomPage {
	static async build() {
		const browser = await puppeteer.launch({
			headless: false
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

		await this.page.reload();
		await this.page.waitForSelector('a[href="/auth/logout"]');

	}
}
