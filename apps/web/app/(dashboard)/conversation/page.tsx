"use client";

import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/server/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>conversation</p>
    </div>
  );
}
