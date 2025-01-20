import { Editor } from '@/components/Editor';
import { FooterButton } from '@/components/FooterButton';
import { useRef } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as monaco from 'monaco-editor';
import { HandlerFactory } from '@/handlers/HandlerFactory';
import { CodeHandler } from '@/handlers/CodeHandler';
import { useTestCasesStore } from '@/stores/useTestCasesStore';
import { useLanguagesStore } from '@/stores/useLanguagesStore';
import { useEditorsPropertiesStore } from '@/stores/useEditorsPropertiesStore';
import { Result, UnitResult } from '@/types';
import { useResultStore } from '@/stores/useResultStore';

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
  const { editorsProperties } = useEditorsPropertiesStore();
  const { setResults } = useResultStore();

  const handleRun = () => {
    if (firstEditorRef.current && secondEditorRef.current) {
      const codeEditor1 = firstEditorRef.current.getValue();
      const codeEditor2 = secondEditorRef.current.getValue();

      const promises = testCases.map(async (testCase, index) => {
        const outputEditor1 = await codeHandler.handleCode({
          code: codeEditor1,
          language: selectedLanguage.id,
          testCase: testCase.testCase,
        });

        const outputEditor2 = await codeHandler.handleCode({
          code: codeEditor2,
          language: selectedLanguage.id,
          testCase: testCase.testCase,
        });

        return [
          {
            index,
            testCaseId: testCase.id,
            testCase: testCase.title,
            editorTitle:
              editorsProperties.find(
                (editorProperty) => editorProperty.idEditor === 'editor1'
              )?.title || 'Editor 1',
            output: outputEditor1,
          },
          {
            index,
            testCaseId: testCase.id,
            testCase: testCase.title,
            editorTitle:
              editorsProperties.find(
                (editorProperty) => editorProperty.idEditor === 'editor2'
              )?.title || 'Editor 2',
            output: outputEditor2,
          },
        ];
      });

      Promise.all(promises).then((resultsArray) => {
        const results = resultsArray.flat();
        const ans: Result[] = results.reduce<Result[]>((acc, curr) => {
          const existingResult = acc.find(
            (r) => r.testCaseId === curr.testCaseId
          );

          const unitResult: UnitResult = {
            editorTitle: curr.editorTitle,
            output: curr.output,
          };

          if (existingResult) {
            existingResult.results.push(unitResult);
          } else {
            acc.push({
              index: curr.index,
              testCaseId: curr.testCaseId,
              testCase: curr.testCase,
              results: [unitResult],
            });
          }

          return acc;
        }, []);
        console.log(ans);
        setResults(ans);
      });
    }
  };

  return (
    <div className="relative h-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <Editor
            handleRun={handleRun}
            ref={firstEditorRef}
            idEditor="editor1"
            language={selectedLanguage}
            code={''}
          />
        </Panel>

        <PanelResizeHandle className="w-px px-1" />

        <Panel defaultSize={50} minSize={20}>
          <Editor
            handleRun={handleRun}
            ref={secondEditorRef}
            idEditor="editor2"
            language={selectedLanguage}
            code={''}
          />
        </Panel>
      </PanelGroup>

      <FooterButton onClick={handleRun} />
    </div>
  );
};
