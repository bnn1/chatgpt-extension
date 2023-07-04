import { useEffect } from "react";

function createRenderer(ids: string[]) {
  return function prependCheckbox(node: HTMLElement, index: number) {
    const hasCheckbox = node.querySelector(".checkbox");

    if (hasCheckbox) return;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.dataset.conversationid = ids[index];
    checkbox.onclick = (e) => e.stopPropagation();

    node.prepend(checkbox);
  };
}
function redrawUi() {
  const links = Array.from(
    document.querySelectorAll(
      "nav > div > div > div > span > div > ol > li > a"
    )
  ) as HTMLAnchorElement[];

  const ids = links.map((_, idx) => idx.toString());
  const prependCheckbox = createRenderer(ids);

  links.forEach(prependCheckbox);
}

const useDrawBulkDeleteUI = (enabled: boolean) => {
  // redraw checkboxes when new links are added
  useEffect(() => {
    if (enabled) {
      redrawUi();
      const targetNode = document.body.querySelector("#__next") as HTMLElement;
      const config = { childList: true, subtree: true };
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            // Check if the added node is an Element
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node instanceof HTMLElement
            ) {
              // prepend your checkbox to this node
              const anchors = Array.from(
                node.querySelectorAll("li > a")
              ) as HTMLAnchorElement[];

              const ids = anchors.map((_, idx) => idx.toString());
              const prependCheckbox = createRenderer(ids);
              anchors.forEach(prependCheckbox);
            }
          });
        });
      });

      mutationObserver.observe(targetNode, config);

      return () => {
        mutationObserver.disconnect();
      };
    }
  }, [enabled]);

  // remove checkboxes when disabled
  useEffect(() => {
    if (!enabled) {
      const checkboxes = Array.from(
        document.querySelectorAll("a > .checkbox")
      ) as HTMLInputElement[];

      checkboxes.forEach((checkbox) => {
        checkbox.remove();
      });
    }
  }, [enabled]);
};

export default useDrawBulkDeleteUI;
