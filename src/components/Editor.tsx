import React, { forwardRef } from 'react';
import { Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as monaco from 'monaco-editor';

interface EditorProps {
  handleRun: () => void;
}

export const Editor = forwardRef<
  monaco.editor.IStandaloneCodeEditor,
  EditorProps
>(({ handleRun }, ref) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
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
  };

  return (
    <ScrollArea className="rounded-xl overflow-visible border-gray-600 shadow h-full">
      <MonacoEditor
        className="h-[1200px]"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        theme="vs-dark"
        options={{
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
