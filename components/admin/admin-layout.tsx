"use client";

import { useState } from "react";
import { CollapsibleSidebar, CollapsibleSidebarTrigger } from "./collapsible-sidebar";
import { AdminChat } from "./admin-chat";
import { SettingsPanel } from "./settings-panel";
import { SourcesPanel } from "./sources-panel";
import type { SettingKey } from "@/lib/services/admin-settings";

interface AdminLayoutProps {
  settings: Record<SettingKey, string | number>;
}

export function AdminLayout({ settings }: AdminLayoutProps) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="flex h-dvh">
      <CollapsibleSidebar side="left" open={leftOpen}>
        <h2 className="mb-4 text-sm font-semibold">Knowledge Sources</h2>
        <SourcesPanel />
      </CollapsibleSidebar>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center border-b px-4">
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
        </header>
        <div className="flex-1 overflow-hidden">
          <AdminChat />
        </div>
      </main>

      <CollapsibleSidebar side="right" open={rightOpen}>
        <h2 className="mb-4 text-sm font-semibold">Settings</h2>
        <SettingsPanel initialSettings={settings} />
      </CollapsibleSidebar>
    </div>
  );
}
