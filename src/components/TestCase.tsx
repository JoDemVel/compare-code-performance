import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { CodeTextArea } from '@/components/CodeTextArea';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { TestCase as TestCaseType } from '@/types';
import { useTestCasesStore } from '@/stores/useTestCasesStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useLanguagesStore } from '@/stores/useLanguagesStore';
import { NumberBadge } from '@/components/NumberBadge';

interface TestCaseProps {
  index: number;
  testCase: TestCaseType;
}

export const TestCase = ({ index, testCase }: TestCaseProps) => {
  const { id, title: initialTitle, testCase: initialTestCase } = testCase;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [testCaseCode, setTestCaseCode] = useState(initialTestCase);

  const debouncedTitle = useDebounce(title, 500);
  const debouncedTestCase = useDebounce(testCaseCode, 500);

  const { removeTestCase, updateTestCase } = useTestCasesStore();
  const { selectedLanguage } = useLanguagesStore();

  const handleTitleEdit = useCallback(() => setIsEditing(true), []);
  const handleTitleBlur = useCallback(() => setIsEditing(false), []);
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleRemoveTestCase = useCallback(() => {
    removeTestCase(selectedLanguage.id, id);
  }, [id, removeTestCase, selectedLanguage.id]);

  useEffect(() => {
    updateTestCase(selectedLanguage.id, id, {
      title: debouncedTitle,
      testCase: debouncedTestCase,
    });
  }, [
    debouncedTitle,
    debouncedTestCase,
    id,
    updateTestCase,
    selectedLanguage.id,
  ]);

  return (
    <Card className="p-1 bg-muted flex flex-col gap-2 w-full border-0">
      <div className="border-2 rounded-lg border-dashed px-2">
        <CardTitle className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-5 w-full">
            <NumberBadge number={index + 1} ariaLabel="Test case number" />
            <div className="w-[70%]">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  autoFocus
                  spellCheck={false}
                  className="w-full text-lg bg-transparent border-transparent focus:outline-none"
                />
              ) : (
                <span
                  className="text-lg cursor-text title-overflow"
                  onClick={handleTitleEdit}
                  spellCheck={false}
                >
                  {title}
                </span>
              )}
            </div>
          </div>
          <X
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={handleRemoveTestCase}
          />
        </CardTitle>
        <CardContent className="bg-backgrounds p-0">
          <CodeTextArea
            value={testCaseCode}
            setValue={setTestCaseCode}
            placeholder="Call the method with the test case input here..."
            editable
            focus={index === 0 && !testCaseCode}
          />
        </CardContent>
      </div>
    </Card>
  );
};
