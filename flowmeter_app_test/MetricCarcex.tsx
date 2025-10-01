import MetricCard from '../MetricCard';
import { Droplets, Gauge, Thermometer, Activity } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
      <MetricCard
        title="Current Flow"
        value="45.2"
        unit="L/min"
        icon={Droplets}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Total Volume"
        value="1,240"
        unit="L"
        icon={Activity}
      />
      <MetricCard
        title="Pressure"
        value="3.2"
        unit="bar"
        icon={Gauge}
        trend={{ value: 5, isPositive: false }}
      />
      <MetricCard
        title="Temperature"
        value="22.5"
        unit="°C"
        icon={Thermometer}
      />
    </div>
  );
}