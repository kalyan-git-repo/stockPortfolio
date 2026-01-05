"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Label } from "@/components/ui/label"

export const description = "A simple area chart"

const chartData = [
  { sector: "financialSector", investment: 186 },
  { sector: "techSector", investment: 305 },
  { sector: "consumer", investment: 237 },
  { sector: "power", investment: 73 },
  { sector: "pipeSector", investment: 209 },
  { sector: "others", investment: 214 },
]

const chartConfig = {
  investment: {
    label: "Investment",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function ChartAreaDefault() {
  return (
    <div>
    <Card className="md:h-[70%] lg:h-1/2 w-[90%] md:w-[70%] lg:w-1/2 mx-auto gap-1">
      <CardHeader>
        <CardTitle className="lg:pt-3.5 lg:pb-3.5">Stock Data Exploration</CardTitle>
        <CardDescription>
          <h2 className="text-blue-600 pb-5">Log in to get the stock information from the Tanstack/react-table data and a Line graph, showing the sector-wise stock classification.</h2>
          <Label>
          <p className="text-pink-300 lg:text-end">Below displays a scenario of how the sector-wise categorization goes...</p>
          </Label>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-50 w-full p-1 md:p-1 lg:p-1">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
              left: 0,
              right: 0,
              bottom: 50
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sector"
              stroke={chartConfig.investment.color} // Use defined color
              tick={{ fill: chartConfig.investment.color }}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="investment"
              type="natural"
              fill="var(--color-investment)"
              fillOpacity={0.4}
              stroke="var(--color-investment)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid">
            <div className="flex items-center gap-2 leading-none font-medium">
              Current Data for the Trending Stocks... <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}
