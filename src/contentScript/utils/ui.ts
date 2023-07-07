export function prependCheckbox(node: HTMLElement) {
  const hasCheckbox = node.querySelector(".checkbox");

  if (hasCheckbox) return;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.onclick = (e) => e.stopPropagation();

  node.prepend(checkbox);
}

export function drawCheckboxes(nodes: HTMLElement[]) {
  nodes.forEach(prependCheckbox);
}

export function removeCheckboxes(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    const checkbox = node.querySelector(".checkbox");

    if (checkbox) checkbox.remove();
  });
}

export function createDeleteButtonContainer() {
  const existingContainer = document.getElementById("delete-button-container");
  if (existingContainer !== null) return existingContainer;

  const target = document.querySelector("nav > div:first-child");
  const buttonContainer = document.createElement("div");

  if (target) {
    buttonContainer.id = "delete-button-container";
    target.append(buttonContainer);
  }

  return buttonContainer;
}
