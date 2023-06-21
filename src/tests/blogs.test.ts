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


describe('When logged in', ()=>{

	beforeEach(async ()=>{
		await page.login();
		await page.click('a.btn-floating');
	});


	test('Can see blog create form', async ()=>{
	
		const label = await page.getContentsOf('form label');
	
		expect(label).toBe('Blog Title');
	});

	describe('Using invalid inputs',()=>{
		beforeEach(async ()=>{
			await page.click('form button');
		});

		test('the form shows an error message', async ()=>{
			const titleError = await page.getContentsOf('.title .red-text');
			const contentError = await page.getContentsOf('.content .red-text');

			expect(titleError).toEqual('You must provide a value');
			expect(contentError).toEqual('You must provide a value');

		});
	});

	describe('Using valid inputs', ()=>{
		beforeEach(async ()=>{
			await page.type('input[name="title"]', 'My Title');
			await page.type('input[name="content"]', 'My Content');
			await page.click('form button');
		});

		test('Submitting takes user to review screen', async ()=>{
			const text = await page.getContentsOf('h5');
			expect(text).toEqual('Please confirm your entries');
		});
		test('Submitting then saving adds blog to index page', async ()=>{
			await page.click('button.green');
			await page.waitForSelector('.card');
			const title = await page.getContentsOf('.card-title');
			const content = await page.getContentsOf('p');
			expect(title).toEqual('My Title');
			expect(content).toEqual('My Content');
		});

	});
	

});