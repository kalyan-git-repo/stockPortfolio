'use client'
import axios from 'axios';
//import { Semaphore } from 'async-mutex';

// Limit to 5 concurrent requests
//const semaphore = new Semaphore(5);

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000';

/*export const limitedFetchStockCmp = async (symbol: any) => {
  return semaphore.runExclusive(async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Example: 0.5s delay
    try {
    const response = await axios.get(`${baseURL}/api/fetchPriceFromYahoo`, {
      params: {
        symbol: symbol,
      }
    });
    console.log("the axios response data for cmp is:", response.data);
    return response.data.cmp;
  } catch (error) {
    console.error('Error fetching axios cmp data:', error);
  }
  })
};

export const limitedScrapStockPe = async (symbol: any) => {
  return semaphore.runExclusive(async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Example: 0.5s delay
    try {
    const response = await axios.get(`${baseURL}/api/scrapPeFromPuppeteer`, {
      params: {
        symbol: symbol,
      }
    });
    console.log("the axios response data for peratio is:", response.data);
    return response.data.peratio;
  } catch (error) {
    console.error('Error fetching axios peratio data:', error);
  }
  });
};*/


export const fetchStockCmp = async (symbol: any) => {
  try {
    const response = await axios.get(`${baseURL}/api/fetchPriceFromYahoo`, {
      params: {
        symbol: symbol,
      }
    });
    console.log("the axios response data for cmp is:", response.data);
    return response.data.cmp;
  } catch (error) {
    console.error('Error fetching axios cmp data:', error);
  }
};

export const scrapStockPe = async (symbol: any) => {
  try {
    const response = await axios.get(`${baseURL}/api/scrapPeFromPuppeteer`, {
      params: {
        symbol: symbol,
      }
    });
    console.log("the axios response data for peratio is:", response.data);
    return response.data.peratio;
  } catch (error) {
    console.error('Error fetching axios peratio data:', error);
  }
};