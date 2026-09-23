import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { User, Calendar, FileText, Activity, Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';

export const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    { id: 'summary', label: 'Clinical Summary', icon: <User className="w-4 h-4" /> },
    { id: 'chart', label: 'Dental Odontogram Chart', icon: <Activity className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments History', icon: <Calendar className="w-4 h-4" />, badge: '5' },
    { id: 'billing', label: 'Invoices & Ledger', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Patient Chart: ${id || 'pat-101'}`}
        description="Comprehensive patient clinical profile, dental chart, and history log."
        breadcrumbs={[
          { label: 'Patients Directory', href: ROUTES.PATIENTS },
          { label: `Record #${id || 'pat-101'}` },
        ]}
        actions={
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate(ROUTES.PATIENTS)}>
            Back to Directory
          </Button>
        }
      />

      {/* Patient Profile Header Card */}
      <Card className="p-6 bg-white border-stone-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#17201E] text-[#5EEAD4] flex items-center justify-center font-bold text-2xl border border-stone-800 shadow-md">
            EV
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-stone-900">Eleanor Vance</h2>
              <Badge variant="success">Active Patient</Badge>
              <Badge variant="teal">Chart #DEN-8821</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> +1 (555) 321-9876
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> eleanor.vance@example.com
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> 124 Boston Way, Suite 3
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="teal">Book Operatory</Button>
          <Button variant="primary">Add Treatment Plan</Button>
        </div>
      </Card>

      {/* Section Tabs */}
      <Tabs tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content Placeholder */}
      <Card className="p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-[#DDF3EF] text-[#0F766E] flex items-center justify-center mb-3">
          <Activity className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-stone-900 mb-1">
          {tabs.find((t) => t.id === activeTab)?.label} Module Placeholder
        </h3>
        <p className="text-sm text-stone-500 max-w-md">
          Patient record detail view for tab "{activeTab}". Actual dental chart & records logic will be built in future business releases.
        </p>
      </Card>
    </div>
  );
};
