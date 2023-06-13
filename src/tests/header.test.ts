import * as puppeteer from 'puppeteer'
import buffer from 'buffer'
import Keygrip from 'keygrip'
import getExport from '../config/keys';



let browser: puppeteer.Browser;
let page: puppeteer.Page;
beforeEach(async ()=>{
     browser = await puppeteer.launch({
        headless: false
     })
     page = await browser.newPage();
     await page.goto('http://localhost:3000')
});

afterEach(async ()=>{
    // await browser.close()
});


test('Header has the correct test', async ()=>{
 
 const text = await page.$eval('a.brand-logo', (l)=>l.innerHTML)
 
 expect(text).toBe('Blogster')
});

test('Clicking Login starts OAuth flow', async ()=>{

    await page.click('.right a')
    const url = page.url();

    expect(url).toMatch(/accounts\.google\.com/)
});

test.only('When signed in, shows logout button', async ()=>{
    const id = '6475c70f88c92d4389d5888d'

    const Buffer = buffer.Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    };
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    const keygrip = new Keygrip([getExport().cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);


    await page.setCookie({name: 'session', value: sessionString});
    await page.setCookie({name: 'session.sig', value: sig});

    await page.reload();
    await page.waitForSelector('a[href="/auth/logout"]')


   const text = await page.$eval('a[href="/auth/logout"]', (el)=>el.innerHTML)

    expect(text).toBe('Logout');
})


// 6475c70f88c92d4389d5888d