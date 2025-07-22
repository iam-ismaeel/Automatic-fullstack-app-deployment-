import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React, { ReactNode } from "react";

const CustomDialog = ({
  children,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {" "}
        <DialogPanel
          transition
          className="max-w-lg max-h-[80vh] overflow-y-auto rounded-lg space-y-4 bg-white py-8 px-12"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
