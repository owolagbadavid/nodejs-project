import * as puppeteer from 'puppeteer';
import sessionFactory from './factories/session.factory';
import userFactory from './factories/user.factory';

let browser: puppeteer.Browser;
let page: puppeteer.Page;
beforeEach(async () => {
	browser = await puppeteer.launch({
		headless: false,
	});
	page = await browser.newPage();
	await page.goto('http://localhost:3000');
});

afterEach(async () => {
	await browser.close();
});

test('Header has the correct test', async () => {
	const text = await page.$eval('a.brand-logo', (l) => l.innerHTML);

	expect(text).toBe('Blogster');
});

test('Clicking Login starts OAuth flow', async () => {
	await page.click('.right a');
	const url = page.url();

	expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
	const user = await userFactory();

	const { session, sig } = sessionFactory(user);
    
	await page.setCookie({ name: 'session', value: session });
	await page.setCookie({ name: 'session.sig', value: sig });

	await page.reload();
	await page.waitForSelector('a[href="/auth/logout"]');

	const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

	expect(text).toBe('Logout');
});

// 6475c70f88c92d4389d5888d


