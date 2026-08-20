import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePanelRef, type Layout } from "react-resizable-panels";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import styles from "./resizable-panes.module.css";

const CONFIG = {
  right: {
    minSize: "20%",
    maxSize: "50%",
  },
} as const;

export type ResizableContainerProps = {
  leftPane: ReactNode;
  rightPane: ReactNode;
  expandSidebar?: boolean;
  onLayoutChange?: (layout: Layout) => void;
  defaultLayout?: Layout;
};
export const ResizableContainer = (props: ResizableContainerProps) => {
  const { leftPane, rightPane, expandSidebar, onLayoutChange, defaultLayout } =
    props;
  const rightRef = usePanelRef();

  useEffect(() => {
    if (!rightRef.current) return;
    if (!expandSidebar) rightRef.current.collapse();
    else rightRef.current.expand();
  }, [expandSidebar]);

  return (
    <ResizablePanelGroup
      className={cn([styles.resizable_pane])}
      orientation="horizontal"
      onLayoutChanged={onLayoutChange}
      defaultLayout={defaultLayout}
    >
      <ResizablePanel id="left-pane" defaultSize={"50%"}>
        {leftPane}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        id="right-pane"
        panelRef={rightRef}
        collapsible
        maxSize={CONFIG.right.maxSize}
        minSize={CONFIG.right.minSize}
      >
        {rightPane}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
