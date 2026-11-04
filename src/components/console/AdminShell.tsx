'use client';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AdminSidebar } from './AdminSidebar';
import { SidebarInset, SidebarProvider } from './ui/sidebar';
import { TooltipProvider } from './ui/tooltip';

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="console-shell">
      <TooltipProvider delayDuration={300}>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset className="min-w-0 bg-transparent">{children}</SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
      <Toaster position="bottom-right" toastOptions={{ className: 'text-ui' }} />
    </div>
  );
}
