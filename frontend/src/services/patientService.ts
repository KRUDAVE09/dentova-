import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';

export interface PatientSummary {
  id: string;
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  lastVisit?: string;
  nextAppointment?: string;
  status: 'active' | 'inactive' | 'archived';
  assignedChair?: string;
}

/**
 * Service abstraction for Patient Endpoints.
 * Ready for backend connection.
 */
export const patientService = {
  getPatients: async (): Promise<ApiResponse<PatientSummary[]>> => {
    // Service stub returning structured promise response
    return apiClient.get<PatientSummary[]>('/patients');
  },
  getPatientById: async (id: string): Promise<ApiResponse<PatientSummary>> => {
    return apiClient.get<PatientSummary>(`/patients/${id}`);
  },
  createPatient: async (data: Partial<PatientSummary>): Promise<ApiResponse<PatientSummary>> => {
    return apiClient.post<PatientSummary>('/patients', data);
  },
};
