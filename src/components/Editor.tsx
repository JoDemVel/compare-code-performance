import { Editor as MonacoEditor } from '@monaco-editor/react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const Editor = () => {
  return (
    <ScrollArea className="rounded-lg border overflow-hidden border-gray-700 shadow h-[800px] w-full">
      <MonacoEditor
        className="h-[1200px] w-full"
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
        }}
      />
      <ScrollBar></ScrollBar>
    </ScrollArea>
  );
};
