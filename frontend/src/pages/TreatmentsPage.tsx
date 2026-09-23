import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Stethoscope, Plus } from 'lucide-react';

export const TreatmentsPage: React.FC = () => {
  const procedureCatalog = [
    { code: 'D0120', name: 'Periodic Oral Evaluation', category: 'Diagnostic', fee: '$65.00' },
    { code: 'D1110', name: 'Adult Dental Prophylaxis', category: 'Preventive', fee: '$95.00' },
    { code: 'D3310', name: 'Endodontic Therapy - Anterior Tooth', category: 'Endodontics', fee: '$850.00' },
    { code: 'D2740', name: 'Crown - Porcelain/Ceramic Substrate', category: 'Restorative', fee: '$1,200.00' },
  ];

  const columns = [
    { key: 'code', header: 'ADA Code', render: (item: any) => <span className="font-mono font-bold text-[#0F766E]">{item.code}</span> },
    { key: 'name', header: 'Procedure Name' },
    { key: 'category', header: 'Category', render: (item: any) => <Badge variant="neutral">{item.category}</Badge> },
    { key: 'fee', header: 'Standard Fee', align: 'right' as const, render: (item: any) => <span className="font-bold text-stone-900">{item.fee}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Treatments & Procedure Catalog"
        description="Standard dental procedure codes, treatment templates, and fee schedules."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add Custom Procedure
          </Button>
        }
      />

      <Card className="p-6">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#0F766E]" />
          ADA Procedure Fee Schedule
        </h3>
        <Table columns={columns} data={procedureCatalog} keyExtractor={(item) => item.code} />
      </Card>
    </div>
  );
};
