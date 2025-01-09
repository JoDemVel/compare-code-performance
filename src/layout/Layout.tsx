import { Header } from '@/components/Header';
import { CodeSpace } from '../sections/CodeSpace';
import { TestCaseBenchmarkSpace } from '@/sections/TestCaseBenchmarkSpace';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useEffect, useRef } from 'react';

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
  const { isVertical } = useWindowSize();
  const codePanelRef = useRef<PanelImperativeAPI | null>(null);

  useEffect(() => {
    const codePanel = codePanelRef.current;
    if (codePanel) {
      codePanel.resize(isVertical ? 50 : 75);
    }
  }, [isVertical]);

  return (
    <section className="h-screen flex flex-col bg-background text-foreground">
      <Header />
      <PanelGroup
        direction={isVertical ? 'vertical' : 'horizontal'}
        className="p-4"
      >
        <Panel defaultSize={75} minSize={20} ref={codePanelRef}>
          <CodeSpace />
        </Panel>
        <PanelResizeHandle className={isVertical ? 'h-px py-1' : 'w-px px-1'} />
        <Panel defaultSize={35} minSize={20}>
          <TestCaseBenchmarkSpace />
        </Panel>
      </PanelGroup>
    </section>
  );
};
