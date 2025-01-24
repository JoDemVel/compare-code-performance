import { TestCase } from '@/types';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useTestCasesStore = create(
  persist(
    combine(
      { 
        dataTestCases: [
          {
            languageId: 'javascript',
            testCases: [] as TestCase[],
          },
          {
            languageId: 'typescript',
            testCases: [] as TestCase[],
          },
        ]
      },
      (set) => ({
        addTestCase: (languageId:string,  testCase: TestCase) =>
          set((state) => {
            const dataTestCases = state.dataTestCases.map((dataTestCase) =>
              dataTestCase.languageId === languageId
                ? { ...dataTestCase, testCases: [testCase, ...dataTestCase.testCases] }
                : dataTestCase
            );
            return { dataTestCases };
          }),
        removeTestCase: (languageId:string, id: string) =>
          set((state) => {
            const dataTestCases = state.dataTestCases.map((dataTestCase) =>
              dataTestCase.languageId === languageId
                ? { ...dataTestCase, testCases: dataTestCase.testCases.filter((testCase) => testCase.id !== id) }
                : dataTestCase
            );
            return { dataTestCases };
          }),
        updateTestCase: (languageId:string, id: string, newTestCase: Partial<TestCase>) =>
          set((state) => {
            const dataTestCases = state.dataTestCases.map((dataTestCase) =>
              dataTestCase.languageId === languageId
                ? {
                    ...dataTestCase,
                    testCases: dataTestCase.testCases.map((testCase) =>
                      testCase.id === id ? { ...testCase, ...newTestCase } : testCase
                    ),
                  }
                : dataTestCase
            );
            return { dataTestCases };
          }),
        clearAll: (languageId: string) => set((state) => {
          const dataTestCases = state.dataTestCases.map((dataTestCase) =>
            dataTestCase.languageId === languageId ? { ...dataTestCase, testCases: [] } : dataTestCase
          );
          return { dataTestCases };
        }),
        setDataTestCases: (languageId: string, testCases: TestCase[]) => set((state) => {
          const dataTestCases = state.dataTestCases.filter((dataTestCase) => dataTestCase.languageId !== languageId);
          console.log('dataTestCases from useTestCasesStore', [...dataTestCases, { languageId, testCases }]);
          return { dataTestCases: [...dataTestCases, { languageId, testCases }] };
        })
      })
    ),
    { name: 'test-cases' }
  )
);  