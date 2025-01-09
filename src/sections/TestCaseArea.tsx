import { TestCase } from '@/components/TestCase';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCallback } from 'react';

export const TestCaseArea = () => {
  const handleRemove = useCallback(() => {
    console.log('x');
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button variant="outline" className="border-gray-500 hover:bg-muted">
          <span>Add Case</span>
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
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
