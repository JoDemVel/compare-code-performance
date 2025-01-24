import { EditorProperty } from "@/types";
import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useEditorsPropertiesStore = create(
  persist(
    combine(
      { editorsProperties: [
        {
          idEditor: "editor1",
          title: "Editor 1",
          values: [
            {
              languageId: "javascript",
              code: ''
            },
            {
              languageId: "typescript",
              code: ''
            }
          ],
        },
        {
          idEditor: "editor2",
          title: "Editor 2",
          values: [
            {
              languageId: "javascript",
              code: ''
            },
            {
              languageId: "typescript",
              code: ''
            }
          ],
        },
      ] as EditorProperty[], clearToggled: false, saveToggled: false },
      (set) => ({
        updateEditorProperty: (id: string, newEditorProperty: Partial<EditorProperty>) =>
          set((state) => ({
            editorsProperties: state.editorsProperties.map((editorProperty) =>
              editorProperty.idEditor === id ? { ...editorProperty, ...newEditorProperty } : editorProperty
            ),
          }),
        ),
        saveCode: (id: string, languageId: string, code: string) => set((state) => {
          const editorProperty = state.editorsProperties.find((editorProperty) => editorProperty.idEditor === id);
          if (editorProperty) {
            const newValues = editorProperty.values.map((value) =>
              value.languageId === languageId ? { ...value, code } : value
            );
            return {
              editorsProperties: state.editorsProperties.map((editorProperty) =>
                editorProperty.idEditor === id ? { ...editorProperty, values: newValues } : editorProperty
              ),
            };
          }
          return state;
        }),
        clearAll: (languageId: string) => set((state) => {
          const newEditorsProperties = state.editorsProperties.map((editorProperty) => ({
            ...editorProperty,
            values: editorProperty.values.map((value) =>
              value.languageId === languageId ? { ...value, code: '' } : value
            ),
          }));
          return { editorsProperties: newEditorsProperties };
        }),
        toggleClear: () => set((state) => ({ clearToggled: !state.clearToggled })),
        toggleSave: () => set((state) => ({ saveToggled: !state.saveToggled })),
      })
    ),
    { name: "editors-properties" }
  )
);