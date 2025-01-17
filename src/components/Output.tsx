import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { NumberBadge } from '@/components/NumberBadge';
import { IndividualOutput } from './IndividualOutput';
import { Result } from '@/types';

export const Output = ({ index, testCase, results }: Result) => {
  return (
    <Card className="p-1 bg-muted flex flex-col gap-2 border-0">
      <div className="border-2 rounded-lg border-dashed px-2">
        <CardTitle className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-5 w-full">
            <NumberBadge number={index + 1} />
            <div className="w-[70%]">
              <span
                className="text-lg cursor-text title-overflow"
                spellCheck={false}
              >
                {testCase}
              </span>
            </div>
          </div>
        </CardTitle>
        <CardContent className="bg-backgrounds p-0">
          {results.map((result, index) => (
            <IndividualOutput
              key={index}
              title={result.editorTitle}
              output={result.output}
            />
          ))}
        </CardContent>
      </div>
    </Card>
  );
};
