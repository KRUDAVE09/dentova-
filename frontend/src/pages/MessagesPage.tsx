import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MessageSquare } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Practice Communications"
        description="Internal staff messaging and automated SMS/Email patient appointment reminders."
        badge={<Badge variant="teal">3 Unread Messages</Badge>}
      />

      <Card className="p-6">
        <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#0F766E]" />
          Internal Staff Channel & SMS Dispatch
        </h3>
        <p className="text-sm text-stone-500">
          Messages module placeholder. Instant staff operatory paging & automated patient reminder logs will be integrated here.
        </p>
      </Card>
    </div>
  );
};
