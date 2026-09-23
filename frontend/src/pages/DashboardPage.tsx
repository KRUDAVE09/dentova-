import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import {
  Calendar,
  Users,
  Activity,
  DollarSign,
  UserPlus,
  CalendarPlus,
  Stethoscope,
  Receipt,
  MoreVertical,
  Clock,
  ArrowRight
} from 'lucide-react';
import { todayAppointments, recentPatients } from '../constants/dashboardMocks';
import type { AppointmentStatus, PatientStatus } from '../constants/dashboardMocks';

export const DashboardPage: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getStatusBadgeVariant = (status: AppointmentStatus | PatientStatus) => {
    switch (status) {
      case 'Completed':
      case 'Active':
        return 'success';
      case 'Waiting':
      case 'New':
        return 'warning';
      case 'In Chair':
        return 'info';
      case 'Scheduled':
        return 'neutral';
      case 'Cancelled':
      case 'Inactive':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Dashboard Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            Good Morning, Dr. Smith
          </h1>
          <p className="text-sm text-stone-500 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0F766E]" />
            {currentDate}
          </p>
          <p className="text-sm text-stone-600 mt-2">
            You have <strong className="text-stone-900">8</strong> appointments today and <strong className="text-stone-900">2</strong> patients waiting.
          </p>
        </div>
        <Button size="lg" className="shrink-0" leftIcon={<Activity className="w-4 h-4" />}>
          Start Clinic Day
        </Button>
      </div>

      {/* 2. Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-auto py-3 px-4 justify-start bg-white hover:bg-stone-50" leftIcon={<UserPlus className="w-5 h-5 text-[#0F766E]" />}>
          New Patient
        </Button>
        <Button variant="outline" className="h-auto py-3 px-4 justify-start bg-white hover:bg-stone-50" leftIcon={<CalendarPlus className="w-5 h-5 text-[#0F766E]" />}>
          New Appointment
        </Button>
        <Button variant="outline" className="h-auto py-3 px-4 justify-start bg-white hover:bg-stone-50" leftIcon={<Stethoscope className="w-5 h-5 text-[#0F766E]" />}>
          Add Treatment
        </Button>
        <Button variant="outline" className="h-auto py-3 px-4 justify-start bg-white hover:bg-stone-50" leftIcon={<Receipt className="w-5 h-5 text-[#0F766E]" />}>
          Create Bill
        </Button>
      </div>

      {/* 3. Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Today's Appointments</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-stone-900">8</h3>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">On track</span>
            </div>
            <p className="text-xs text-stone-500 mt-2">2 completed • 2 waiting</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#DDF3EF] flex items-center justify-center border border-[#0F766E]/20">
            <Calendar className="w-5 h-5 text-[#0F766E]" />
          </div>
        </Card>

        <Card className="p-5 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Waiting Patients</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-stone-900">2</h3>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Avg 8m wait</span>
            </div>
            <p className="text-xs text-stone-500 mt-2">Next up: Emily Rodriguez</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
        </Card>

        <Card className="p-5 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Today's Revenue</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-stone-900">$4,250</h3>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12% vs avg</span>
            </div>
            <p className="text-xs text-stone-500 mt-2">$1,200 pending claims</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-200">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
        </Card>

        <Card className="p-5 flex items-start justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">Follow-ups Due</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-stone-900">4</h3>
            </div>
            <p className="text-xs text-stone-500 mt-2">2 urgent callbacks</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-200">
            <Activity className="w-5 h-5 text-rose-600" />
          </div>
        </Card>
      </div>

      {/* 4 & 5. Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Today's Appointments (takes 2 columns on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">Today's Appointments</h2>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Schedule
            </Button>
          </div>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-stone-50 text-stone-500 border-b border-stone-200/80">
                  <tr>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Dentist</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {todayAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-stone-50/50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 font-medium text-stone-900">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {apt.time}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-[#0F766E]">{apt.patientName}</td>
                      <td className="px-4 py-3 text-stone-600">{apt.dentist}</td>
                      <td className="px-4 py-3 text-stone-600">{apt.type}</td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant={getStatusBadgeVariant(apt.status)}>
                          {apt.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <IconButton 
                          icon={<MoreVertical className="w-4 h-4" />} 
                          variant="ghost" 
                          size="sm" 
                          aria-label="Appointment options"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Patients */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">Recent Patients</h2>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Directory
            </Button>
          </div>

          <Card className="divide-y divide-stone-100">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="p-4 hover:bg-stone-50/50 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{patient.name}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{patient.chartNumber} • {patient.lastVisit}</p>
                </div>
                <Badge size="sm" variant={getStatusBadgeVariant(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
            ))}
            <div className="p-3 text-center bg-stone-50">
              <Button variant="ghost" size="sm" className="w-full text-stone-600">
                View all recent patients
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
