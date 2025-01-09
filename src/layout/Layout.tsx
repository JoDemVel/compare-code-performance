import { Header } from '@/components/Header';
import { CodeSpace } from '../sections/CodeSpace';
import { TestCaseBenchmarkSpace } from '@/sections/TestCaseBenchmarkSpace';
export const Layout = () => {
  return (
    <section className="p-4 h-screen flex flex-col bg-background text-foreground ">
      <Header />
      <main className="grid grid-cols-5 gap-3 px-1 mb-0">
        <CodeSpace />
        <TestCaseBenchmarkSpace />
      </main>
    </section>
  );
};
