import { Header } from '@/components/Header';
import { CodeSpace } from '@/sections/CodeSpace';
import { TestCaseBenchmarkSpace } from '@/sections/TestCaseBenchmarkSpace';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';
import { CodeHandlerFactory } from '@/handlers/HandlerFactory';

interface PanelImperativeAPI {
  resize: (size: number) => void;
  collapse: () => void;
  expand: () => void;
  getId: () => string;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
}

export const Layout = () => {
  const { is2xl, isXl, isLg, isMd, isSm } = useWindowSize();
  const [minTestCaseSpace, setMinTestCaseSpace] = useState<number>(22);
  const codePanelRef = useRef<PanelImperativeAPI | null>(null);

  useEffect(() => {
    const codePanel = codePanelRef.current;
    if (codePanel) {
      if (isSm) {
        codePanel.resize(50);
        setMinTestCaseSpace(25);
      }
      if (isMd) {
        codePanel.resize(65);
        setMinTestCaseSpace(35);
      }
      if (isLg) {
        codePanel.resize(68);
        setMinTestCaseSpace(30);
      }
      if (isXl || is2xl) {
        codePanel.resize(75);
        setMinTestCaseSpace(20);
      }
    }
  }, [is2xl, isXl, isLg, isMd, isSm]);

  return (
    <section className="h-screen flex flex-col bg-background text-foreground">
      <Header />
      <PanelGroup direction={isSm ? 'vertical' : 'horizontal'} className="p-4">
        <Panel minSize={35} ref={codePanelRef}>
          <CodeSpace factory={new CodeHandlerFactory()} />
        </Panel>
        <PanelResizeHandle className={isSm ? 'h-px py-1' : 'w-px px-1'} />
        <Panel minSize={minTestCaseSpace}>
          <TestCaseBenchmarkSpace />
        </Panel>
      </PanelGroup>
    </section>
  );
};
