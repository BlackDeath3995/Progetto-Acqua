import { AppSidebar } from '../AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function AppSidebarExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-bold">Main Content Area</h2>
            <p className="text-muted-foreground mt-2">Click the sidebar items to navigate</p>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}