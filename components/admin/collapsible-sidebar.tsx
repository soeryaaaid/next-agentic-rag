"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelLeftOpen, PanelLeftClose, PanelRightOpen, PanelRightClose } from "lucide-react";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  open: boolean;
  onToggle?: () => void;
  children: ReactNode;
}

export function CollapsibleSidebar({
  side,
  open,
  onToggle,
  children,
}: CollapsibleSidebarProps) {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const isOpen = open || hovered;

  useEffect(() => {
    if (!open) {
      setHovered(false);
      clearTimeout(timerRef.current);
    }
  }, [open]);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      if (!open) setHovered(false);
    }, 300);
  };

  const handleContentPointerDown = () => {
    if (!open && hovered) {
      onToggle?.();
    }
  };

  return (
    <>
      {!isOpen && (
        <div
          className="absolute inset-y-0 z-10 w-2 cursor-pointer hover:bg-sidebar-accent/20 transition-colors"
          style={{ [side === "left" ? "left" : "right"]: 0 }}
          onMouseEnter={handleMouseEnter}
        />
      )}
      <div
        className={cn(
          "flex shrink-0 flex-col border-border bg-sidebar overflow-hidden transition-[width] duration-300 ease-in-out",
          side === "left" ? "border-r" : "border-l",
          isOpen ? "w-80" : "w-0",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={cn(
            "flex min-w-80 flex-1 flex-col overflow-hidden transition-opacity duration-200",
            isOpen ? "opacity-100 delay-100" : "opacity-0",
          )}
          onPointerDown={handleContentPointerDown}
        >
          {children}
        </div>
      </div>
    </>
  );
}

interface CollapsibleSidebarTriggerProps {
  side: "left" | "right";
  open: boolean;
  onToggle: () => void;
}

interface CollapsibleSidebarHeaderProps {
  children: ReactNode;
}

export function CollapsibleSidebarHeader({ children }: CollapsibleSidebarHeaderProps) {
  return (
    <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      {children}
    </div>
  );
}

interface CollapsibleSidebarBodyProps {
  children: ReactNode;
}

export function CollapsibleSidebarBody({ children }: CollapsibleSidebarBodyProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {children}
    </div>
  );
}

interface CollapsibleSidebarFooterProps {
  children: ReactNode;
}

export function CollapsibleSidebarFooter({ children }: CollapsibleSidebarFooterProps) {
  return (
    <div className="shrink-0 border-t px-4 py-3">
      {children}
    </div>
  );
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
      className="size-7 cursor-pointer"
      onClick={onToggle}
      aria-label={open ? `Close ${side} panel` : `Open ${side} panel`}
    >
      {side === "left" ? (
        open ? <PanelLeftClose className="size-5" /> : <PanelLeftOpen className="size-5" />
      ) : (
        open ? <PanelRightClose className="size-5" /> : <PanelRightOpen className="size-5" />
      )}
    </Button>
  );
}
