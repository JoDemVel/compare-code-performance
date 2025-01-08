import { Header } from '@/components/Header';
import { CodeSpace } from '../sections/CodeSpace';
export const Layout = () => {
  return (
    <section className="h-screen w-screen bg-background text-foreground">
      <Header />
      <main className="grid grid-cols-5 gap-3 p-4 h-[90%]">
        <CodeSpace />
        <div>Test Cases Area</div>
      </main>
    </section>
  );
};
