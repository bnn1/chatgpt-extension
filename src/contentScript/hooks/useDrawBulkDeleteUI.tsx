import { useEffect } from "react";
import useMutationObserver from "./useMutationObserver";

function prependCheckbox(node: HTMLElement) {
  const hasCheckbox = node.querySelector(".checkbox");

  if (hasCheckbox) return;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.onclick = (e) => e.stopPropagation();

  node.prepend(checkbox);
}

function drawUi(nodes: HTMLElement[]) {
  nodes.forEach(prependCheckbox);
}

function removeUi(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    const checkbox = node.querySelector(".checkbox");

    if (checkbox) checkbox.remove();
  });
}

const useDrawBulkDeleteUI = (enabled: boolean) => {
  const target = document.querySelector("nav") as HTMLElement;
  const nodes = useMutationObserver(target, "li > a", {
    subtree: true,
    childList: true,
  });

  useEffect(() => {
    if (enabled && nodes.length === 0) {
      const nodes = document.querySelectorAll("nav li > a");

      if (nodes.length > 0) {
        drawUi(Array.from(nodes) as HTMLElement[]);
      }
    }
  }, [enabled, nodes.length]);

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
