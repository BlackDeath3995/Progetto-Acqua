import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-4 p-8">
      <StatusBadge status="active" />
      <StatusBadge status="warning" />
      <StatusBadge status="error" />
      <StatusBadge status="offline" />
    </div>
  );
}