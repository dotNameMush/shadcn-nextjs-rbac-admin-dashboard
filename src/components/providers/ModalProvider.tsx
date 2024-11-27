"use client";

import React from "react";

interface ModalContextType {
  isOpen: boolean;
  setOpen: (modal: React.ReactNode) => void;
  setClose: () => void;
}

export const ModalContext = React.createContext<ModalContextType>({
  isOpen: false,
  setOpen: (modal: React.ReactNode) => {},
  setClose: () => {},
});

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [currentModal, setCurrentModal] = React.useState<React.ReactNode>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen: ModalContextType["setOpen"] = async (modal) => {
    if (modal) {
      setCurrentModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ModalContext.Provider value={{ setOpen, setClose, isOpen }}>
      {children}
      {currentModal}
    </ModalContext.Provider>
  );
};
