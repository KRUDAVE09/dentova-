import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Package, Plus } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const stock = [
    { sku: 'SUP-101', name: 'Nitrile Exam Gloves (Medium)', category: 'PPE', quantity: '45 Boxes', status: 'in_stock' },
    { sku: 'SUP-102', name: 'Composite Resin A2 Shade', category: 'Restorative', quantity: '3 Syringes', status: 'low_stock' },
    { sku: 'SUP-103', name: 'Dental Anesthetic Cartridges 2%', category: 'Pharmaceutical', quantity: '120 Units', status: 'in_stock' },
  ];

  const columns = [
    { key: 'sku', header: 'SKU Code', render: (item: any) => <span className="font-mono text-[#0F766E] font-bold">{item.sku}</span> },
    { key: 'name', header: 'Item Description' },
    { key: 'category', header: 'Category' },
    { key: 'quantity', header: 'Stock On Hand', align: 'right' as const },
    {
      key: 'status',
      header: 'Stock Status',
      render: (item: any) => (
        <Badge variant={item.status === 'in_stock' ? 'success' : 'danger'}>
          {item.status.replace('_', ' ')}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dental Inventory & Supplies"
        description="Supply stock tracking, operatory restocking alerts, and sterilisation logs."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Restock Supply Item
          </Button>
        }
      />

      <Card className="p-6">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#0F766E]" />
          Current Stock Levels
        </h3>
        <Table columns={columns} data={stock} keyExtractor={(item) => item.sku} />
      </Card>
    </div>
  );
};
