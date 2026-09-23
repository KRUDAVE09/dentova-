import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PatientsPage } from '../pages/PatientsPage';
import { PatientDetailPage } from '../pages/PatientDetailPage';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { WaitingRoomPage } from '../pages/WaitingRoomPage';
import { FollowUpsPage } from '../pages/FollowUpsPage';
import { TreatmentsPage } from '../pages/TreatmentsPage';
import { BillingPage } from '../pages/BillingPage';
import { InventoryPage } from '../pages/InventoryPage';
import { MessagesPage } from '../pages/MessagesPage';
import { ReportsPage } from '../pages/ReportsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { ROUTES } from '../constants/routes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Standalone Login Route */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Main Layout Protected Shell Routes */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.PATIENTS} element={<PatientsPage />} />
        <Route path={ROUTES.PATIENT_DETAIL} element={<PatientDetailPage />} />
        <Route path={ROUTES.APPOINTMENTS} element={<AppointmentsPage />} />
        <Route path={ROUTES.WAITING_ROOM} element={<WaitingRoomPage />} />
        <Route path={ROUTES.FOLLOW_UPS} element={<FollowUpsPage />} />
        <Route path={ROUTES.TREATMENTS} element={<TreatmentsPage />} />
        <Route path={ROUTES.BILLING} element={<BillingPage />} />
        <Route path={ROUTES.INVENTORY} element={<InventoryPage />} />
        <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      </Route>

      {/* Default Fallback Redirect to Dashboard */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
