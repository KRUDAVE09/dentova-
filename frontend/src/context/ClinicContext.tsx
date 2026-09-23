import React, { createContext, useContext, useState } from 'react';
import type { Chair, ChairPresetCount, ChairStatus, ClinicConfig } from '../types/clinic';
import { DEFAULT_CHAIRS_PRESET, INITIAL_CLINIC_CONFIG } from '../constants/clinic';

interface ClinicContextType {
  clinicConfig: ClinicConfig;
  chairs: Chair[];
  activeChair: Chair | null;
  activeChairId: string | null;
  setActiveChairId: (id: string | null) => void;
  setChairPresetCount: (count: ChairPresetCount) => void;
  updateChairStatus: (chairId: string, status: ChairStatus) => void;
  addChair: (name: string, roomNumber: string) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinicConfig, setClinicConfig] = useState<ClinicConfig>(INITIAL_CLINIC_CONFIG);

  const activeChair = clinicConfig.chairs.find((c) => c.id === clinicConfig.activeChairId) || null;

  const setActiveChairId = (id: string | null) => {
    setClinicConfig((prev) => ({ ...prev, activeChairId: id }));
  };

  const setChairPresetCount = (count: ChairPresetCount) => {
    const newChairs = DEFAULT_CHAIRS_PRESET[count] || DEFAULT_CHAIRS_PRESET[5];
    setClinicConfig((prev) => ({
      ...prev,
      chairCount: count,
      chairs: newChairs,
      activeChairId: newChairs[0]?.id || null,
    }));
  };

  const updateChairStatus = (chairId: string, status: ChairStatus) => {
    setClinicConfig((prev) => ({
      ...prev,
      chairs: prev.chairs.map((chair) =>
        chair.id === chairId ? { ...chair, status } : chair
      ),
    }));
  };

  const addChair = (name: string, roomNumber: string) => {
    const newChair: Chair = {
      id: `chair-${Date.now()}`,
      name,
      roomNumber,
      status: 'available',
    };
    setClinicConfig((prev) => ({
      ...prev,
      chairCount: prev.chairCount + 1,
      chairs: [...prev.chairs, newChair],
    }));
  };

  return (
    <ClinicContext.Provider
      value={{
        clinicConfig,
        chairs: clinicConfig.chairs,
        activeChair,
        activeChairId: clinicConfig.activeChairId,
        setActiveChairId,
        setChairPresetCount,
        updateChairStatus,
        addChair,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
