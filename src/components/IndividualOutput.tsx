import { Separator } from '@/components/ui/separator';
import { CodeTextArea } from '@/components/CodeTextArea';
import { Output } from '@/types';
import { abbreviateNumberFormatter } from '@/utils/formatters';

interface IndividualOutputProps {
  title: string;
  output: Output;
}

export const IndividualOutput = ({ title, output }: IndividualOutputProps) => {
  const { output: code, error } = output;
  return (
    <>
      <Separator className="my-1" />
      <span className="flex px-4 items-center justify-between gap-5">
        <h3 className="py-1 text-lg font-semibold">{title}</h3>
        {output.output && (
          <span className="font-mono">
            {abbreviateNumberFormatter(output.opsPerSec)} ops/sec
          </span>
        )}
      </span>
      <CodeTextArea value={code} errorMessage={error} />
    </>
  );
};
