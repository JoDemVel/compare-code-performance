import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo, useState } from 'react';
import { TableResult } from '@/components/TableResult';
import { useResultStore } from '@/stores/useResultStore';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { abbreviateNumberFormatter } from '@/utils/formatters';

export const BenchmarkArea = () => {
  const { results } = useResultStore();
  const [dataSelected, setDataSelected] = useState('run-time');
  const titlesResults = useMemo(() => {
    if (results.length === 0) return [];
    return results[0].results.map((output) => output.editorTitle);
  }, [results]);
  const chartConfig = Object.fromEntries(
    titlesResults.map((title, index) => [
      title,
      { label: title, color: `hsl(var(--chart-${index + 1}))` },
    ])
  ) as ChartConfig;

  const data = useMemo(() => {
    return results.map((result) => ({
      'Test Case': `${result.index + 1}-${result.testCase}`,
      ...result.results.reduce((acc: Record<string, string>, output) => {
        acc[output.editorTitle] =
          dataSelected === 'ops-per-sec'
            ? String(output.output.opsPerSec)
            : output.output.runTime.toFixed(3);
        return acc;
      }, {}),
    }));
  }, [results, dataSelected]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center 2xl:pb-16 xl:pb-16 lg:pb-24 md:pb-16 sm:pb-16 pb-16">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-semibold">Benchmark Results</h2>
        <Select
          value={dataSelected}
          defaultValue="run-time"
          onValueChange={(value) => {
            setDataSelected(value);
          }}
        >
          <SelectTrigger className="w-[130px] border-inherit border-dashed border-2 focus:ring-0">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            <SelectItem value="run-time">Run Time</SelectItem>
            <SelectItem value="ops-per-sec">Ops. Per Sec</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="w-[90%]">
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke={'#c4c4c4'}
              opacity={0.4}
            />
            <XAxis
              dataKey="Test Case"
              tickMargin={10}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={abbreviateNumberFormatter}
              label={{
                value:
                  dataSelected === 'ops-per-sec'
                    ? 'Ops. Per Sec'
                    : 'Run Time (ms)',
                angle: -90,
                position: 'insideLeft',
                dy: 30,
              }}
              interval={0}
              allowDataOverflow={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {titlesResults.map((title, index) => (
              <Line
                key={index}
                connectNulls
                type="monotone"
                dataKey={title}
                stroke={chartConfig[title].color}
                strokeWidth={2}
                dot={false}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="w-[90%]">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold my-4">Detailed Results</h3>
          <TableResult data={data} titles={['Test Case', ...titlesResults]} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
