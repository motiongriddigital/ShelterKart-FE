'use client';
import type { ReactNode } from 'react';
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
    </div>
  );
}
