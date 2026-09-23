import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useClinic } from '../hooks/useClinic';
import { Calendar, Plus, Armchair, Clock, User, Filter } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { clinicConfig, chairs } = useClinic();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments & Scheduling"
        description="Multi-chair operatory calendar and daily appointment dispatch queue."
        badge={<Badge variant="teal">{clinicConfig.chairCount} Chairs Active</Badge>}
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Appointment
          </Button>
        }
      />

      {/* Operatory Multi-Chair Column Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200/80">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#0F766E]" />
          <span className="font-bold text-stone-900">Today's Multi-Chair Grid (September 23, 2026)</span>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
          Filter Operatories
        </Button>
      </div>

      {/* Multi-Chair Grid Overview Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {chairs.map((chair) => (
          <GlassCard key={chair.id} variant="default" className="space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
              <div className="flex items-center gap-2">
                <Armchair className="w-4 h-4 text-[#0F766E]" />
                <h4 className="font-bold text-sm text-stone-900">{chair.name}</h4>
              </div>
              <Badge size="sm" variant={chair.status === 'occupied' ? 'danger' : 'success'}>
                {chair.status}
              </Badge>
            </div>

            {/* Appointment Slots */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-1">
                <div className="flex items-center justify-between text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0F766E]" /> 09:00 AM - 10:30 AM
                  </span>
                  <Badge size="sm" variant="info">In-Chair</Badge>
                </div>
                <p className="font-bold text-stone-900 flex items-center gap-1.5 pt-0.5">
                  <User className="w-3.5 h-3.5 text-stone-600" /> Eleanor Vance
                </p>
                <p className="text-stone-500">Root Canal Procedure • Dr. Jenkins</p>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50/80 border border-dashed border-stone-300 text-stone-500 flex justify-between items-center">
                <span>11:00 AM - 12:00 PM</span>
                <span className="font-semibold text-stone-700">Open Slot</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
