import useExtensionState from "../hooks/useExtensionState";
import { updateState } from "../state/extensionState";

function App() {
  const extensionState = useExtensionState();

  return (
    <>
      <div>sup</div>
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

export default App;
