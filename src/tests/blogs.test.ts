import Page, { MyPage } from './helpers/page';

let page: MyPage;

beforeEach(async ()=>{
	page = await Page.build();
	await page.goto('http://localhost:3000');
});

afterEach(async () =>{
	await page.close();
});

test('When logged in, can see blog create form', async ()=>{
	await page.login();
    
});