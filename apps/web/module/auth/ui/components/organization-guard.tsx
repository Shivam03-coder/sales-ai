"use client"
import React, { ReactNode } from "react";
import { useOrganization } from "@clerk/nextjs";
import OrgSelectView from "@/module/auth/ui/views/org-select-view";
import AuthLayout from "@/module/auth/ui/layout/auth-layout";

const OrganizationGuard = ({ children }: { children: ReactNode }) => {
  const { organization } = useOrganization();
  if (!organization)
    return (
      <AuthLayout>
        <OrgSelectView />
      </AuthLayout>
    );
  return <>{children}</>;
};

export default OrganizationGuard;
