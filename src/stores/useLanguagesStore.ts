import { Language } from '@/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useLanguagesStore = create(
  combine(
    {
      languages: [
        {
          id: 'javascript',
          name: 'JavaScript',
          tabSize: 2,
          fileExtension: 'js',
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          version: '5.6.2',
          tabSize: 2,
          fileExtension: 'ts',
        }
      ] as Language[],
      selectedLanguage: {
        id: 'javascript',
        name: 'JavaScript',
        tabSize: 2,
      } as Language,
    },
    (set) => ({
      setSelectedLanguage: (language: Language) =>
        set(() => ({
          selectedLanguage: language,
        })),
    })
  )
);
