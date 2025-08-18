"use client";

import * as React from "react";

import {
  AudioWaveform,
  BrainCog,
  Code2,
  Command,
  CreditCard,
  GalleryVerticalEnd,
  Mic2,
  PanelBottom,
  Plug2,
  Users,
  Video,
  Zap,
} from "lucide-react";

import { NavMain } from "@workspace/ui/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@workspace/ui/components/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navSections: [
    {
      title: "Customer Support",
      items: [
        {
          title: "Conversations",
          url: "/",
          icon: PanelBottom,
          isActive: true,
        },
        {
          title: "Knowledge Base",
          url: "/knowledge-base",
          icon: BrainCog,
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Widget Customization",
          url: "/prompt-builder",
          icon: Code2,
        },
        {
          title: "Integrations",
          url: "/integration",
          icon: Plug2,
        },
        {
          title: "Voice Assistant",
          url: "/speech-avatar",
          icon: Mic2,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "Plans & Billing",
          url: "/billing",
          icon: CreditCard,
        },
        {
          title: "User Management",
          url: "/user-management",
          icon: Users,
        },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  header?: React.ReactNode;
}

export function AppSidebar({ header, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{header}</SidebarHeader>
      <SidebarContent>
        <NavMain sections={data.navSections} />
      </SidebarContent>
    </Sidebar>
  );
}
