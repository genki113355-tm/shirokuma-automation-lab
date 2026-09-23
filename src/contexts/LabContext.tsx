import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type LabContextType = {
  isLabOpen: boolean;
  openLab: () => void;
  closeLab: () => void;
};

const LabContext = createContext<LabContextType>({} as LabContextType);

export const LabProvider = ({ children }: { children: ReactNode }) => {
  const [isLabOpen, setIsLabOpen] = useState(false);

  const openLab = () => setIsLabOpen(true);
  const closeLab = () => setIsLabOpen(false);

  return (
    <LabContext.Provider value={{ isLabOpen, openLab, closeLab }}>
      {children}
    </LabContext.Provider>
  );
};

export const useLab = () => useContext(LabContext);
