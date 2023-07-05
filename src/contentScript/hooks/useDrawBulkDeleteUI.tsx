import { useEffect } from "react";
import useMutationObserver from "./useMutationObserver";

function createRenderer(ids: string[]) {
  return function prependCheckbox(node: HTMLElement, index: number) {
    const hasCheckbox = node.querySelector(".checkbox");

    if (hasCheckbox) return;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.dataset.conversationId = ids[index];
    checkbox.onclick = (e) => e.stopPropagation();

    node.prepend(checkbox);
  };
}
function drawUi(nodes: HTMLElement[], ids: string[]) {
  const prependCheckbox = createRenderer(ids);

  nodes.forEach(prependCheckbox);
}

function removeUi(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    const checkbox = node.querySelector(".checkbox");

    if (checkbox) checkbox.remove();
  });
}

const useDrawBulkDeleteUI = (enabled: boolean, ids: string[]) => {
  const nodes = useMutationObserver(document.querySelector("nav")!, "li > a", {
    subtree: true,
    childList: true,
  });

  // draw checkboxes when enabled
  useEffect(() => {
    if (enabled) {
      drawUi(nodes, ids);
    } else {
      removeUi(nodes);
    }
  }, [nodes, enabled, ids]);
};

export default useDrawBulkDeleteUI;
