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
  const { isSmall, isMedium, isLarge } = useWindowSize();
  const [minTestCaseSpace, setMinTestCaseSpace] = useState<number>(22);
  const codePanelRef = useRef<PanelImperativeAPI | null>(null);

  useEffect(() => {
    const codePanel = codePanelRef.current;
    if (codePanel) {
      if (isSmall) {
        codePanel.resize(isSmall ? 50 : 75);
      }
      if (isMedium) {
        codePanel.resize(isMedium ? 70 : 75);
        setMinTestCaseSpace(25);
      }
      if (isLarge) {
        codePanel.resize(75);
        setMinTestCaseSpace(20);
      }
    }
  }, [isSmall, isMedium, isLarge]);

  return (
    <section className="h-screen flex flex-col bg-background text-foreground">
      <Header />
      <PanelGroup
        direction={isSmall ? 'vertical' : 'horizontal'}
        className="p-4"
      >
        <Panel defaultSize={65} minSize={35} ref={codePanelRef}>
          <CodeSpace factory={new CodeHandlerFactory()} />
        </Panel>
        <PanelResizeHandle className={isSmall ? 'h-px py-1' : 'w-px px-1'} />
        <Panel defaultSize={35} minSize={minTestCaseSpace}>
          <TestCaseBenchmarkSpace />
        </Panel>
      </PanelGroup>
    </section>
  );
};
