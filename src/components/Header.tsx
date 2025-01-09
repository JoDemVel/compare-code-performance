import { ModeToggle } from './mode-toggle';

export const Header = () => {
  return (
    <header className="grid grid-cols-5 gap-4 p-3">
      <p className="flex justify-start items-center pl-5">Select Language</p>
      <h1 className="col-span-3 text-2xl text-center font-semibold flex justify-center items-center">
        Compare Your Code: Benchmark Performance
      </h1>
      <div className="flex justify-end items-center pr-5">
        <ModeToggle />
      </div>
    </header>
  );
};
