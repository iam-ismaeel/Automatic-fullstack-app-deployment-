import { useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpenState = () => setIsOpen(!isOpen);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return { isOpen, toggleOpenState, onOpen, onClose };
};
