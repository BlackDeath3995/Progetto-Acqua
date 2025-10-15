import FlowmeterList from '../../pages/FlowmeterList';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function FlowmeterListExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8">
        <FlowmeterList />
      </div>
    </QueryClientProvider>
  );
}