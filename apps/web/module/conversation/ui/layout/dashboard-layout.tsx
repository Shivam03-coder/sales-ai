
import { AuthGuard } from "@/module/auth/ui/components/auth-guard";
import OrganizationGuard from "@/module/auth/ui/components/organization-guard";
import AppSidebarHeader from "@/module/conversation/ui/components/app-sidebar-header";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { AppSidebar } from "@workspace/ui/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import React, { type ReactNode } from "react";

export const DashboardLayout = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <AuthGuard>
      <OrganizationGuard>
        {/* Pass defaultOpen to SidebarProvider */}
        <SidebarProvider defaultOpen={defaultOpen ?? false}>
          <AppSidebar
            header={
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{
                  elements: {
                    rootBox: "w-full! bg-blue-100 rounded h-8!",
                    avatarBox: "size-4! rounded-sm!",
                    organizationSwitcherTrigger:
                      "w-full! justify-start! group-data-[collapsible=icon]:p-2! [collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center!",
                    organizationPreview:
                      "group-data-[collapsible=icon]:justify-center! gap-2!",
                    organizationPreviewTextContainer:
                      "group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                    organizationSwitcherTriggerIcon:
                      "group-data-[collapsible=icon]:hidden! ml-auto! text-sidebar-foreground!",
                  },
                }}
              />
            }
          />
          <SidebarInset>
            <AppSidebarHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
};
