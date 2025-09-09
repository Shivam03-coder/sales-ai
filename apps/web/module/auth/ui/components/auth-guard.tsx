"use client";

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ReactNode } from "react";
import AuthLayout from "../layout/auth-layout";
import { SignInView } from "../views/sign-in-view";
import { Loader } from "lucide-react";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <Loader className="animate-spin" size={40} />
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
