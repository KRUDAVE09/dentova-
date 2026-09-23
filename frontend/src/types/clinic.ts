export type ChairStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance';

export interface Chair {
  id: string;
  name: string; // e.g. "Chair 1 (Operatory A)", "Chair 2"
  roomNumber: string;
  status: ChairStatus;
  currentPatientName?: string;
  assignedDoctorName?: string;
  currentProcedure?: string;
  nextAppointmentTime?: string;
}

export type ChairPresetCount = 1 | 2 | 5 | 10;

export interface ClinicConfig {
  id: string;
  name: string;
  chairCount: number;
  chairs: Chair[];
  activeChairId: string | null;
  taxId?: string;
  address?: string;
  phone?: string;
  email?: string;
}
