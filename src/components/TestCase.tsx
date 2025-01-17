import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CodeTextArea } from '@/components/CodeTextArea';
import { X } from 'lucide-react';
import { NumberBadge } from '@/components/NumberBadge';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { TestCase as TestCaseType } from '@/types';
import { useTestCasesStore } from '@/stores/useTestCasesStore';
import { useDebounce } from '@/hooks/useDebounce';

interface TestCaseProps {
  index: number;
  testCase: TestCaseType;
}

export const TestCase = ({ index, testCase }: TestCaseProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(testCase.title);
  const [testCaseCode, setTestCaseCode] = useState<string>(testCase.testCase);
  const { id } = testCase;
  const debouncedValue = useDebounce(testCaseCode, 500);
  const debouncedTitle = useDebounce(title, 500);

  const { removeTestCase, updateTestCase } = useTestCasesStore();

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };

  const handleRemove = useCallback(() => {
    removeTestCase(id);
  }, [id, removeTestCase]);

  useEffect(() => {
    updateTestCase(id, { title: debouncedTitle, testCase: debouncedValue });
  }, [debouncedValue, id, debouncedTitle, updateTestCase]);
  return (
    <Card className="p-1 bg-muted flex flex-col gap-2 w-full border-0">
      <div className="border-2 rounded-lg border-dashed px-2">
        <CardTitle className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-5 w-full">
            <NumberBadge number={index + 1} />
            <div className="w-[70%]">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoFocus
                  spellCheck={false}
                  className="w-full text-lg bg-transparent border-transparent focus:outline-none"
                />
              ) : (
                <span
                  className="text-lg cursor-text title-overflow"
                  onClick={handleTitleClick}
                  spellCheck={false}
                >
                  {title}
                </span>
              )}
            </div>
          </div>
          <X
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleRemove}
          />
        </CardTitle>
        <CardContent className="bg-backgrounds p-0">
          <CodeTextArea
            value={testCaseCode}
            setValue={setTestCaseCode}
            placeholder="Call the method with the test case input here..."
            editable
          />
        </CardContent>
      </div>
    </Card>
  );
};
