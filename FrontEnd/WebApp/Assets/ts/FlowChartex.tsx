import FlowChart from '../FlowChart';

export default function FlowChartExample() {
  const mockData = [
    { time: '00:00', flowRate: 42 },
    { time: '04:00', flowRate: 38 },
    { time: '08:00', flowRate: 55 },
    { time: '12:00', flowRate: 62 },
    { time: '16:00', flowRate: 48 },
    { time: '20:00', flowRate: 45 },
  ];

  return (
    <div className="p-8">
      <FlowChart data={mockData} />
    </div>
  );
}