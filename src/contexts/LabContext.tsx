import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type LabContextType = {
  isLabOpen: boolean;
  targetScenarioId: number | null;
  openLab: (scenarioId?: number | unknown) => void;
  closeLab: () => void;
};

const LabContext = createContext<LabContextType>({} as LabContextType);

export const LabProvider = ({ children }: { children: ReactNode }) => {
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [targetScenarioId, setTargetScenarioId] = useState<number | null>(null);

  const openLab = (scenarioId?: number | unknown) => {
    if (typeof scenarioId === 'number') {
      setTargetScenarioId(scenarioId);
    } else {
      setTargetScenarioId(null);
    }
    setIsLabOpen(true);
  };

  const closeLab = () => {
    setIsLabOpen(false);
    setTargetScenarioId(null);
  };

  return (
    <LabContext.Provider value={{ isLabOpen, targetScenarioId, openLab, closeLab }}>
      {children}
    </LabContext.Provider>
  );
};

export const useLab = () => useContext(LabContext);
