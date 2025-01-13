import { Separator } from '@/components/ui/separator';
import { CodeTextArea } from '@/components/CodeTextArea';
import { Copy } from 'lucide-react';

interface IndividualOutputProps {
  title: string;
  code: string;
}

export const IndividualOutput = ({ title, code }: IndividualOutputProps) => {
  const handleClipboard = () => {
    navigator.clipboard.writeText(code);
  };
  return (
    <>
      <Separator className="my-1" />
      <span className="flex px-4 items-center justify-between">
        <h3 className="py-1 text-2xl font-semibold">{title}</h3>
        <Copy className="hover:cursor-pointer hover:scale-105 transition-transform duration-200s" onClick={handleClipboard} />
      </span>
      <CodeTextArea value={code} />
    </>
  );
};
