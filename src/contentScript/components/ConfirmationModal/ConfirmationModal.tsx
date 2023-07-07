interface ConfirmationModalProps {
  onConfirm: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <dialog id="confirmation_modal" className="modal dark">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Delete selected chats</h3>
        <p className="py-4">Are you sure you want to delete selected chats?</p>
        <p className="py-4 font-bold">
          The page will be refreshed. Make sure you save your prompt.
        </p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-error" onClick={props.onConfirm}>
            Confirm
          </button>
          <button className="btn btn-success">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default ConfirmationModal;
