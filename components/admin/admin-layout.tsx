"use client";

import { useState } from "react";
import { LibraryBig, Settings } from "lucide-react";
import {
  CollapsibleSidebar,
  CollapsibleSidebarHeader,
  CollapsibleSidebarBody,
  CollapsibleSidebarTrigger,
} from "@/components/admin/collapsible-sidebar";
import { ChatPanel } from "@/components/chat-panel";
import { SettingsPanel } from "@/components/admin/settings-panel";
import { SourcesPanel } from "@/components/admin/sources-panel";
import type { SettingKey } from "@/lib/services/admin-settings";

interface AdminLayoutProps {
  settings: Record<SettingKey, string | number>;
}

export function AdminLayout({ settings }: AdminLayoutProps) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="relative flex h-dvh">
      <CollapsibleSidebar side="left" open={leftOpen} onToggle={() => setLeftOpen((v) => !v)}>
        <CollapsibleSidebarHeader>
          <LibraryBig className="size-5 shrink-0" />
          <h2 className="text-sm font-semibold">Knowledge Sources</h2>
        </CollapsibleSidebarHeader>
        <CollapsibleSidebarBody>
          <SourcesPanel />
        </CollapsibleSidebarBody>
      </CollapsibleSidebar>

      <main className="relative flex min-w-0 flex-1 flex-col">
        <div className="absolute inset-x-0 top-0 z-10 flex h-16 items-center px-4">
          <CollapsibleSidebarTrigger
            side="left"
            open={leftOpen}
            onToggle={() => setLeftOpen((v) => !v)}
          />
          <div className="ml-auto">
            <CollapsibleSidebarTrigger
              side="right"
              open={rightOpen}
              onToggle={() => setRightOpen((v) => !v)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden pt-16">
          <ChatPanel />
        </div>
      </main>

      <CollapsibleSidebar side="right" open={rightOpen} onToggle={() => setRightOpen((v) => !v)}>
        <CollapsibleSidebarHeader>
          <Settings className="size-5 shrink-0" />
          <h2 className="text-sm font-semibold">Settings</h2>
        </CollapsibleSidebarHeader>
        <CollapsibleSidebarBody>
          <SettingsPanel initialSettings={settings} />
        </CollapsibleSidebarBody>
      </CollapsibleSidebar>
    </div>
  );
}
