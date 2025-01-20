import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as monaco from 'monaco-editor';
import { Title } from './Title';
import { useDebounce } from '@/hooks/useDebounce';
import { useEditorsPropertiesStore } from '@/stores/useEditorsPropertiesStore';
import { EditorProperty, Language } from '@/types';

interface EditorProps {
  idEditor: string;
  handleRun: () => void;
  language: Language;
  code: string;
}

export const Editor = forwardRef<
  monaco.editor.IStandaloneCodeEditor,
  EditorProps
>(({ idEditor, handleRun, language, code }, ref) => {
  const { editorsProperties, updateEditorProperty } =
    useEditorsPropertiesStore();
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [title, setTitle] = useState<string>(
    editorsProperties.find(
      (editorProperty) => editorProperty.idEditor === idEditor
    )?.title || ''
  );
  const debouncedTitle = useDebounce(title, 1000);

  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
    }
    setIsTitleVisible(true);
    fadeTimeout.current = setTimeout(() => {
      setIsTitleVisible(false);
    }, 3000);
  };

  const updateProperty = useCallback(
    (id: string, properties: Partial<EditorProperty>) =>
      updateEditorProperty(id, properties),
    [updateEditorProperty]
  );

  useEffect(() => {
    updateProperty(idEditor, { title: debouncedTitle });
  }, [debouncedTitle, idEditor, updateProperty]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });

    /* Disable semantic validation because monaco editor shares a global context 
    and it cause problems when using multiple editors */
    // monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    //   noSemanticValidation: true,
    // });
    /**add uri */
    // monaco.editor.createModel(
    //   code,
    //   language.id,
    //   monaco.Uri.parse(`file:///.${idEditor}' + ${language.fileExtension}`)
    // );

    if (ref) {
      if (typeof ref === 'function') {
        ref(editor);
      } else {
        (
          ref as React.MutableRefObject<monaco.editor.IStandaloneCodeEditor>
        ).current = editor;
      }
    }
  };

  return (
    <ScrollArea
      className="rounded-xl overflow-visible border-gray-600 shadow h-full"
      onMouseMove={handleMouseEnter}
    >
      <Title isVisible={isTitleVisible} title={title} setTitle={setTitle} />
      <MonacoEditor
        className="h-[1200px]"
        value={code}
        language={language.id}
        theme="vs-dark"
        options={{
          tabSize: language.tabSize,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
            alwaysConsumeMouseWheel: false,
          },
          fixedOverflowWidgets: true,
        }}
        onMount={handleEditorDidMount}
      />
    </ScrollArea>
  );
});
