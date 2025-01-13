import { Editor } from '@/components/Editor';
import { FooterButton } from '@/components/FooterButton';
import { useRef } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as monaco from 'monaco-editor';

export const CodeSpace = () => {
  const firstEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const secondEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const handleRun = () => {
    if (firstEditorRef.current) {
      console.log('First editor code:', firstEditorRef.current.getValue());
    }
    if (secondEditorRef.current) {
      console.log('Second editor code:', secondEditorRef.current.getValue());
    }
  };

  return (
    <div className="relative h-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <Editor handleRun={handleRun} ref={firstEditorRef} />
        </Panel>

        <PanelResizeHandle className="w-px px-1" />

        <Panel defaultSize={50} minSize={20}>
          <Editor handleRun={handleRun} ref={secondEditorRef} />
        </Panel>
      </PanelGroup>

      <FooterButton onClick={handleRun} />
    </div>
  );
};
