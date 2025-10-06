import { useState } from "react";
import { Link } from "wouter";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";

export default function FlowmeterList() {
  const [searchQuery, setSearchQuery] = useState("");

  // todo: remove mock functionality
  const mockFlowmeters = [
    { id: '1', name: 'Main Line A', location: 'Building 1, Floor 2', status: 'active' as const, flowRate: 45.2, totalVolume: 12450, lastUpdated: '2 min ago' },
    { id: '2', name: 'Production Line B', location: 'Factory Floor, Section A', status: 'active' as const, flowRate: 38.7, totalVolume: 9823, lastUpdated: '1 min ago' },
    { id: '3', name: 'Cooling System', location: 'Building 2, Mechanical Room', status: 'warning' as const, flowRate: 22.1, totalVolume: 5621, lastUpdated: '5 min ago' },
    { id: '4', name: 'Supply Line C', location: 'Building 1, Floor 1', status: 'active' as const, flowRate: 51.3, totalVolume: 15234, lastUpdated: '1 min ago' },
    { id: '5', name: 'Backup System', location: 'Building 3, Basement', status: 'offline' as const, flowRate: 0, totalVolume: 3421, lastUpdated: '2 hours ago' },
    { id: '6', name: 'Process Line D', location: 'Factory Floor, Section B', status: 'active' as const, flowRate: 42.8, totalVolume: 11256, lastUpdated: '3 min ago' },
  ];

  const filteredFlowmeters = mockFlowmeters.filter(fm => 
    fm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fm.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6" data-testid="page-flowmeter-list">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold">Flowmeters</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all flowmeters</p>
        </div>
        <Button data-testid="button-add-flowmeter">
          <Plus className="h-4 w-4" />
          Add Flowmeter
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flowmeters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
          data-testid="input-search"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredFlowmeters.map((flowmeter) => (
          <Link key={flowmeter.id} href={`/flowmeters/${flowmeter.id}`}>
            <Card 
              className="p-6 hover-elevate active-elevate-2 cursor-pointer"
              data-testid={`card-flowmeter-${flowmeter.id}`}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium" data-testid={`text-flowmeter-name-${flowmeter.id}`}>
                      {flowmeter.name}
                    </h3>
                    <StatusBadge status={flowmeter.status} showIcon={false} />
                  </div>
                  <p className="text-sm text-muted-foreground">{flowmeter.location}</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Flow Rate</div>
                    <div className="text-xl font-bold font-mono" data-testid={`text-flow-rate-${flowmeter.id}`}>
                      {flowmeter.flowRate} <span className="text-sm font-normal">L/min</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Volume</div>
                    <div className="text-xl font-bold font-mono">
                      {flowmeter.totalVolume.toLocaleString()} <span className="text-sm font-normal">L</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Last Updated</div>
                    <div className="text-sm">{flowmeter.lastUpdated}</div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
