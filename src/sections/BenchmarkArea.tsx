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

  const avgData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const sums = titlesResults.reduce(
      (acc: Record<string, number>, title: string) => {
        acc[title] = 0;
        return acc;
      },
      {}
    );

    data.forEach((item: Record<string, string>) => {
      titlesResults.forEach((title) => {
        sums[title] += parseFloat(item[title]);
      });
    });

    const averages = titlesResults.map((title) => ({
      editor: title,
      avg: parseFloat((sums[title] / data.length).toFixed(2)),
      fill: chartConfig[title].color,
    }));

    averages.sort((a, b) => b.avg - a.avg);

    const max = Math.max(...averages.map((avg) => avg.avg));
    const percentages: {
      editor: string;
      percentage: number;
      fill?: string;
      invertedPercentage?: number;
      avg: number;
    }[] = averages.map((avg) => ({
      editor: avg.editor,
      percentage: (avg.avg / max) * 100,
      fill: avg.fill,
      avg: avg.avg,
    }));

    percentages.forEach((percentage, index) => {
      percentage.invertedPercentage =
        percentages[percentages.length - 1 - index].percentage;
    });

    return percentages;
  }, [chartConfig, data, titlesResults]);

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
        <BenchmarkLineChart
          chartConfig={chartConfig}
          data={data}
          yAxisTickFormatter={
            dataSelected === 'run-time'
              ? mlsFormatter
              : abbreviateNumberFormatter
          }
          yAxisValueLabel={
            dataSelected === 'ops-per-sec' ? 'Ops. Per Sec' : 'Run Time (ms)'
          }
          tooltipFormatter={
            dataSelected === 'run-time'
              ? mlsFormatter
              : abbreviateNumberFormatter
          }
          titles={titlesResults}
        />
      </ScrollArea>
      <ScrollArea className="w-[90%]">
        <h2 className="text-lg font-semibold text-foreground">
          Average Results
        </h2>
        <BenchmarkBarChart
          chartConfig={chartConfig}
          avgData={avgData}
          yAxisDataKey="editor"
          tooltipFormatter={
            dataSelected === 'run-time'
              ? mlsFormatter
              : abbreviateNumberFormatter
          }
          xAxisDataKey="percentage"
          barDataKey={
            dataSelected === 'run-time' ? 'invertedPercentage' : 'percentage'
          }
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
