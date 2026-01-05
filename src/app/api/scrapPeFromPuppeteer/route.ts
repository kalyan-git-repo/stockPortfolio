'use server'

import { initializeBrowser } from '@/lib/puppeteer';
import { NextRequest, NextResponse } from 'next/server';


const browser: any = await initializeBrowser()

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const ticker: any = searchParams.get('symbol');
    const url = `https://www.google.com/finance/quote/${ticker}`;
    let page: any
    try {
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(300000);
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        // Allow time for elements to render

        const peRatio = await page.evaluate(() => {
            let peValue = 'not applicable'
            const peLabel = Array.from(document.querySelectorAll('div')).find(el => el.textContent.includes('P/E ratio'))
            const text = peLabel?.textContent
            console.log("the text including pe ratio is:", text)
            const startString = 'P/E ratioThe ratio of current share price to trailing twelve month EPS that signals if the price is high or low compared to other stocks';
            const endString = 'Dividend yieldThe ratio of annual dividend to current share price';
            const startIndex = text ? text.indexOf(startString) + startString.length : 0
            const endIndex = text ? text.indexOf(endString, startIndex) : 0
            if (startIndex !== -1 && endIndex !== -1) {
              {
                peValue = text ? text.substring(startIndex, endIndex) : 'not applicable';
                console.log(peValue); // Output: "Active"
              }
            }
            return peValue;
        })
        console.log(`Ticker: ${ticker}`);
        if (peRatio === '-'){
          console.log(`P/E Ratio: ${peRatio}`);
          return NextResponse.json({ peratio : 'Not Available' }, { status: 200 });
        }
        console.log(`P/E Ratio: ${peRatio}`);
        return NextResponse.json({ peratio : peRatio }, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: `Error scraping ${ticker}: ${error.message}`}, { status: 500 })
    } finally {
      if(page) {
        await page.close();
      }
    }
}
