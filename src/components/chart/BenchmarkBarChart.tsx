import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getColorByPercentage } from '@/utils/colorPercentage';

interface BenchmarkBarProps {
  chartConfig: ChartConfig;
  yAxisDataKey: string;
  avgData: unknown[];
  tooltipFormatter: (value: string | number) => string;
  xAxisDataKey: string;
  barDataKey: string;
}

export const BenchmarkBarChart = ({
  chartConfig,
  avgData,
  yAxisDataKey,
  tooltipFormatter,
  xAxisDataKey,
  barDataKey,
}: BenchmarkBarProps) => {
  return (
    <ChartContainer config={chartConfig} className="h-[80px] w-full">
      <BarChart
        accessibilityLayer
        data={avgData}
        layout="vertical"
        margin={{
          left: 30,
        }}
      >
        <YAxis
          dataKey={yAxisDataKey}
          type="category"
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          orientation="left"
          tickFormatter={(text) =>
            text.length > 12 ? `${text.substring(0, 12)}...` : text
          }
        />
        <XAxis dataKey={xAxisDataKey} type="number" hide />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(_value, _name, props) => {
                const { avg, fill } = props.payload;
                const { value } = props;
                return (
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1 h-full rounded"
                      style={{ backgroundColor: fill }}
                    ></span>
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">Average:</p>
                        <span>{tooltipFormatter(avg)}</span>
                      </div>
                      <span
                        className={getColorByPercentage(Number(value))}
                      >{`${Number(value).toFixed(2)} %`}</span>
                    </div>
                  </div>
                );
              }}
            />
          }
        />
        <Bar dataKey={barDataKey} layout="vertical" radius={4} barSize={30} />
      </BarChart>
    </ChartContainer>
  );
};
