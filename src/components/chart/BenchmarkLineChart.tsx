import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface LineChartProps {
  chartConfig: ChartConfig;
  data: unknown[];
  yAxisTickFormatter: (value: string | number) => string;
  yAxisValueLabel: string;
  tooltipFormatter: (value: string | number) => string;
  titles: string[];
}

export const BenchmarkLineChart = ({
  chartConfig,
  data,
  yAxisTickFormatter,
  yAxisValueLabel,
  tooltipFormatter,
  titles,
}: LineChartProps) => {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid strokeDasharray="4 4" stroke={'#c4c4c4'} opacity={0.4} />
        <XAxis
          dataKey="Test Case"
          tickMargin={10}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={yAxisTickFormatter}
          label={{
            value: yAxisValueLabel,
            angle: -90,
            position: 'insideLeft',
            dy: 35,
            dx: -5,
          }}
          interval={0}
          allowDataOverflow={true}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              formatter={(_value, _name, props) => {
                const { value, color } = props;
                return (
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1 h-3 rounded"
                        style={{ backgroundColor: color }}
                      ></span>
                      <p className="font-semibold">Average:</p>
                    </div>
                    <span>{tooltipFormatter(String(value))}</span>
                  </div>
                );
              }}
            />
          }
        />
        {titles.map((title, index) => (
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
  );
};
