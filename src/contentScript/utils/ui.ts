export function prependCheckbox(node: HTMLElement) {
  const hasCheckbox = node.querySelector(".checkbox");

  if (hasCheckbox) return;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.onclick = (e) => e.stopPropagation();

  node.prepend(checkbox);
}

export function drawUi(nodes: HTMLElement[]) {
  nodes.forEach(prependCheckbox);
}

export function removeUi(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    const checkbox = node.querySelector(".checkbox");

    if (checkbox) checkbox.remove();
  });
}
