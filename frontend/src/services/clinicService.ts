import { apiClient } from './apiClient';
import type { ApiResponse } from './apiClient';
import type { ClinicConfig, Chair } from '../types/clinic';

/**
 * Service abstraction for Clinic & Chair Configuration Endpoints.
 */
export const clinicService = {
  getClinicConfig: async (): Promise<ApiResponse<ClinicConfig>> => {
    return apiClient.get<ClinicConfig>('/clinic/config');
  },
  updateChairStatus: async (chairId: string, status: string): Promise<ApiResponse<Chair>> => {
    return apiClient.put<Chair>(`/chairs/${chairId}/status`, { status });
  },
  updateChairCount: async (count: number): Promise<ApiResponse<ClinicConfig>> => {
    return apiClient.put<ClinicConfig>('/clinic/chairs/count', { count });
  },
};
