import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useClinic } from '../hooks/useClinic';
import { Clock, UserCheck, ArrowRight, Armchair } from 'lucide-react';

export const WaitingRoomPage: React.FC = () => {
  const { clinicConfig, chairs } = useClinic();

  const waitingPatients = [
    { id: 'w-1', name: 'Marcus Aurelius', arrivedAt: '10:15 AM', waitTime: '12 min', assignedChair: 'Operatory 3', status: 'ready' },
    { id: 'w-2', name: 'Clara Oswald', arrivedAt: '10:22 AM', waitTime: '5 min', assignedChair: 'Chair 2', status: 'waiting' },
    { id: 'w-3', name: 'Henry Jekyll', arrivedAt: '10:25 AM', waitTime: '2 min', assignedChair: 'Unassigned', status: 'checking_in' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Waiting Room Queue"
        description="Live patient check-in monitor and operatory dispatch controller."
        badge={<Badge variant="teal">3 Checked In</Badge>}
        actions={
          <Button variant="primary" leftIcon={<UserCheck className="w-4 h-4" />}>
            Quick Check-In Patient
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Waiting Queue List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-5">
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0F766E]" />
              Current Reception Queue
            </h3>
            <div className="space-y-3">
              {waitingPatients.map((pt) => (
                <div
                  key={pt.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{pt.name}</span>
                      <Badge variant={pt.status === 'ready' ? 'success' : 'warning'}>{pt.status}</Badge>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Arrived {pt.arrivedAt} • Wait time: {pt.waitTime}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <span className="text-xs font-semibold text-stone-700">{pt.assignedChair}</span>
                    <Button variant="teal" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Dispatch to Chair
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chair Availability Sidebar */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Armchair className="w-5 h-5 text-[#0F766E]" />
            Chair Status Overview ({clinicConfig.chairCount})
          </h3>
          <div className="space-y-2 text-xs">
            {chairs.map((chair) => (
              <div
                key={chair.id}
                className="p-3 rounded-xl border border-stone-200 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-stone-900">{chair.name}</p>
                  <p className="text-stone-500">{chair.roomNumber}</p>
                </div>
                <Badge
                  size="sm"
                  variant={chair.status === 'available' ? 'success' : chair.status === 'occupied' ? 'danger' : 'warning'}
                >
                  {chair.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
