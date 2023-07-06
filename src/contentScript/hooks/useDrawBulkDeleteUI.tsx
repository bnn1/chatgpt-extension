import { useEffect } from "react";
import useMutationObserver from "./useMutationObserver";
import { drawUi, removeUi } from "../utils/ui";

const useDrawBulkDeleteUI = (enabled: boolean) => {
  const target = document.querySelector("nav") as HTMLElement;
  const [nodes, setNodes] = useMutationObserver(target, "li > a", {
    subtree: true,
    childList: true,
  });

  // draw nodes when enabled mid browsing
  useEffect(() => {
    if (enabled && nodes.length === 0) {
      const nodes = Array.from(
        document.querySelectorAll("nav li > a")
      ) as HTMLElement[];

      setNodes(nodes);

      if (nodes.length > 0) {
        drawUi(Array.from(nodes) as HTMLElement[]);
      }
    }
  }, [enabled, setNodes, nodes.length]);

  // draw checkboxes when enabled
  useEffect(() => {
    if (enabled && nodes.length > 0) {
      drawUi(nodes);
    } else {
      removeUi(nodes);
    }
  }, [nodes, enabled]);

  return nodes;
};

export default useDrawBulkDeleteUI;
