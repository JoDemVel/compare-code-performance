import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-highlight focus:ring-0 group"
    >
      {theme === 'dark' ? (
        <Sun
          size={20}
          className="transform transition-transform duration-200 group-hover:rotate-12"
        />
      ) : (
        <Moon
          size={20}
          className="transform transition-transform duration-200 group-hover:rotate-12"
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
