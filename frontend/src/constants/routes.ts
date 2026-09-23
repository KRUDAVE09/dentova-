export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  PATIENT_DETAIL: '/patients/:id',
  APPOINTMENTS: '/appointments',
  WAITING_ROOM: '/waiting-room',
  FOLLOW_UPS: '/follow-ups',
  TREATMENTS: '/treatments',
  BILLING: '/billing',
  INVENTORY: '/inventory',
  MESSAGES: '/messages',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const;

export interface RouteConfig {
  path: string;
  name: string;
  description: string;
  category: 'clinical' | 'management' | 'admin';
}

export const ROUTE_CONFIGS: Record<string, RouteConfig> = {
  [ROUTES.DASHBOARD]: {
    path: ROUTES.DASHBOARD,
    name: 'Dashboard',
    description: 'Overview of clinic metrics, today\'s schedule, and chair activities.',
    category: 'management',
  },
  [ROUTES.PATIENTS]: {
    path: ROUTES.PATIENTS,
    name: 'Patients',
    description: 'Comprehensive patient directory, medical histories, and charts.',
    category: 'clinical',
  },
  [ROUTES.APPOINTMENTS]: {
    path: ROUTES.APPOINTMENTS,
    name: 'Appointments',
    description: 'Multi-chair appointment scheduling and calendar management.',
    category: 'clinical',
  },
  [ROUTES.WAITING_ROOM]: {
    path: ROUTES.WAITING_ROOM,
    name: 'Waiting Room',
    description: 'Real-time patient check-in queue and chair assignment dispatch.',
    category: 'clinical',
  },
  [ROUTES.FOLLOW_UPS]: {
    path: ROUTES.FOLLOW_UPS,
    name: 'Follow-ups',
    description: 'Post-treatment patient tracking and automated care reminders.',
    category: 'clinical',
  },
  [ROUTES.TREATMENTS]: {
    path: ROUTES.TREATMENTS,
    name: 'Treatments',
    description: 'Dental procedure catalog, treatment planning, and tooth charts.',
    category: 'clinical',
  },
  [ROUTES.BILLING]: {
    path: ROUTES.BILLING,
    name: 'Billing & Invoices',
    description: 'Patient invoicing, insurance claims, and payment records.',
    category: 'management',
  },
  [ROUTES.INVENTORY]: {
    path: ROUTES.INVENTORY,
    name: 'Inventory',
    description: 'Dental supplies, sterilisation tracking, and low-stock alerts.',
    category: 'management',
  },
  [ROUTES.MESSAGES]: {
    path: ROUTES.MESSAGES,
    name: 'Messages',
    description: 'Internal staff communication and automated patient SMS/Email notifications.',
    category: 'management',
  },
  [ROUTES.REPORTS]: {
    path: ROUTES.REPORTS,
    name: 'Reports & Analytics',
    description: 'Clinic performance, financial summaries, and chair utilization reports.',
    category: 'management',
  },
  [ROUTES.SETTINGS]: {
    path: ROUTES.SETTINGS,
    name: 'Clinic Settings',
    description: 'Clinic configuration, chair management, user permissions, and preferences.',
    category: 'admin',
  },
};
