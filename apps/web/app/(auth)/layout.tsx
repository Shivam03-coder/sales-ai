import AuthLayout from "@/module/auth/ui/layout/auth-layout";
import React, { type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
