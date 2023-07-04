import useExtensionState from "../hooks/useExtensionState";

function ContentScript() {
  const extensionState = useExtensionState();
  return (
    <>
      <div>{extensionState.isBulkDeleteEnabled ? "ENABLED" : "DISABLED"}</div>
    </>
  );
}

export default ContentScript;
