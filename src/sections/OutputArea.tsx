import { Output } from '@/components/Output';
import { useResultStore } from '@/stores/useResultStore';
export const OutputArea = () => {
  const { results } = useResultStore();
  return (
    <div className="flex flex-col gap-4 2xl:pb-16 xl:pb-16 lg:pb-24 md:pb-16 sm:pb-16 pb-16">
      {results.map((result) => (
        <Output key={result.index} {...result} />
      ))}
    </div>
  );
};
