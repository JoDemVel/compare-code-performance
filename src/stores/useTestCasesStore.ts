import { TestCase } from '@/types';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useTestCasesStore = create(
  persist(
    combine(
      { testCases: [] as TestCase[] },
      (set) => ({
        addTestCase: (testCase: TestCase) =>
          set((state) => ({
            testCases: [testCase, ...state.testCases],
          })),
        removeTestCase: (id: string) =>
          set((state) => ({
            testCases: state.testCases.filter((testCase) => testCase.id !== id),
          })),
        updateTestCase: (id: string, newTestCase: Partial<TestCase>) =>
          set((state) => ({
            testCases: state.testCases.map((testCase) =>
              testCase.id === id ? { ...testCase, ...newTestCase } : testCase
            ),
          })),
      })
    ),
    { name: 'test-cases' }
  )
);  