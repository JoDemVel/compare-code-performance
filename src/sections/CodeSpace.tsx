import { Editor } from '@/components/Editor';
import { FooterButton } from '@/components/FooterButton';
import { useCallback, useEffect, useRef, useMemo } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as monaco from 'monaco-editor';
import { HandlerFactory } from '@/handlers/HandlerFactory';
import { CodeHandler } from '@/handlers/CodeHandler';
import { useTestCasesStore } from '@/stores/useTestCasesStore';
import { useLanguagesStore } from '@/stores/useLanguagesStore';
import { useEditorsPropertiesStore } from '@/stores/useEditorsPropertiesStore';
import { Result, UnitResult } from '@/types';
import { useResultStore } from '@/stores/useResultStore';
import { getDefaultRandomCodes } from '@/utils/defaultCodes';

export const CodeSpace = ({ factory }: { factory: HandlerFactory }) => {
  const firstEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const secondEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const codeHandler: CodeHandler = useMemo(() => factory.createHandler(), [factory]);
  const { dataTestCases, setDataTestCases } = useTestCasesStore();
  const { selectedLanguage } = useLanguagesStore();
  const { editorsProperties, clearToggled, saveCode, saveToggled } =
    useEditorsPropertiesStore();
  const { setResults, setIsLoading } = useResultStore();
  const testCases =
    dataTestCases.find(
      (dataTestCase) => dataTestCase.languageId === selectedLanguage.id
    )?.testCases || [];

  const handleRun = () => {
    if (firstEditorRef.current && secondEditorRef.current) {
      setIsLoading(true);
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
        setResults(ans);
        saveCode('editor1', selectedLanguage.id, codeEditor1);
        saveCode('editor2', selectedLanguage.id, codeEditor2);
        setIsLoading(false);
      });
    }
  };

  const getCode = useCallback(
    (idEditor: string): string => {
      const editorProperty = editorsProperties.find(
        (editorProperty) => editorProperty.idEditor === idEditor
      );
      if (editorProperty) {
        const code = editorProperty.values.find(
          (value) => value.languageId === selectedLanguage.id
        )?.code;
        return code || '';
      }
      return '';
    },
    [editorsProperties, selectedLanguage.id]
  );

  useEffect(() => {
    if (firstEditorRef.current && secondEditorRef.current) {
      const codeEditor1 = firstEditorRef.current.getValue();
      const codeEditor2 = secondEditorRef.current.getValue();
      saveCode('editor1', selectedLanguage.id, codeEditor1);
      saveCode('editor2', selectedLanguage.id, codeEditor2);
    }
  }, [saveToggled]);

  useEffect(() => {
    if (firstEditorRef.current && secondEditorRef.current) {
      firstEditorRef.current.setValue(getCode('editor1'));
      secondEditorRef.current.setValue(getCode('editor2'));
    }
  }, [getCode, selectedLanguage.id]);

  useEffect(() => {
    if (firstEditorRef.current && secondEditorRef.current) {
      firstEditorRef.current.setValue('');
      secondEditorRef.current.setValue('');
    }
  }, [clearToggled]);

  useEffect(() => {
    const isEmpty = editorsProperties
      .map((editorProperty) => {
        const code = editorProperty.values.find(
          (value) => value.languageId === selectedLanguage.id
        )?.code;
        return code === '';
      })
      .every((value) => value);
    if (isEmpty && testCases.length === 0) {
      const defaultData = getDefaultRandomCodes(selectedLanguage.id);
      saveCode('editor1', selectedLanguage.id, defaultData.selectedCodes[0]);
      saveCode('editor2', selectedLanguage.id, defaultData.selectedCodes[1]);
      setDataTestCases(selectedLanguage.id, defaultData.testCases);
    }
    if (firstEditorRef.current && secondEditorRef.current) {
      firstEditorRef.current.setValue(getCode('editor1'));
      secondEditorRef.current.setValue(getCode('editor2'));
    }
    return;
  }, []);

  return (
    <div className="relative h-full">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <Editor
            handleRun={handleRun}
            ref={firstEditorRef}
            idEditor="editor1"
            code={getCode('editor1')}
            language={selectedLanguage}
          />
        </Panel>

        <PanelResizeHandle className="w-px px-1" />

        <Panel defaultSize={50} minSize={20}>
          <Editor
            handleRun={handleRun}
            ref={secondEditorRef}
            idEditor="editor2"
            code={getCode('editor2')}
            language={selectedLanguage}
          />
        </Panel>
      </PanelGroup>

      <FooterButton onClick={handleRun} />
    </div>
  );
};
