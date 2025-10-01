import { Badge } from "@/components/ui/badge";
import { Circle, AlertTriangle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "active" | "warning" | "error" | "offline";
  showIcon?: boolean;
}

export default function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-success text-success-foreground",
      icon: Circle,
    },
    warning: {
      label: "Warning",
      className: "bg-warning text-warning-foreground",
      icon: AlertTriangle,
    },
    error: {
      label: "Error",
      className: "bg-destructive text-destructive-foreground",
      icon: XCircle,
    },
    offline: {
      label: "Offline",
      className: "bg-muted text-muted-foreground",
      icon: XCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} gap-1.5`} data-testid={`badge-status-${status}`}>
      {showIcon && <Icon className="h-3 w-3" />}
      <span>{config.label}</span>
    </Badge>
  );
}
