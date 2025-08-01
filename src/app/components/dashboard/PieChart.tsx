interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

export default function PieChart({ data, size = 128 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const circumference = 2 * Math.PI * (radius - 4);
  
  let currentOffset = 0;
  
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          className="transform -rotate-90" 
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: size, height: size }}
        >
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference * (1 - percentage);
            const offset = currentOffset;
            currentOffset += strokeDashoffset;
            
            return (
              <circle
                key={index}
                cx={radius}
                cy={radius}
                r={radius - 4}
                fill="none"
                stroke={item.color}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={offset}
                className="transition-all duration-1000"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-semibold">
            {Math.round((data[0]?.value / total) * 100)}%
          </span>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-300 text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 