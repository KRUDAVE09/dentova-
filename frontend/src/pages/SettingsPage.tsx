import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { useClinic } from '../hooks/useClinic';
import type { ChairPresetCount } from '../types/clinic';
import { Armchair, Building, ShieldCheck, Save } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export const SettingsPage: React.FC = () => {
  const { clinicConfig, setChairPresetCount } = useClinic();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('chairs');

  const tabs = [
    { id: 'chairs', label: 'Multi-Chair Setup', icon: <Armchair className="w-4 h-4" /> },
    { id: 'general', label: 'Clinic Details', icon: <Building className="w-4 h-4" /> },
    { id: 'security', label: 'Roles & Security', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    showToast('Settings Saved', 'Clinic configuration updated successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clinic Settings & Configurations"
        description="Manage multi-chair operatory counts, practice information, and system preferences."
        actions={
          <Button variant="primary" leftIcon={<Save className="w-4 h-4" />} onClick={handleSave}>
            Save Changes
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'chairs' && (
        <Card className="p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Armchair className="w-5 h-5 text-[#0F766E]" />
              Operatory & Chair Scale Setup
            </h3>
            <p className="text-xs text-stone-500">
              Configure how many chairs your clinic operates. Dentova adapts schedules, grid layouts, and dispatch queues dynamically.
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Select Chair Preset Configuration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 5, 10].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setChairPresetCount(preset as ChairPresetCount);
                      showToast('Multi-Chair Preset Applied', `Clinic scaled to ${preset} chairs.`, 'info');
                    }}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      clinicConfig.chairCount === preset
                        ? 'border-[#0F766E] bg-[#DDF3EF]/60 font-bold text-stone-900 shadow-xs ring-1 ring-[#0F766E]/40'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-lg font-bold">{preset}</div>
                    <div className="text-[11px] text-stone-500 font-normal">
                      {preset === 1 ? 'Chair' : preset === 10 ? 'Chairs+' : 'Chairs'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-600">
              <div className="font-bold text-stone-900">Current Chair Allocation Summary:</div>
              <ul className="list-disc pl-4 space-y-1">
                {clinicConfig.chairs.map((c) => (
                  <li key={c.id}>
                    <span className="font-semibold text-stone-800">{c.name}</span> ({c.roomNumber}) - Status:{' '}
                    <span className="capitalize">{c.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'general' && (
        <Card className="p-6 space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-[#0F766E]" />
            Practice Details
          </h3>
          <Input label="Clinic Name" defaultValue={clinicConfig.name} />
          <Input label="Tax ID / License #" defaultValue={clinicConfig.taxId} />
          <Input label="Primary Phone" defaultValue={clinicConfig.phone} />
          <Input label="Contact Email" defaultValue={clinicConfig.email} />
        </Card>
      )}

      {activeTab === 'security' && (
        <Card className="p-6 max-w-2xl space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Security & Role Access Controls
          </h3>
          <p className="text-sm text-stone-500">
            Role-Based Access Control (RBAC) settings for dentists, hygienists, receptionists, and billing staff.
          </p>
        </Card>
      )}
    </div>
  );
};
