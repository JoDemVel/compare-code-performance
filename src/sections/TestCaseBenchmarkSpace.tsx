import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestCaseArea } from './TestCaseArea';
import { BenchmarkArea } from './BenchmarkArea';
import { ScrollArea } from '@/components/ui/scroll-area';

export const TestCaseBenchmarkSpace = () => {
  return (
    <Card className="h-full">
      <Tabs defaultValue="test-cases" className="w-full h-full">
        <CardHeader className="sticky top-0 z-10">
          <TabsList className="grid w-full grid-cols-2 border border-dashed border-gray-500">
            <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
            <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
          </TabsList>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-13rem)] ">
          <CardContent>
            <TabsContent value="test-cases">
              <TestCaseArea />
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
