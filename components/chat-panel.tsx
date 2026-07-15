"use client";

import {
  AssistantRuntimeProvider,
  McpAppRenderer,
  McpAppsRemoteHost,
  Tools,
  useAui,
} from "@assistant-ui/react";
import {
  useChatRuntime,
  AssistantChatTransport,
} from "@assistant-ui/react-ai-sdk";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { Thread } from "@/components/assistant-ui/thread";

export function ChatPanel() {
  const runtime = useChatRuntime({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  const aui = useAui({
    tools: Tools({
      mcpApp: McpAppRenderer({
        host: McpAppsRemoteHost({ url: "/api/mcp-apps" }),
        hostInfo: { name: "assistant-ui-starter-mcp", version: "0.1.0" },
      }),
    }),
  });

  return (
    <AssistantRuntimeProvider aui={aui} runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
