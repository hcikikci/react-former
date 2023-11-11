// React imports
import React from "react";
import { CircleButton } from "./Button";

/**
 * ModalProps type definition. It includes a mandatory 'open' property to control the visibility of the modal,
 * an optional 'onClose' function to be called when the modal is closed,
 * and all other dialog element attributes (React.DialogHTMLAttributes).
 */
export type ModalProps = {
  open: boolean;
  onClose?: () => void;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

/**
 * Modal component. It serves as a wrapper for a dialog element.
 *
 * @param {ModalProps} props - Modal properties.
 * @returns JSX.Element
 */
const Modal = ({ open, onClose, className, children }: ModalProps) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <dialog className="modal  " open={open}>
      <form
        onSubmit={(e: any) => handleSubmit(e)}
        method="dialog"
        className={`modal-box px-10 rounded-csm pt-10 max-w-full bg-white ${className}`}
      >
        <CircleButton
          onClick={onClose}
          type="submit"
          size="sm"
          color="base-100"
          className="absolute right-4 top-4 text-gray hover:text-black"
        >
          ✕
        </CircleButton>
        {children}
      </form>
      <form method="dialog" className="modal-backdrop bg-black opacity-20">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;

/**
 * PrimaryModal component. It's a specialized Modal with a custom layout.
 *
 * @param {ModalProps} props - PrimaryModal properties.
 * @returns JSX.Element
 */
export const PrimaryModal = ({ children, className, ...props }: ModalProps) => {
  return (
    <Modal className={`relative ${className}`} {...props}>
      <div className="rounded-full p-2 bg-light-gray w-fit h-fit absolute left-1/2 transform -translate-x-1/2 top-1.5">
        <img className="" width={54} height={54} src="/logo/logo.png" alt="random image" />
      </div>
      <div className="border rounded-csm w-full h-full p-8 pt-12">{children}</div>
    </Modal>
  );
};

export const SecondaryModal = ({
  children,
  className,
  title,
  subtitle,
  icon,
  ...props
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
} & ModalProps) => {
  return (
    <Modal className={`w-5/6 !p-0 !m-0 relative ${className}`} {...props}>
      <div className="rounded-full p-2 bg-white w-full py-5 pl-5">
        <div className="flex flex-row space-x-4">
          {icon}
          <div className="flex flex-col">
            <h2 className="font-medium">{title}</h2>
            <h2>{subtitle}</h2>
          </div>
        </div>
      </div>
      <div className="rounded-csm bg-light-gray w-full h-full">{children}</div>
    </Modal>
  );
};
