import { Calendar } from 'lucide-react';

interface SubscriptionCardProps {
  plan: string;
  endDate: Date;
  daysLeft: number;
  onRenew: () => void;
}

export default function SubscriptionCard({ 
  plan, 
  endDate, 
  daysLeft, 
  onRenew 
}: SubscriptionCardProps) {
  const isExpiringSoon = daysLeft <= 30;
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscription Status</h3>
          <p className="text-blue-100">{plan}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Calendar size={16} />
            <span>Expires: {endDate.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${isExpiringSoon ? 'text-yellow-300' : 'text-green-300'}`}>
            {daysLeft} days left
          </div>
          <button 
            onClick={onRenew}
            className="mt-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            Renew Now
          </button>
        </div>
      </div>
    </div>
  );
} 