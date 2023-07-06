import { useEffect, useState } from "react";

const useMutationObserver = (
  target: Node,
  selector: string,
  options?: MutationObserverInit
) => {
  const [nodes, setNodes] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is an Element
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node instanceof HTMLElement
          ) {
            // prepend your checkbox to this node
            const nodes = Array.from(
              node.querySelectorAll(selector)
            ) as HTMLAnchorElement[];

            setNodes((prevNodes) => prevNodes.concat(nodes));
          }
        });
      });
    });

    mutationObserver.observe(target, options);
  }, [target, selector, options]);

  return [Array.from(new Set(nodes)), setNodes] as const;
};

export default useMutationObserver;
