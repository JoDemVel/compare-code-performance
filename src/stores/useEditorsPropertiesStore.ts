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
        },
        {
          idEditor: "editor2",
          title: "Editor 2",
        },
      ] as EditorProperty[] },
      (set) => ({
        updateEditorProperty: (id: string, newEditorProperty: Partial<EditorProperty>) =>
          set((state) => ({
            editorsProperties: state.editorsProperties.map((editorProperty) =>
              editorProperty.idEditor === id ? { ...editorProperty, ...newEditorProperty } : editorProperty
            ),
          }),
        ),
      })
    ),
    { name: "editors-properties" }
  )
);