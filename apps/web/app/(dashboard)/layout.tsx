import React, { type ReactNode } from "react";
import { DashboardLayout } from "@/module/conversation/ui/layout/dashboard-layout";

const DashboardRootLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout> {children}</DashboardLayout>;
};

export default DashboardRootLayout;
