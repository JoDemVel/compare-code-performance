import { HomePage } from '@/pages/HomePage';
import { ThemeProvider } from '@/components/theme-provider';
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {<HomePage />}
      </ThemeProvider>
    </>
  );
}

export default App;
