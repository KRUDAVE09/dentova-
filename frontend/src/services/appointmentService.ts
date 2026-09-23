import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';

export interface AppointmentSummary {
  id: string;
  patientId: string;
  patientName: string;
  chairId: string;
  chairName: string;
  doctorName: string;
  procedure: string;
  startTime: string;
  durationMinutes: number;
  status: 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled';
}

/**
 * Service abstraction for Appointment & Multi-Chair Scheduling Endpoints.
 */
export const appointmentService = {
  getAppointments: async (date?: string): Promise<ApiResponse<AppointmentSummary[]>> => {
    return apiClient.get<AppointmentSummary[]>(`/appointments${date ? `?date=${date}` : ''}`);
  },
  getChairAppointments: async (chairId: string): Promise<ApiResponse<AppointmentSummary[]>> => {
    return apiClient.get<AppointmentSummary[]>(`/chairs/${chairId}/appointments`);
  },
  createAppointment: async (data: Partial<AppointmentSummary>): Promise<ApiResponse<AppointmentSummary>> => {
    return apiClient.post<AppointmentSummary>('/appointments', data);
  },
};
