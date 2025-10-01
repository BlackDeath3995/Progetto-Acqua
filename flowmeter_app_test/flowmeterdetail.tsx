import { useRoute } from "wouter";
import { ArrowLeft, Droplets, Gauge, Thermometer, Activity, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/MetricCard";
import FlowChart from "@/components/FlowChart";
import StatusBadge from "@/components/StatusBadge";

export default function FlowmeterDetail() {
  const [, params] = useRoute("/flowmeters/:id");
  const flowmeterId = params?.id;

  // todo: remove mock functionality
  const mockFlowmeter = {
    id: flowmeterId,
    name: 'Main Line A',
    location: 'Building 1, Floor 2',
    status: 'active' as const,
    currentFlowRate: 45.2,
    totalVolume: 12450,
    pressure: 3.2,
    temperature: 22.5,
    lastUpdated: '2 minutes ago',
  };

  // todo: remove mock functionality
  const mockChartData = [
    { time: '00:00', flowRate: 42 },
    { time: '02:00', flowRate: 40 },
    { time: '04:00', flowRate: 38 },
    { time: '06:00', flowRate: 45 },
    { time: '08:00', flowRate: 55 },
    { time: '10:00', flowRate: 58 },
    { time: '12:00', flowRate: 62 },
    { time: '14:00', flowRate: 59 },
    { time: '16:00', flowRate: 48 },
    { time: '18:00', flowRate: 46 },
    { time: '20:00', flowRate: 45 },
    { time: '22:00', flowRate: 43 },
  ];

  return (
    <div className="space-y-6" data-testid="page-flowmeter-detail">
      <div className="flex items-center gap-4">
        <Link href="/flowmeters">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold" data-testid="text-flowmeter-name">
              {mockFlowmeter.name}
            </h1>
            <StatusBadge status={mockFlowmeter.status} />
          </div>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{mockFlowmeter.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Last updated</div>
          <div className="text-sm">{mockFlowmeter.lastUpdated}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Flow"
          value={mockFlowmeter.currentFlowRate}
          unit="L/min"
          icon={Droplets}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Volume"
          value={mockFlowmeter.totalVolume.toLocaleString()}
          unit="L"
          icon={Activity}
        />
        <MetricCard
          title="Pressure"
          value={mockFlowmeter.pressure}
          unit="bar"
          icon={Gauge}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricCard
          title="Temperature"
          value={mockFlowmeter.temperature}
          unit="°C"
          icon={Thermometer}
        />
      </div>

      <FlowChart data={mockChartData} title="Flow Rate History (24h)" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card data-testid="card-device-info">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Device Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Device ID</span>
              <span className="font-mono">{mockFlowmeter.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model</span>
              <span>FM-2000 Pro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Serial Number</span>
              <span className="font-mono">SN-2024-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Firmware</span>
              <span>v2.4.1</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-alerts">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground text-center py-4">
                No recent alerts
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
