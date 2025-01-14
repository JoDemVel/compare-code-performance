import { ModeToggle } from '@/components/mode-toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguagesStore } from '@/stores/useLanguagesStore';

export const Header = () => {
  const { languages, selectedLanguage, setSelectedLanguage } =
    useLanguagesStore();

  return (
    <header className="grid grid-cols-5 gap-4 p-3">
      <div className="flex justify-start items-center pl-5">
        <Select
          value={selectedLanguage?.id}
          onValueChange={(value) => {
            const selected = languages.find(
              (language) => language.id === value
            );
            if (selected) {
              setSelectedLanguage(selected);
            }
          }}
        >
          <SelectTrigger className="w-[80%] border-b-muted">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {languages.map((language) => (
              <SelectItem value={language.id} key={language.id}>
                <div className="w-full flex justify-center items-center">
                  <span className="mr-3">
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
      </div>
      <h1 className="col-span-3 text-center font-semibold flex justify-center items-center 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-xl text-md">
        Compare Your Code: Benchmark Performance
      </h1>
      <div className="flex justify-end items-center pr-5">
        <ModeToggle />
      </div>
    </header>
  );
};
