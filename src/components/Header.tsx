import { ModeToggle } from '@/components/mode-toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useLanguagesStore } from '@/stores/useLanguagesStore';
import { Info } from 'lucide-react';

export const Header = () => {
  const { languages, selectedLanguage, setSelectedLanguage } =
    useLanguagesStore();

  return (
    <header className="grid grid-cols-5 gap-4 p-3">
      <div className="flex justify-start items-center pl-5 gap-4">
        <Select
          value={selectedLanguage.id}
          defaultValue="javascript"
          onValueChange={(value) => {
            const selected = languages.find(
              (language) => language.id === value
            );
            if (selected) {
              setSelectedLanguage(selected);
            }
          }}
        >
          <SelectTrigger className="w-[80%] border-inherit border-2 focus:ring-0">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {languages.map((language) => (
              <SelectItem value={language.id} key={language.id}>
                <div className="w-full flex justify-center items-center">
                  <span className="mr-3 title-overflow">
                    {language.name}
                    {language.version && ` - ${language.version}`}
                  </span>
                  <img
                    src={`./${language.id}.svg`}
                    alt={language.name}
                    className="w-5 h-5"
                  />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedLanguage.id === 'typescript' && (
          <HoverCard openDelay={0}>
            <HoverCardTrigger>
              <Info />
            </HoverCardTrigger>
            <HoverCardContent className="bg-muted border-dashed border-2 text-sm font-mono w-[500px]">
              <p>
                Monaco Editor uses a shared context for the JavaScript and
                TypeScript language models across each editor instance. As a
                result, you may encounter errors like{' '}
                <em className="text-red-400">
                  Duplicate function implementation
                </em>{' '}
                if you have two functions with the same name in different
                editors.
              </p>
              <p>
                If the errors are annoying, you can prevent the editor from
                ignoring the next line of code with:
              </p>
              <pre className="flex items-center gap-5 my-2">
                <code className="text-green-600 bg-card border p-2 rounded-md">
                  // @ts-ignore
                </code>
                <span>or</span>
                <code className="text-green-600 bg-card border p-2 rounded-md">
                  // @ts-expect-error
                </code>
              </pre>
              <p>
                You can also disable all rules by placing the following comment
                at the beginning of the code:
              </p>
              <pre className="text-green-600 bg-card border p-2 mt-2 rounded-md">
                <code>// @ts-nocheck</code>
              </pre>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      <h1 className="col-span-3 text-center font-semibold flex justify-center items-center 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-md">
        Compare Your Code: Benchmark Performance
      </h1>
      <div className="flex justify-end items-center pr-5 ">
        <ModeToggle />
      </div>
    </header>
  );
};
