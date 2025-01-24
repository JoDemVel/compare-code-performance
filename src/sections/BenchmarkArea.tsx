import { ChartConfig } from '@/components/ui/chart';
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
import { abbreviateNumberFormatter, mlsFormatter } from '@/utils/formatters';
import { BenchmarkLineChart } from '@/components/chart/BenchmarkLineChart';
import { BenchmarkBarChart } from '@/components/chart/BenchmarkBarChart';

export const BenchmarkArea = () => {
  const { results } = useResultStore();
  const [selectedMetric, setSelectedMetric] = useState('run-time');

  const titlesResults = useMemo(
    () =>
      results.length > 0
        ? results[0].results.map((output) => output.editorTitle)
        : [],
    [results]
  );

  const chartConfig = useMemo(() => {
    return Object.fromEntries(
      titlesResults.map((title, index) => [
        title,
        { label: title, color: `hsl(var(--chart-${index + 1}))` },
      ])
    ) as ChartConfig;
  }, [titlesResults]);

  const data = useMemo(() => {
    return results.map(
      (result): Record<string, string> => ({
        'Test Case': `${result.index + 1}-${result.testCase}`,
        ...result.results.reduce((acc: Record<string, string>, output) => {
          acc[output.editorTitle] =
            selectedMetric === 'ops-per-sec'
              ? String(output.output.opsPerSec)
              : output.output.runTime.toFixed(3);
          return acc;
        }, {}),
      })
    );
  }, [results, selectedMetric]);

  const avgData = useMemo(() => {
    if (!data.length) return [];

    const averages = titlesResults.map((title) => {
      const total = data.reduce(
        (sum, item: Record<string, string>) => sum + parseFloat(item[title]),
        0
      );
      return {
        editor: title,
        avg: parseFloat((total / data.length).toFixed(2)),
        fill: chartConfig[title].color,
      };
    });

    const sortedAverages = [...averages].sort((a, b) => b.avg - a.avg);

    const max = Math.max(...averages.map((avg) => avg.avg));
    return averages.map((avg) => {
      const invertedIndex = sortedAverages.findIndex(
        (sortedAvg) => sortedAvg.avg === avg.avg
      );

      return {
        ...avg,
        percentage: (avg.avg / max) * 100,
        invertedPercentage: (sortedAverages[invertedIndex].avg / max) * 100,
      };
    });
  }, [chartConfig, data, titlesResults]);

  const isRunTime = selectedMetric === 'run-time';
  const formatter = isRunTime ? mlsFormatter : abbreviateNumberFormatter;
  const valueLabel = isRunTime ? 'Run Time (ms)' : 'Ops. Per Sec';

  return (
    <div className="flex flex-col gap-4 justify-center items-center pb-16">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-semibold">Benchmark Results</h2>
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
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
        <BenchmarkLineChart
          chartConfig={chartConfig}
          data={data}
          yAxisTickFormatter={formatter}
          yAxisValueLabel={valueLabel}
          tooltipFormatter={formatter}
          titles={titlesResults}
        />
      </ScrollArea>
      <ScrollArea className="w-[90%]">
        <h2 className="text-lg font-semibold text-foreground">
          Performance Results
        </h2>
        <BenchmarkBarChart
          chartConfig={chartConfig}
          avgData={avgData}
          yAxisDataKey="editor"
          tooltipFormatter={formatter}
          xAxisDataKey="percentage"
          barDataKey={isRunTime ? 'invertedPercentage' : 'percentage'}
        />
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
