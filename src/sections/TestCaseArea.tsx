import { TestCase } from '@/components/TestCase';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCallback } from 'react';

export const TestCaseArea = () => {
  const handleRemove = useCallback(() => {
    console.log('x');
  }, []);
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-end">
        <div className="bg-muted p-1 rounded-xl hover:scale-105 transition-transform duration-200 ">
          <div className="rounded-lg border-2 border-dashed">
            <Button variant="outline" className="hover:bg-card">
              <span>Add Case</span>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full 2xl:pb-16 xl:pb-16 lg:pb-24 md:pb-16 sm:pb-16 pb-16">
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
        <TestCase onRemove={handleRemove} />
      </div>
    </div>
  );
};
