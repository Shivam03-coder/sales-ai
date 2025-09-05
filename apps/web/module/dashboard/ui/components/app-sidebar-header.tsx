"use client";
import { BellIcon, Plus, Settings } from "lucide-react";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const AppSidebarHeader = () => {
  return (
    <header className="bg-blue-50/55  shadow-blue-200 text-black flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <h6 className="bg-transparent ">SALES AI PLATFORM</h6>
      </div>
      <div className="flex items-center gap-2 px-4 ">
        <BellIcon className="size-5" />
        <Settings className="size-5" />
        <UserButton />
        <OrganizationSwitcher />
      </div>
    </header>
  );
};

export default AppSidebarHeader;
