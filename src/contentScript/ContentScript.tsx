import useExtensionState from "../hooks/useExtensionState";
import useCookie from "./hooks/useCookie";
import useDrawBulkDeleteUI from "./hooks/useDrawBulkDeleteUI";
import useConversations from "./hooks/useConversations";
import patchDataId from "./utils/patchDataId";

function ContentScript() {
  const extensionState = useExtensionState();
  const bearer = useCookie("__Secure-next-auth.session-token");
  const conversations = useConversations(bearer);

  const isBulkDeleteEnabled =
    extensionState.isBulkDeleteEnabled && !!bearer && conversations.length > 0;

  const nodes = useDrawBulkDeleteUI(isBulkDeleteEnabled);
  patchDataId(nodes, conversations);

  return null;
}

export default ContentScript;
