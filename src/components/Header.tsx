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
import { Button } from '@/components/ui/button';
import { useLanguagesStore } from '@/stores/useLanguagesStore';
import { Info, Trash2 } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { useEditorsPropertiesStore } from '@/stores/useEditorsPropertiesStore';
import { useResultStore } from '@/stores/useResultStore';
import { useTestCasesStore } from '@/stores/useTestCasesStore';

export const Header = () => {
  const { languages, selectedLanguage, setSelectedLanguage } =
    useLanguagesStore();
  const { theme } = useTheme();
  const { clearResults } = useResultStore();
  const { clearAll, toggleClear } = useEditorsPropertiesStore();
  const { clearAll: clearAllTestCases } = useTestCasesStore();

  const handleClear = () => {
    clearAll(selectedLanguage.id);
    clearAllTestCases(selectedLanguage.id);
    toggleClear();
  };

  const handleLanguageChange = (value: string) => {
    const selected = languages.find((language) => language.id === value);
    if (selected) {
      setSelectedLanguage(selected);
    }
    clearResults();
  };

  return (
    <header className="flex items-center justify-between gap-0 p-3">
      <div className="basis-1/3 flex items-center pl-5 gap-3">
        <Select
          value={selectedLanguage.id}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger
            className={`w-48 max-lg:w-28 max-sm:w-28 border-inherit focus:ring-0 ${
              theme === 'dark' ? 'border-2' : 'border'
            }`}
          >
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {languages.map(({ id, name, version }) => (
              <SelectItem value={id} key={id}>
                <div className="flex items-center gap-2">
                  <span className="title-overflow_block flex-1">
                    {name}
                    {version && ` - ${version}`}
                  </span>
                  <img
                    src={`./${id}.svg`}
                    alt={name}
                    className="w-5 h-5"
                    loading="lazy"
                  />
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          onClick={handleClear}
          className={`hover:bg-muted font-normal ${
            theme === 'dark' ? 'border-2' : 'border'
          }`}
        >
          <span className="hidden xl:inline">Clear All</span>
          <Trash2 />
        </Button>
        {selectedLanguage.id === 'typescript' && (
          <HoverCard openDelay={0}>
            <HoverCardTrigger>
              <button className="p-1 rounded-md hover:bg-highlight focus:ring-0 group">
                <Info />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="bg-muted border-dashed border-2 text-sm font-mono w-[370px]">
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
      <h1 className="hidden md:inline text-center font-semibold justify-center items-center 2xl:text-2xl xl:text-2xl lg:text-xl md:text-xl sm:text-xl text-md">
        Compare Your Code: Benchmark Performance
      </h1>
      <div className="basis-1/3 flex justify-end items-center pr-5 gap-1">
        <button
          onClick={() =>
            window.open(
              'https://github.com/JoDemVel/compare-code-performance',
              '_blank'
            )
          }
          className="hidden sm:inline p-2 rounded-md hover:bg-highlight focus:ring-0 group"
        >
          <img
            src={`https://cdn.simpleicons.org/github/${
              theme === 'dark' ? 'white' : 'dark'
            }`}
            alt={'GitHub Logo'}
            className="w-5 h-5 hover:cursor-pointer group-hover:scale-110 transition-transform duration-200"
            loading="lazy"
          />
        </button>

        <ModeToggle />
      </div>
    </header>
  );
};
