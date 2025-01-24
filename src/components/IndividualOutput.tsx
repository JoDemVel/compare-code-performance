import { Separator } from '@/components/ui/separator';
import { CodeTextArea } from '@/components/CodeTextArea';
import { Output } from '@/types';
import { abbreviateNumberFormatter } from '@/utils/formatters';

interface IndividualOutputProps {
  title: string;
  output: Output;
}

export const IndividualOutput = ({
  title,
  output: { output: code, error, opsPerSec },
}: IndividualOutputProps) => (
  <>
    <Separator className="my-1" />
    <div className="flex px-4 items-center justify-between gap-5">
      <h3 className="py-1 text-lg font-semibold">{title}</h3>
      {opsPerSec !== undefined && (
        <span className="font-mono">
          {abbreviateNumberFormatter(opsPerSec)} ops/sec
        </span>
      )}
    </div>
    <CodeTextArea value={code} errorMessage={error} />
  </>
);
