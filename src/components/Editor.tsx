import { Editor as MonacoEditor } from '@monaco-editor/react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const Editor = () => {
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
      />
    </ScrollArea>
  );
};
