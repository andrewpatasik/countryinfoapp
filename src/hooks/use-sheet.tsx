import { createContext, ReactElement, useContext, useState } from "react";

type SheetContextValue = {
  isSheetOpen: boolean;
  handleIsSheetChange: VoidFunction;
};

const SheetContext = createContext<SheetContextValue | null>(null);

export const SheetProvider = ({ children }: { children: ReactElement }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleIsSheetChange = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <SheetContext.Provider value={{ isSheetOpen, handleIsSheetChange }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) throw new Error("useSheet should be within SheetContext");

  return context;
};