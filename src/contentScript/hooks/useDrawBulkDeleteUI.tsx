import { useEffect } from "react";
import { drawCheckboxes, removeCheckboxes } from "../utils/ui";

const useDrawBulkDeleteUI = (
  enabled: boolean,
  nodes: HTMLElement[],
  setNodes: (nodes: HTMLElement[]) => void
) => {
  // draw nodes when enabled mid browsing
  useEffect(() => {
    if (enabled && nodes.length === 0) {
      const nodes = Array.from(
        document.querySelectorAll("nav li > a")
      ) as HTMLElement[];

      setNodes(nodes);

      if (nodes.length > 0) {
        drawCheckboxes(Array.from(nodes) as HTMLElement[]);
      }
    }
  }, [enabled, setNodes, nodes.length]);

  // draw checkboxes when enabled
  useEffect(() => {
    if (enabled && nodes.length > 0) {
      drawCheckboxes(nodes);
    } else {
      removeCheckboxes(nodes);
    }
  }, [nodes, enabled]);
};

export default useDrawBulkDeleteUI;
