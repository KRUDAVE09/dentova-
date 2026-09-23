import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Card } from '../components/ui/Card';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useClinic } from '../hooks/useClinic';
import type { ChairPresetCount } from '../types/clinic';
import { Armchair, Calendar, Users, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { clinicConfig, chairs, activeChair, setChairPresetCount, setActiveChairId } = useClinic();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinic Dashboard"
        description="Multi-chair operational overview & clinic status placeholder."
        badge={<Badge variant="teal">Foundation Mode</Badge>}
        actions={
          <Button variant="outline" leftIcon={<Sparkles className="w-4 h-4 text-[#0F766E]" />}>
            Configure Layout
          </Button>
        }
      />

      {/* Multi-Chair Presets Switcher Banner */}
      <Card className="p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white border-stone-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <Armchair className="w-5 h-5 text-[#0F766E]" />
              <span>Active Clinic Configuration: {clinicConfig.chairCount} Operatories</span>
            </h3>
            <p className="text-xs text-stone-300 max-w-xl">
              Dentova supports 1, 2, 5, and 10+ chair clinics dynamically without hardcoded limits. Click below to preview different chair scale configurations:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[1, 2, 5, 10].map((count) => (
              <button
                key={count}
                onClick={() => setChairPresetCount(count as ChairPresetCount)}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition-all border ${
                  clinicConfig.chairCount === count
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-md'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                }`}
              >
                {count} {count === 1 ? 'Chair' : count === 10 ? 'Chairs+' : 'Chairs'}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Chair Status Cards (Selective Glassmorphism Demonstration) */}
      <div className="space-y-3">
        <SectionHeader
          title="Live Operatory Status (Selective Glass Cards)"
          subtitle={`Displaying ${chairs.length} chairs in active clinic setup`}
          icon={<Activity className="w-5 h-5" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {chairs.map((chair) => {
            const isSelected = chair.id === activeChair?.id;
            const glassVariant =
              chair.status === 'occupied'
                ? 'occupied'
                : chair.status === 'available'
                ? 'available'
                : chair.status === 'cleaning'
                ? 'cleaning'
                : 'maintenance';

            return (
              <GlassCard
                key={chair.id}
                variant={isSelected ? 'selected' : glassVariant}
                hoverable
                onClick={() => setActiveChairId(chair.id)}
                className="cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Armchair className="w-5 h-5 text-stone-700" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-tight">{chair.name}</h4>
                      <p className="text-[11px] text-stone-500">{chair.roomNumber}</p>
                    </div>
                  </div>
                  <Badge
                    size="sm"
                    variant={
                      chair.status === 'occupied'
                        ? 'danger'
                        : chair.status === 'available'
                        ? 'success'
                        : chair.status === 'cleaning'
                        ? 'warning'
                        : 'neutral'
                    }
                  >
                    {chair.status}
                  </Badge>
                </div>

                {chair.status === 'occupied' ? (
                  <div className="space-y-1.5 pt-2 border-t border-stone-200/60 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Patient:</span>
                      <span className="font-semibold text-stone-800">{chair.currentPatientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Doctor:</span>
                      <span className="font-medium text-stone-700">{chair.assignedDoctorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Procedure:</span>
                      <span className="font-medium text-[#0F766E]">{chair.currentProcedure}</span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-stone-200/60 text-xs text-stone-500 flex justify-between items-center">
                    <span>Next Appointment:</span>
                    <span className="font-semibold text-stone-700">{chair.nextAppointmentTime || '11:00 AM'}</span>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Main Feature Metric Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DDF3EF] text-[#0F766E] flex items-center justify-center border border-[#0F766E]/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-semibold uppercase">Today's Patients</p>
            <h3 className="text-2xl font-bold text-stone-900">24 Scheduled</h3>
            <p className="text-xs text-emerald-600 font-medium">8 Completed • 4 Waiting</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-semibold uppercase">Chair Occupancy</p>
            <h3 className="text-2xl font-bold text-stone-900">82% Capacity</h3>
            <p className="text-xs text-stone-500 font-medium">Across {clinicConfig.chairCount} Operatories</p>
          </div>
        </Card>

        <GlassCard variant="teal" className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#17201E] text-[#5EEAD4] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-600 font-bold uppercase">Foundation Ready</p>
            <h3 className="text-lg font-bold text-stone-900">UI Foundation Shell</h3>
            <p className="text-xs text-stone-600">Business logic ready for phase 2</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
