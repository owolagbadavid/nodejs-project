import Page, {MyPage} from './helpers/page';


let page: MyPage;
beforeEach(async () => {

	page = await Page.build();
	await page.goto('http://localhost:3000');
});

afterEach(async () => {
	await page.close();
});

test('Header has the correct test', async () => {
	const text = await page.getContentsOf('a.brand-logo');

	expect(text).toBe('Blogster');
});

test('Clicking Login starts OAuth flow', async () => {
	await page.click('.right a');
	const url = page.url();

	expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
	await page.login();
	const text = await page.getContentsOf('a[href="/auth/logout"]');

	expect(text).toBe('Logout');
});

// 6475c70f88c92d4389d5888d


