'use server'

import { initializeBrowser } from '@/lib/puppeteer';
import { NextRequest, NextResponse } from 'next/server';

const browser: any = await initializeBrowser()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const ticker: any = searchParams.get('symbol');
    const url = `https://finance.yahoo.com/quote/${ticker}`;
    let page: any
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(300000);
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const Content = await page.evaluate(() => {
          //const element = Array.from(document.querySelectorAll('span[data-testid="qsp-price"]'))//.find(el => el.textContent.includes('Tata Power Company Limited (TATAPOWER.BO)'))
          const element = document.querySelector('[data-testid="qsp-price"]')
          return element ? element.textContent.trim() : "not available";
        });
        console.log(`The current stock price for ${ticker} is: ${Content}`);
        return NextResponse.json({ cmp : Content }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: `Error scraping ${ticker}: ${error.message}`}, { status: 500 })
    } finally {
      if(page) {
        await page.close();
      }
    }
}

