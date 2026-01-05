const puppeteer = require('puppeteer');

let browser: any;

export async function initializeBrowser() {
    browser = await puppeteer.launch({headless: true, protocolTimeout: 300000});
    console.log('Browser launched successfully.');
    return browser
}


export async function closeBrowser() {
    if (browser) {
        await browser.close();
        console.log('Browser closed.');
    }
}



