import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import type { TableColumn } from '../types/ui';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';

interface PatientRecord {
  id: string;
  chartNumber: string;
  name: string;
  dob: string;
  phone: string;
  lastVisit: string;
  assignedChair: string;
  status: 'active' | 'inactive';
}

export const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const dummyPatients: PatientRecord[] = [
    {
      id: 'pat-101',
      chartNumber: 'DEN-8821',
      name: 'Eleanor Vance',
      dob: '1988-04-12',
      phone: '+1 (555) 321-9876',
      lastVisit: '2026-09-10',
      assignedChair: 'Operatory 1',
      status: 'active',
    },
    {
      id: 'pat-102',
      chartNumber: 'DEN-8822',
      name: 'Marcus Aurelius',
      dob: '1975-11-23',
      phone: '+1 (555) 432-1098',
      lastVisit: '2026-09-15',
      assignedChair: 'Operatory 3',
      status: 'active',
    },
    {
      id: 'pat-103',
      chartNumber: 'DEN-8823',
      name: 'Sophia Loren',
      dob: '1992-07-04',
      phone: '+1 (555) 543-2109',
      lastVisit: '2026-08-30',
      assignedChair: 'Chair 6',
      status: 'active',
    },
    {
      id: 'pat-104',
      chartNumber: 'DEN-8824',
      name: 'Alexander Hamilton',
      dob: '1981-01-11',
      phone: '+1 (555) 654-3210',
      lastVisit: '2026-07-20',
      assignedChair: 'VIP Suite',
      status: 'inactive',
    },
  ];

  const columns: TableColumn<PatientRecord>[] = [
    {
      key: 'chartNumber',
      header: 'Chart #',
      render: (item) => <span className="font-mono font-semibold text-[#0F766E]">{item.chartNumber}</span>,
    },
    {
      key: 'name',
      header: 'Patient Name',
      render: (item) => (
        <div className="flex items-center gap-2.5 font-medium text-stone-900">
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold text-xs border border-stone-200">
            {item.name.charAt(0)}
          </div>
          <span>{item.name}</span>
        </div>
      ),
    },
    { key: 'dob', header: 'Date of Birth' },
    { key: 'phone', header: 'Contact Phone' },
    { key: 'assignedChair', header: 'Primary Chair' },
    { key: 'lastVisit', header: 'Last Visit' },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <Badge variant={item.status === 'active' ? 'success' : 'neutral'}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (item) => (
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ChevronRight className="w-4 h-4" />}
          onClick={() => navigate(`/patients/${item.id}`)}
        >
          View Chart
        </Button>
      ),
    },
  ];

  const filtered = dummyPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.chartNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients Directory"
        description="Comprehensive records, medical histories, and multi-chair chart logs."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Patient Registration
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by name, chart #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active Patients' },
              { value: 'inactive', label: 'Inactive Patients' },
            ]}
            className="w-40"
          />
          <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
            Filters
          </Button>
        </div>
      </div>

      {/* Patients Data Table */}
      <Table
        columns={columns}
        data={filtered}
        keyExtractor={(item) => item.id}
        onRowClick={(item) => navigate(`/patients/${item.id}`)}
        emptyMessage="No patient records match your current search terms."
      />
    </div>
  );
};
