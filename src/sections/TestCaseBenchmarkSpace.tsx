import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestCaseArea } from '@/sections/TestCaseArea';
import { BenchmarkArea } from '@/sections/BenchmarkArea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OutputArea } from '@/sections/OutputArea';

export const TestCaseBenchmarkSpace = () => {
  return (
    <Card className="h-full">
      <Tabs defaultValue="test-cases" className="w-full h-full">
        <CardHeader className="p-3">
          <div className="bg-muted rounded-xl p-1">
            <TabsList className="h-auto w-full flex flex-wrap items-center justify-start gap-2 border-2 border-dashed">
              <TabsTrigger value="test-cases" className="flex-auto text-center">
                Test Cases
              </TabsTrigger>
              <TabsTrigger value="output" className="flex-auto text-center">
                Output
              </TabsTrigger>
              <TabsTrigger value="benchmark" className="flex-auto text-center">
                Benchmark
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <ScrollArea className="h-full">
          <CardContent>
            <TabsContent value="test-cases">
              <TestCaseArea />
            </TabsContent>
            <TabsContent value="output">
              <OutputArea />
            </TabsContent>
            <TabsContent value="benchmark">
              <BenchmarkArea />
            </TabsContent>
          </CardContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};
