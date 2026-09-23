import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PhoneCall, CheckCircle2, MessageSquare } from 'lucide-react';

export const FollowUpsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Post-Treatment Follow-ups"
        description="Automated post-op patient care tracking, call logs, and recovery check-ins."
        badge={<Badge variant="teal">5 Pending Today</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#DDF3EF] text-[#0F766E] flex items-center justify-center font-bold">
                EV
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Eleanor Vance</h4>
                <p className="text-xs text-stone-500">Extraction #18 • Yesterday 03:30 PM</p>
              </div>
            </div>
            <Badge variant="warning">Follow-up Due</Badge>
          </div>
          <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
            Notes: Patient reported mild post-op discomfort. Recommended cold compress and prescribed ibuprofen. Follow up on pain levels today.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="teal" size="sm" leftIcon={<PhoneCall className="w-4 h-4" />}>
              Call Patient
            </Button>
            <Button variant="outline" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />}>
              Send SMS Care Kit
            </Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                MA
              </div>
              <div>
                <h4 className="font-bold text-stone-900">Marcus Aurelius</h4>
                <p className="text-xs text-stone-500">Crown Preparation #19 • 2 Days Ago</p>
              </div>
            </div>
            <Badge variant="success">Completed</Badge>
          </div>
          <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
            Notes: Checked bite alignment via phone call. Patient confirms zero sensitivity. Permanent crown placement set for Oct 02.
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-600" />}>
              Logged & Verified
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
