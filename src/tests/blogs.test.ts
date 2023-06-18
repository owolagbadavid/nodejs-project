import Page, { MyPage } from './helpers/page';
import teardown from './setup';

let page: MyPage;

beforeEach(async ()=>{
	page = await Page.build();
	await page.goto('http://localhost:3000');
});

afterEach(async () =>{
	await page.close();
});

afterAll(async ()=> await teardown());

test('When logged in, can see blog create form', async ()=>{
	await page.login();
	await page.click('a.btn-floating');

	const label = await page.getContentsOf('form label');

	expect(label).toBe('Blog Title');
});