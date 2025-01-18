import { createContext, ReactElement, useContext, useState } from "react";

type ModalContextValue = {
  isModalOpen: boolean;
  handleIsModalChange: VoidFunction;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsModalChange = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, handleIsModalChange }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal should be within ModalContext");

  return context;
};
