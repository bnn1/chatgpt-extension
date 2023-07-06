import { Item } from "../types";

function patchDataId(
  nodes: HTMLElement[],
  conversations: Item[],
  key = "conversationId"
) {
  if (
    !nodes ||
    !conversations ||
    nodes.length === 0 ||
    conversations.length === 0
  )
    return;

  nodes.forEach((node, index) => {
    const title = node.innerText;
    if (
      title !== conversations[index].title ||
      node.dataset[key] === conversations[index].id
    )
      return;

    node.dataset[key] = conversations[index].id;
  });
}

export default patchDataId;
