 "use client"; // Columns are typically defined in a client component

import { columns } from "@/components/stocksTable/columns";
import  DataTable  from "@/components/stocksTable/data-table";
import { useScrapStockData, useFetchStockPrice } from "@/hooks/useDataService";
import { StockValuesLoading } from "@/components/common/StockValuesLoading";
import { datas, sector_wise_summary } from "@/lib/constants";
import MultiLineChart from "@/components/common/sectorWiseStockGraph";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardDescription, CardAction, CardTitle } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";

export default function TanstackTableClient() {
  let sectorWiseSummary = sector_wise_summary
  
  const queryResults_cmp = useFetchStockPrice(datas)
  const queryResults_peratio = useScrapStockData(datas)

  const dataIncludingCmp: any = queryResults_cmp.map((result, index) => {
    if (result.isLoading) {
      return {
          ...datas[index],
          nseorbse: `${datas[index].nseorbse_for_yfinance} or ${datas[index].nseorbse_for_puppet}`,
          cmp: 1,
        }
    }
    if (result.isError) {
      return {
          ...datas[index],
          nseorbse: `${datas[index].nseorbse_for_yfinance} or ${datas[index].nseorbse_for_puppet}`,
          cmp: 0,
        }
    }
    if (result.data) {
      console.log("the cmp or the result.data is", result.data)
      let cmp: any = 1
      if (typeof (result.data) !== 'string' || (result.data).trim() === '') {
        cmp = cmp
      } 
      else{
      if (Number.isFinite(Number(result.data))){
        cmp = Number((result.data))
      }}
      console.log("the sectorwisesummary is:", sectorWiseSummary)
      const sectorWiseSummarynew: any = sectorWiseSummary.map((item: any) => {
        console.log("the individual item of sectorwisesummary:", item)
        if (item.stocksIncluded.includes(datas[index].particulars)) {
          return {
            ...item,
            investment: item.investment + (datas[index].quantity * datas[index].purchaseprice),
            presentValue: item.presentValue + (datas[index].quantity * cmp),
            gainorloss: item.investment - item.presentValue,
          }
        }
        return {
          ...item
        }
      })
      sectorWiseSummary = sectorWiseSummarynew
      return {
          ...datas[index],
          nseorbse: `${datas[index].nseorbse_for_yfinance} or ${datas[index].nseorbse_for_puppet}`,
          cmp: cmp,
        }
    } 
  });

  const finalData: any = queryResults_peratio.map((result, index) => {
    if (result.isLoading) {
      return {
          ...dataIncludingCmp[index],
          peratio: 'loading...',
        }
    }
    if (result.isError) {
      // Return a specific default value for this failed query
      return {
          ...dataIncludingCmp[index],
          peratio: 'Error Fetching:Slow Network',
        }
    }
    if (result.data) {
      return {
          ...dataIncludingCmp[index],
          peratio: result.data,
        }
    } 
  });

  return (
    <>
    <div>
      { finalData ?  (
        <>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 pb-2 text-3xl">Portfolio of the classified stock data</CardTitle>
            <CardDescription>
              <h3 className="pb-3 text-blue-600 text-2xl">👉 Table dynamically updates the stock datas which are periodically fetched from google and yahoo finance</h3>
              <h3 className="text-blue-600 text-2xl">👉 Graph instantly replicates the sector-wise classification of the table stock on getting the real-time updates</h3>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-col gap-6">
              <div className="container mx-auto">
                <h2 className="pb-2 text-blue-600">NSE/BSE Stock Informations</h2>
                <p className="pb-3 text-blue-300">Table Data</p>
                <DataTable columns={columns} data={finalData}/>
              </div>
              <div>
                <h2 className="pb-2 text-blue-600">Sector Wise Summary of the Stocks</h2>
                <p className="pb-3 text-blue-300">Chart Data</p>
                <MultiLineChart chartData={sectorWiseSummary} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full">
              <UserButton />
            </Button>
          </CardFooter>
        </Card>
        </>
        
      )  :  (<StockValuesLoading />)
      }
    </div>
    </>
  )
}

