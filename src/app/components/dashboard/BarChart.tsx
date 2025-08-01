interface BarChartData {
  month: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue?: number;
}

export default function BarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="h-64 flex items-end space-x-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-500"
            style={{ height: `${(item.value / max) * 200}px` }}
          ></div>
          <span className="text-gray-400 text-sm mt-2">{item.month}</span>
        </div>
      ))}
    </div>
  );
} 