export const Header = () => {
  return (
    <header className="grid grid-cols-5 gap-4 p-4">
      <p className="flex justify-start items-center pl-5">Select Language</p>
      <h1 className="col-span-3 text-3xl font-semibold flex justify-center items-center">
        Compare Your Code: Benchmark Performance
      </h1>
      <p className="flex justify-end items-center pr-5">Dark Mode</p>
    </header>
  );
};