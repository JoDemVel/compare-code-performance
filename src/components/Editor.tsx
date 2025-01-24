import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Title } from '@/components/Title';
import { useTheme } from '@/components/theme-provider';
import { Loader } from '@/components/Loader';
import { useDebounce } from '@/hooks/useDebounce';
import { useEditorsPropertiesStore } from '@/stores/useEditorsPropertiesStore';
import { EditorProperty, Language } from '@/types';
import xCodeDefault from 'monaco-themes/themes/Xcode_default.json';
import tomorrowNight from 'monaco-themes/themes/Tomorrow-Night.json';

interface EditorProps {
  idEditor: string;
  handleRun: () => void;
  language: Language;
  code?: string;
}

export const Editor = forwardRef<
  monaco.editor.IStandaloneCodeEditor,
  EditorProps
>(({ idEditor, handleRun, language, code }, ref) => {
  const { editorsProperties, updateEditorProperty, toggleSave } =
    useEditorsPropertiesStore();
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [title, setTitle] = useState<string>(
    editorsProperties.find(
      (editorProperty) => editorProperty.idEditor === idEditor
    )?.title || ''
  );
  const debouncedTitle = useDebounce(title, 1000);

  const fadeTimeout = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();

  const handleMouseEnter = useCallback(() => {
    if (fadeTimeout.current) {
      clearTimeout(fadeTimeout.current);
    }
    setIsTitleVisible(true);
    fadeTimeout.current = setTimeout(() => {
      setIsTitleVisible(false);
    }, 3000);
  }, []);

  const updateProperty = useCallback(
    (id: string, properties: Partial<EditorProperty>) =>
      updateEditorProperty(id, properties),
    [updateEditorProperty]
  );

  useEffect(() => {
    updateProperty(idEditor, { title: debouncedTitle });
  }, [debouncedTitle, idEditor, updateProperty]);

  const handleEditorDidMount: OnMount = useCallback(
    (editor, monaco) => {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        handleRun();
      });

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        toggleSave();
      });

      if (ref) {
        if (typeof ref === 'function') {
          ref(editor);
        } else {
          (
            ref as React.MutableRefObject<monaco.editor.IStandaloneCodeEditor>
          ).current = editor;
        }
      }
    },
    [handleRun, toggleSave, ref]
  );

  const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
    useMemo(
      () => ({
        tabSize: language.tabSize,
        minimap: { enabled: false },
        wordWrap: 'on',
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
          verticalScrollbarSize: 15,
          verticalSliderSize: 7,
          horizontalScrollbarSize: 15,
          horizontalSliderSize: 7,
        },
        fixedOverflowWidgets: true,
      }),
      [language.tabSize]
    );

  const beforeMount = (monacoInstance: typeof monaco) => {
    monacoInstance.editor.defineTheme(
      'xCodeDefault',
      JSON.parse(JSON.stringify(xCodeDefault))
    );
    monacoInstance.editor.defineTheme(
      'tomorrowNight',
      JSON.parse(JSON.stringify(tomorrowNight))
    );
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden border-gray-600 shadow h-full border border-dashed"
      onMouseMove={handleMouseEnter}
    >
      <Title isVisible={isTitleVisible} title={title} setTitle={setTitle} />
      <MonacoEditor
        className="h-[1200px]"
        defaultValue={code}
        language={language.id}
        theme={theme === 'dark' ? 'tomorrowNight' : 'xCodeDefault'}
        loading={<Loader text="Loading Editor..." />}
        options={editorOptions}
        onMount={handleEditorDidMount}
        beforeMount={beforeMount}
      />
    </div>
  );
});
