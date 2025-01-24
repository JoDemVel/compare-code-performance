import { Output } from '@/components/Output';
import { useResultStore } from '@/stores/useResultStore';

export const OutputArea = () => {
  const { results } = useResultStore();

  return (
    <section className="flex flex-col gap-4 pb-16">
      {results.map((result) => (
        <Output key={result.index} {...result} />
      ))}
    </section>
  );
};
