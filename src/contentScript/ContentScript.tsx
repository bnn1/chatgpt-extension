import useExtensionState from "../hooks/useExtensionState";
import useDrawBulkDeleteUI from "./hooks/useDrawBulkDeleteUI";

function ContentScript() {
  const extensionState = useExtensionState();

  useDrawBulkDeleteUI(extensionState.isBulkDeleteEnabled);

  return null;
}

export default ContentScript;
