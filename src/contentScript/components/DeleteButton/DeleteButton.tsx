import { createPortal } from "react-dom";
import Trash from "../../../components/icons/Trash/Trash";
import cc from "../../../lib/utils/cc";

interface DeleteButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  target: HTMLElement;
}

const DeleteButton = ({ target, className, ...props }: DeleteButtonProps) =>
  createPortal(
    <button
      className={cc(
        "w-11 h-11 btn-outline hover:bg-[#8d8da01a] hover:border-brand/20 border border-solid border-brand/20 text-white p-3 flex justify-center items-center rounded-md",
        className
      )}
      {...props}
    >
      <Trash />
    </button>,
    target
  );

export default DeleteButton;
