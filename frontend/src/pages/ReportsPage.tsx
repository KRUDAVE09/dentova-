import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useClinic } from '../hooks/useClinic';
import { BarChart3, TrendingUp, Armchair, DollarSign } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { clinicConfig } = useClinic();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Clinic performance, financial summaries, and operatory chair utilization."
        badge={<Badge variant="teal">{clinicConfig.chairCount}-Chair Suite Metrics</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DDF3EF] text-[#0F766E] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-semibold">Monthly Revenue</p>
            <h3 className="text-2xl font-bold text-stone-900">$84,500.00</h3>
            <p className="text-xs text-emerald-600 font-medium">+14% vs last month</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Armchair className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-semibold">Avg Chair Production</p>
            <h3 className="text-2xl font-bold text-stone-900">$1,690 / Chair / Day</h3>
            <p className="text-xs text-stone-500">Across {clinicConfig.chairCount} Operatories</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-semibold">Treatment Acceptance</p>
            <h3 className="text-2xl font-bold text-stone-900">78.5%</h3>
            <p className="text-xs text-emerald-600 font-medium">+3.2% growth</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#0F766E]" />
          Analytics Engine Placeholder
        </h3>
        <p className="text-sm text-stone-500">
          Advanced production, doctor performance breakdown, and chair turnover analytics charts will render here in phase 2.
        </p>
      </Card>
    </div>
  );
};
