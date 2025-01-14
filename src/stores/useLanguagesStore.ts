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
          value: 'javascript',
          tabSize: 2,
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          version: '5.6.2',
          tabSize: 4,
        }
      ] as Language[],
      selectedLanguage: null as Language | null
    },
    (set) => ({
      setSelectedLanguage: (language: Language) =>
        set(() => ({
          selectedLanguage: language,
        })),
    })
  )
);
