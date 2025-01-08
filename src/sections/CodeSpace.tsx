import { Editor } from '@/components/Editor';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

export const CodeSpace = () => {
  return (
    <div className="col-span-4">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <Editor />
        </Panel>

        <PanelResizeHandle className="w-px px-1" />

        <Panel defaultSize={50} minSize={20}>
          <Editor />
        </Panel>
      </PanelGroup>
    </div>
  );
};
