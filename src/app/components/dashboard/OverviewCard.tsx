import { LucideIcon } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  iconColor: string;
}

export default function OverviewCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  iconColor 
}: OverviewCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className={`text-sm ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-lg`} style={{ backgroundColor: iconColor }}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
} 