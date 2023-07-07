import useExtensionState from "../hooks/useExtensionState";
import useCookie from "./hooks/useCookie";
import useDrawBulkDeleteUI from "./hooks/useDrawBulkDeleteUI";
import useConversations from "./hooks/useConversations";
import patchDataId from "./utils/patchDataId";
import useMutationObserver from "./hooks/useMutationObserver";
import { useEffect } from "react";
import { createDeleteButtonContainer } from "./utils/ui";
import DeleteButton from "./components/DeleteButton/DeleteButton";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import sleep from "../lib/utils/sleep";
declare global {
  interface Window {
    confirmation_modal: {
      showModal: () => void;
    };
  }
}

function ContentScript() {
  const extensionState = useExtensionState();
  const bearer = useCookie("__Secure-next-auth.session-token");
  const conversations = useConversations(bearer);
  const checkboxTargetContainer = document.querySelector("nav") as HTMLElement;
  const [nodes, setNodes] = useMutationObserver(
    checkboxTargetContainer,
    "li > a",
    {
      subtree: true,
      childList: true,
    }
  );

  const deleteButtonContainer = createDeleteButtonContainer();

  const isBulkDeleteEnabled =
    extensionState.isBulkDeleteEnabled && !!bearer && conversations.length > 0;

  useDrawBulkDeleteUI(isBulkDeleteEnabled, nodes, setNodes);

  useEffect(() => {
    patchDataId(nodes, conversations);
  }, [nodes, conversations]);

  const handleDeleteSelectedConversations = async () => {
    const conversationsToDelete: string[] = [];

    nodes.forEach((node) => {
      const checkbox = node.querySelector(".checkbox") as HTMLInputElement;
      if (checkbox.checked) {
        conversationsToDelete.push(node.dataset.conversationId as string);
      }
    });

    for (const conversationId of conversationsToDelete) {
      await fetch(
        `https://chat.openai.com/backend-api/conversation/${conversationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${bearer}`,
          },
          body: JSON.stringify({
            is_visible: false,
          }),
        }
      );
      await sleep(100);
    }
    window.location.reload();
  };

  return isBulkDeleteEnabled ? (
    <>
      <ConfirmationModal onConfirm={handleDeleteSelectedConversations} />
      <DeleteButton
        target={deleteButtonContainer}
        onClick={() => window.confirmation_modal.showModal()}
      />
    </>
  ) : null;
}

export default ContentScript;
