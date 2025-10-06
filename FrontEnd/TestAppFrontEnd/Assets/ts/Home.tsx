import Home from '../../pages/Home';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function HomeExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8">
        <Home />
      </div>
    </QueryClientProvider>
  );
}
