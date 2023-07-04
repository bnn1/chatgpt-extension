import useExtensionState from "../hooks/useExtensionState";
import { updateState } from "../state/extensionState";

function Popup() {
  const extensionState = useExtensionState();

  return (
    <>
      <button
        onClick={() => {
          updateState({
            isBulkDeleteEnabled: !extensionState.isBulkDeleteEnabled,
          });
        }}
      >
        {extensionState.isBulkDeleteEnabled ? "Disable" : "Enable"}
      </button>
    </>
  );
}

export default Popup;
