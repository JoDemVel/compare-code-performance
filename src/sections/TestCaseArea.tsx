import { TestCase } from '@/components/TestCase';
import { Button } from '@/components/ui/button';
import { useLanguagesStore } from '@/stores/useLanguagesStore';
import { useResultStore } from '@/stores/useResultStore';
import { useTestCasesStore } from '@/stores/useTestCasesStore';
import { Plus } from 'lucide-react';
import { useCallback } from 'react';

export const TestCaseArea = () => {
  const { dataTestCases, addTestCase } = useTestCasesStore();
  const { clearResults } = useResultStore();
  const { selectedLanguage } = useLanguagesStore();
  const testCases =
    dataTestCases.find(
      (dataTestCase) => dataTestCase.languageId === selectedLanguage.id
    )?.testCases || [];

  const handleAdd = useCallback(() => {
    addTestCase(selectedLanguage.id, {
      id: Date.now().toString(),
      title: 'Test Case',
      testCase: '',
    });
    clearResults();
  }, [addTestCase, clearResults, selectedLanguage.id]);
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-end gap-5">
        <div className="bg-muted p-1 rounded-xl hover:scale-105 transition-transform duration-200 ">
          <div className="rounded-lg border-2 border-dashed">
            <Button
              variant="ghost"
              className="hover:bg-card"
              onClick={handleAdd}
            >
              <span>Add Case</span>
              <Plus />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full 2xl:pb-16 xl:pb-16 lg:pb-24 md:pb-16 sm:pb-16 pb-16">
        {testCases.map((testCase, index) => (
          <TestCase key={testCase.id} index={index} testCase={testCase}/>
        ))}
      </div>
    </div>
  );
};
