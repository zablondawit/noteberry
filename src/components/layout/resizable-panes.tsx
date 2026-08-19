import type { ReactNode } from "react";
import { useEffect } from "react";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "../ui/resizable";
import styles from "./resizable-panes.module.css";
import { cn } from "@/lib/utils";
import { usePanelRef } from "react-resizable-panels";

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
};
export const ResizableContainer = (props: ResizableContainerProps) => {
  const { leftPane, rightPane, expandSidebar } = props;
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
    >
      <ResizablePanel defaultSize={"50%"}>{leftPane}</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
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
