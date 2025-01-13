import { Editor } from '@/components/Editor';
import { FooterButton } from '@/components/FooterButton';
import { useRef } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as monaco from 'monaco-editor';
import { HandlerFactory } from '@/handlers/HandlerFactory';
import { CodeHandler } from '@/handlers/CodeHandler';

export const CodeSpace = ({ factory }: { factory: HandlerFactory }) => {
  const firstEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const secondEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const codeHandler: CodeHandler = factory.createHandler();

  const handleRun = () => {
    if (firstEditorRef.current) {
      console.log('First editor code:', firstEditorRef.current.getValue());
      codeHandler.handleCode({
        code: firstEditorRef.current.getValue(),
        language: 'javascript',
        testCase: 'multiply(2.1, 3.3)',
      });
    }
    if (secondEditorRef.current) {
      console.log('Second editor code:', secondEditorRef.current.getValue());
      codeHandler.handleCode({
        code: secondEditorRef.current.getValue(),
        language: 'typescript',
        testCase: 'multiply(2.1, 3.3)',
      });
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
