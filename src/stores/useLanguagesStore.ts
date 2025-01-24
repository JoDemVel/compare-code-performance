import { Language } from '@/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export const useLanguagesStore = create(
  persist(
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
          },
        ] as Language[],
        selectedLanguage: {
          id: 'javascript',
          name: 'JavaScript',
          tabSize: 2,
          fileExtension: 'js',
        } as Language,
      },
      (set) => ({
        setSelectedLanguage: (language: Language) =>
          set(() => ({
            selectedLanguage: language,
          })),
      })
    ),
    {
      name: 'languages-store',
      storage: {
        getItem: (name: string) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: unknown) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
