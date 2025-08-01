import { Download, Filter } from 'lucide-react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onDownload?: () => void;
  onFilter?: () => void;
}

export default function ChartCard({ 
  title, 
  children, 
  onDownload, 
  onFilter 
}: ChartCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex space-x-2">
          {onFilter && (
            <button 
              onClick={onFilter}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Filter size={16} />
            </button>
          )}
          {onDownload && (
            <button 
              onClick={onDownload}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Download size={16} />
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
} 