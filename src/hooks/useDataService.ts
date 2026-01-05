'use client'

import { useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import { fetchStockCmp, scrapStockPe } from "@/services/stockDataService";

export function useScrapStockData(datas: any) {
  const results = useQueries({
    queries: datas.map((item: any) => ({
      queryKey: ['scrapStockPeratio', item.nseorbse_for_puppet],
      queryFn: () => scrapStockPe(item.nseorbse_for_puppet!),
      //refetchInterval: 1000 * 60 * 5,
      gcTime: Infinity,
      staleTime: 1000 * 60 * 100,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: !!item.nseorbse_for_puppet
    })),
  })
  return results
}

export function useFetchStockPrice(datas: any) {
  const results = useQueries({
    queries: datas.map((item: any) => ({
      queryKey: ['fetchStockCmp', item.nseorbse_for_yfinance],
      queryFn: () => fetchStockCmp(item.nseorbse_for_yfinance!),
      //refetchInterval: 1000 * 60 * 5,
      gcTime: Infinity,
      staleTime: 1000 * 60 * 100,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: !!item.nseorbse_for_puppet
    })),
  })
  return results;
}