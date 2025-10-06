import { Activity, Droplets, Gauge, TrendingUp } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import FlowChart from "@/components/FlowChart";
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Home() {
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

  // todo: remove mock functionality
  const recentFlowmeters = [
    { id: '1', name: 'Main Line A', location: 'Building 1', status: 'active' as const, flowRate: 45.2 },
    { id: '2', name: 'Production Line B', location: 'Factory Floor', status: 'active' as const, flowRate: 38.7 },
    { id: '3', name: 'Cooling System', location: 'Building 2', status: 'warning' as const, flowRate: 22.1 },
  ];

  return (
    <div className="space-y-6" data-testid="page-home">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor your flowmeter network</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Flowmeters"
          value="12"
          icon={Droplets}
        />
        <MetricCard
          title="Active Units"
          value="10"
          icon={Activity}
          trend={{ value: 5, isPositive: true }}
        />
        <MetricCard
          title="Avg Flow Rate"
          value="43.8"
          unit="L/min"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Avg Pressure"
          value="3.1"
          unit="bar"
          icon={Gauge}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <FlowChart data={mockChartData} title="Network Flow Rate (24h)" />

      <Card data-testid="card-recent-flowmeters">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFlowmeters.map((flowmeter) => (
              <Link key={flowmeter.id} href={`/flowmeters/${flowmeter.id}`}>
                <div 
                  className="flex items-center justify-between p-4 rounded-md hover-elevate active-elevate-2 cursor-pointer"
                  data-testid={`card-flowmeter-${flowmeter.id}`}
                >
                  <div className="flex-1">
                    <div className="font-medium">{flowmeter.name}</div>
                    <div className="text-sm text-muted-foreground">{flowmeter.location}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono font-bold">{flowmeter.flowRate}</div>
                      <div className="text-xs text-muted-foreground">L/min</div>
                    </div>
                    <StatusBadge status={flowmeter.status} showIcon={false} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
