import { Result } from '@/types';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useResultStore = create(
  combine(
    {
      results: [] as Result[],
      isEmpty: true,
    },
    (set) => ({
      addResult: (result: Result) =>
        set((state) => ({
          results: [result, ...state.results],
          isEmpty: false,
        })),
      setResults: (results: Result[]) => set({ results, isEmpty: results.length === 0 }),
      clearResults: () => set({ results: [], isEmpty: true }),
      setIsEmpty: (isEmpty: boolean) => set({ isEmpty }),
    })
  )
);