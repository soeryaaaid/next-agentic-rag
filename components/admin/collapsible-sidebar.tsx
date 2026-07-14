"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  open: boolean;
  children: ReactNode;
  width?: string;
}

export function CollapsibleSidebar({
  side,
  open,
  children,
  width = "w-80",
}: CollapsibleSidebarProps) {
  return (
    <div
      className={cn(
        "shrink-0 flex-col border-border bg-sidebar transition-all duration-200 ease-linear",
        side === "left" ? "border-r" : "border-l",
        open ? `${width} flex` : "w-0 overflow-hidden hidden",
      )}
    >
      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}

interface CollapsibleSidebarTriggerProps {
  side: "left" | "right";
  open: boolean;
  onToggle: () => void;
}

export function CollapsibleSidebarTrigger({
  side,
  open,
  onToggle,
}: CollapsibleSidebarTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={onToggle}
      aria-label={open ? `Close ${side} panel` : `Open ${side} panel`}
    >
      {open ? (
        side === "left" ? (
          <ChevronLeft className="size-4" />
        ) : (
          <ChevronRight className="size-4" />
        )
      ) : (
        side === "left" ? (
          <ChevronRight className="size-4" />
        ) : (
          <ChevronLeft className="size-4" />
        )
      )}
    </Button>
  );
}
