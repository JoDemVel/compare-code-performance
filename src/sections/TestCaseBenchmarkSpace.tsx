import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestCaseArea } from '@/sections/TestCaseArea';
import { BenchmarkArea } from '@/sections/BenchmarkArea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OutputArea } from '@/sections/OutputArea';
import { useResultStore } from '@/stores/useResultStore';
import { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useTheme } from '@/components/theme-provider';
import { Loader } from '@/components/Loader';

export const TestCaseBenchmarkSpace = () => {
  const { isEmpty, isLoading } = useResultStore();
  const [activeTab, setActiveTab] = useState<string>(
    isEmpty ? 'test-cases' : 'benchmark'
  );
  const { theme } = useTheme();
  const getVariant = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    if (isLoading) {
      setActiveTab('benchmark');
    } else if (isEmpty) {
      setActiveTab('test-cases');
    }
  }, [isEmpty, isLoading]);

  return (
    <Card className="h-full overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className="w-full h-full"
      >
        <CardHeader className="p-3">
          <div className="bg-muted rounded-xl p-1">
            <TabsList className="h-auto w-full flex flex-wrap items-center justify-start gap-2 border-2 border-dashed">
              <TabsTrigger
                data-tooltip-id="test-cases-tab"
                value="test-cases"
                className="flex-auto text-center"
              >
                <span>Test Cases</span>
              </TabsTrigger>

              <div
                data-tooltip-id="output-tab"
                className="relative flex-auto text-center"
              >
                <TabsTrigger
                  value="output"
                  className="w-full"
                  disabled={isEmpty}
                >
                  <span>Output</span>
                </TabsTrigger>
              </div>

              <div
                data-tooltip-id="benchmark-tab"
                className="relative flex-auto text-center"
              >
                <TabsTrigger
                  value="benchmark"
                  className="w-full"
                  disabled={isEmpty}
                >
                  <span>Benchmark</span>
                </TabsTrigger>
              </div>
            </TabsList>
          </div>
        </CardHeader>
        <ScrollArea className="h-full">
          <CardContent>
            <TabsContent value="test-cases">
              <TestCaseArea />
            </TabsContent>
            <TabsContent value="output">
              {isEmpty ? (
                <div className="h-[300px]">
                  <Loader text="Running Code..." />
                </div>
              ) : (
                <OutputArea />
              )}
            </TabsContent>
            <TabsContent value="benchmark">
              {isLoading ? (
                <div className="h-[300px]">
                  <Loader text="Running Code..." />
                </div>
              ) : (
                <BenchmarkArea />
              )}
            </TabsContent>
          </CardContent>
        </ScrollArea>
      </Tabs>
      {isEmpty && (
        <>
          <Tooltip
            id="output-tab"
            place="bottom"
            variant={getVariant}
            content="Run the test cases to see the output"
            opacity={0.5}
          />
          <Tooltip
            id="benchmark-tab"
            place="bottom-end"
            variant={getVariant}
            content="Run the test cases to see the benchmark"
            opacity={0.5}
          />
        </>
      )}
    </Card>
  );
};

