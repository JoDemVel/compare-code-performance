import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import React from 'react';
import { TableResult } from '@/components/TableResult';

const chartConfig = {
  alg1: {
    label: 'Algorithm 1',
    color: 'hsl(var(--chart-1))',
  },
  alg2: {
    label: 'Algorithm 2',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const chartData = [
  { 'test-case': 'TC-1', alg1: 186, alg2: 80 },
  { 'test-case': 'TC-2', alg1: 305, alg2: 200 },
  { 'test-case': 'TC-3', alg1: 237, alg2: 120 },
  { 'test-case': 'TC-4', alg1: 73, alg2: 190 },
  { 'test-case': 'TC-5', alg1: 209, alg2: 130 },
  { 'test-case': 'TC-6', alg1: 214, alg2: 140 },
  { 'test-case': 'TC-7', alg1: 254, alg2: 180 },
  { 'test-case': 'TC-8', alg1: 196, alg2: 100 },
  { 'test-case': 'TC-9', alg1: 178, alg2: 160 },
  { 'test-case': 'TC-10', alg1: 256, alg2: 220 },
];
const initialBenchmarkResults = [
  {
    input: 'Case 1',
    implementation1: 0.5,
    implementation2: 0.8,
  },
  {
    input: 'Case 2',
    implementation1: 0.3,
    implementation2: 0.4,
  },
  {
    input: 'Case 3',
    implementation1: 0.6,
    implementation2: 0.7,
  },
  {
    input: 'Case 4',
    implementation1: 0.2,
    implementation2: 0.3,
  },
  {
    input: 'Case 5',
    implementation1: 0.4,
    implementation2: 0.5,
  },
  {
    input: 'Case 6',
    implementation1: 0.7,
    implementation2: 0.8,
  },
  {
    input: 'Case 7',
    implementation1: 0.1,
    implementation2: 0.2,
  },
  {
    input: 'Case 8',
    implementation1: 0.9,
    implementation2: 1.0,
  },
  {
    input: 'Case 9',
    implementation1: 0.8,
    implementation2: 0.9,
  },
  {
    input: 'Case 10',
    implementation1: 0.5,
    implementation2: 0.6,
  },
];

export const BenchmarkArea = () => {
  const [benchmarkResults, setBenchmarkResults] = React.useState(
    initialBenchmarkResults
  );

  return (
    <div className="flex flex-col gap-4 2xl:pb-16 xl:pb-16 lg:pb-24 md:pb-16 sm:pb-16 pb-16">
      <h2 className="text-xl font-semibold ">Benchmark Results</h2>
      <ChartContainer config={chartConfig}>
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={'#c4c4c4'}
            opacity={0.4}
          />
          <XAxis
            dataKey="test-case"
            tickMargin={10}
            interval="preserveStartEnd"
          />
          <YAxis
            label={{
              value: 'Time (ms)',
              angle: -90,
              position: 'insideLeft',
              dy: 30,
            }}
            domain={[0, 'auto']}
            tickMargin={10}
            tickFormatter={(value) => value.toFixed(0)}
            orientation="left"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="alg1"
            type="natural"
            fill="var(--color-alg1)"
            fillOpacity={0.4}
            stroke="var(--color-alg1)"
          />
          <Line
            dataKey="alg2"
            type="natural"
            fill="var(--color-alg2)"
            fillOpacity={0.4}
            stroke="var(--color-alg2)"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
      {/* <div className="space-y-4">
        <h3 className="text-lg font-semibold my-4">Detailed Results</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="font-medium">Input</div>
          <div className="font-medium">Two Pointer (ms)</div>
          <div className="font-medium">Hash Map (ms)</div>
          {benchmarkResults.map((result, index) => (
            <React.Fragment key={index}>
              <div className="truncate">{result.input}</div>
              <div>{result.implementation1.toFixed(3)}</div>
              <div>{result.implementation2.toFixed(3)}</div>
            </React.Fragment>
          ))}
        </div>
      </div> */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold my-4">Detailed Results</h3>
        <TableResult
          data={benchmarkResults}
          titles={['input', 'implementation1', 'implementation2']}
        />
      </div>
    </div>
  );
};
