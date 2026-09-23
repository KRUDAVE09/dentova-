export type AppointmentStatus = 'Scheduled' | 'Waiting' | 'In Chair' | 'Completed' | 'Cancelled';
export type PatientStatus = 'Active' | 'Inactive' | 'New';

export interface DashboardAppointment {
  id: string;
  time: string;
  patientName: string;
  dentist: string;
  type: string;
  status: AppointmentStatus;
}

export interface DashboardPatient {
  id: string;
  name: string;
  chartNumber: string;
  lastVisit: string;
  status: PatientStatus;
}

export const todayAppointments: DashboardAppointment[] = [
  {
    id: 'apt-1',
    time: '09:00 AM',
    patientName: 'Sarah Jenkins',
    dentist: 'Dr. Smith',
    type: 'General Checkup',
    status: 'Completed',
  },
  {
    id: 'apt-2',
    time: '09:30 AM',
    patientName: 'Michael Chen',
    dentist: 'Dr. Smith',
    type: 'Root Canal - Pt 1',
    status: 'Completed',
  },
  {
    id: 'apt-3',
    time: '10:00 AM',
    patientName: 'Emily Rodriguez',
    dentist: 'Dr. Smith',
    type: 'Teeth Cleaning',
    status: 'Waiting',
  },
  {
    id: 'apt-4',
    time: '10:15 AM',
    patientName: 'James Wilson',
    dentist: 'Dr. Smith',
    type: 'Consultation',
    status: 'Waiting',
  },
  {
    id: 'apt-5',
    time: '10:45 AM',
    patientName: 'Olivia Davis',
    dentist: 'Dr. Smith',
    type: 'Crown Fitting',
    status: 'In Chair',
  },
  {
    id: 'apt-6',
    time: '11:30 AM',
    patientName: 'Robert Taylor',
    dentist: 'Dr. Smith',
    type: 'Extraction',
    status: 'Scheduled',
  },
  {
    id: 'apt-7',
    time: '01:00 PM',
    patientName: 'Maria Garcia',
    dentist: 'Dr. Smith',
    type: 'Whitening',
    status: 'Scheduled',
  },
  {
    id: 'apt-8',
    time: '02:00 PM',
    patientName: 'David Thompson',
    dentist: 'Dr. Smith',
    type: 'General Checkup',
    status: 'Scheduled',
  },
];

export const recentPatients: DashboardPatient[] = [
  {
    id: 'pt-1',
    name: 'Sarah Jenkins',
    chartNumber: 'PT-8942',
    lastVisit: 'Today',
    status: 'Active',
  },
  {
    id: 'pt-2',
    name: 'David Thompson',
    chartNumber: 'PT-8941',
    lastVisit: 'Yesterday',
    status: 'New',
  },
  {
    id: 'pt-3',
    name: 'Maria Garcia',
    chartNumber: 'PT-8920',
    lastVisit: 'Sep 21, 2026',
    status: 'Active',
  },
  {
    id: 'pt-4',
    name: 'Robert Taylor',
    chartNumber: 'PT-8895',
    lastVisit: 'Sep 18, 2026',
    status: 'Inactive',
  },
];
