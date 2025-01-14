import { Editor } from '@/components/Editor';
import { FooterButton } from '@/components/FooterButton';
import { useRef } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as monaco from 'monaco-editor';
import { HandlerFactory } from '@/handlers/HandlerFactory';
import { CodeHandler } from '@/handlers/CodeHandler';
import { useTestCasesStore } from '@/stores/useTestCasesStore';
import { useLanguagesStore } from '@/stores/useLanguagesStore';

export const CodeSpace = ({ factory }: { factory: HandlerFactory }) => {
  const firstEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const secondEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const codeHandler: CodeHandler = factory.createHandler();
  const { testCases } = useTestCasesStore();
  const { selectedLanguage } = useLanguagesStore();

  const handleRun = () => {
    if (firstEditorRef.current) {
      const code = firstEditorRef.current.getValue();
      const promises = testCases.map(async (testCase) => {
        return await codeHandler.handleCode({
          code: code,
          language: selectedLanguage?.id || 'javascript',
          testCase: testCase.testCase,
        });
      });
      Promise.all(promises).then((results) => {
        console.log('#1');
        console.log('Results:', results);
      });
    }
    if (secondEditorRef.current) {
      const code = secondEditorRef.current.getValue();
      const promises = testCases.map(async (testCase) => {
        return await codeHandler.handleCode({
          code: code,
          language: selectedLanguage?.id || 'javascript',
          testCase: testCase.testCase,
        });
      });
      Promise.all(promises).then((results) => {
        console.log('#2');
        console.log('Results:', results);
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
