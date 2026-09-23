import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Receipt, Plus } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const invoices = [
    { id: 'INV-2026-001', patient: 'Eleanor Vance', date: '2026-09-22', amount: '$450.00', status: 'paid' },
    { id: 'INV-2026-002', patient: 'Marcus Aurelius', date: '2026-09-23', amount: '$1,200.00', status: 'pending' },
    { id: 'INV-2026-003', patient: 'Sophia Loren', date: '2026-09-20', amount: '$180.00', status: 'insurance_submitted' },
  ];

  const columns = [
    { key: 'id', header: 'Invoice #', render: (item: any) => <span className="font-mono font-bold text-[#0F766E]">{item.id}</span> },
    { key: 'patient', header: 'Patient Name' },
    { key: 'date', header: 'Billing Date' },
    { key: 'amount', header: 'Total Amount', align: 'right' as const, render: (item: any) => <span className="font-bold">{item.amount}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (item: any) => (
        <Badge variant={item.status === 'paid' ? 'success' : item.status === 'pending' ? 'warning' : 'info'}>
          {item.status.replace('_', ' ')}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Invoicing"
        description="Patient invoices, payment processing, and insurance claim tracking."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Create New Invoice
          </Button>
        }
      />

      <Card className="p-6">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-[#0F766E]" />
          Recent Invoices & Claims
        </h3>
        <Table columns={columns} data={invoices} keyExtractor={(item) => item.id} />
      </Card>
    </div>
  );
};
