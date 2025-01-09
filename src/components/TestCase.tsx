import { Card, CardContent, CardTitle } from './ui/card';
import { CodeTextArea } from './CodeTextArea';
import { X } from 'lucide-react';
import { NumberBadge } from './NumberBadge';
import { SetStateAction, useState } from 'react';

interface TestCaseProps {
  onRemove: () => void;
}

export const TestCase = ({ onRemove }: TestCaseProps) => {
  const [title, setTitle] = useState('Test Case');
  const [isEditing, setIsEditing] = useState(false);

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
  return (
    <Card className="p-1 bg-muted flex flex-col gap-2">
      <div className="border-2 rounded-lg border-dashed px-2">
        <CardTitle className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-5 w-full">
            <NumberBadge number={10} />
            <div className="w-[70%]">
              {isEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  autoFocus
                  className="text-lg bg-transparent border-transparent focus:outline-none"
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
          <X className="cursor-pointer" onClick={onRemove} />
        </CardTitle>
        <CardContent className="bg-backgrounds p-0">
          <CodeTextArea />
        </CardContent>
      </div>
    </Card>
  );
};
