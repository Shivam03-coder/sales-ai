import { AuthGuard } from "@/module/auth/ui/components/auth-guard";
import OrganizationGuard from "@/module/auth/ui/components/organization-guard";
import AppSidebarHeader from "@/module/dashboard/ui/components/app-sidebar-header";
import { AppSidebar } from "@workspace/ui/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import React, { type ReactNode } from "react";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <OrganizationGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppSidebarHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
};
