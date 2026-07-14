"use client";

import { useState, useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateSettingsAction } from "@/lib/actions/admin-settings";
import type { SettingKey } from "@/lib/services/admin-settings";

interface SettingsPanelProps {
  initialSettings: Record<SettingKey, string | number>;
}

export function SettingsPanel({ initialSettings }: SettingsPanelProps) {
  const [systemPrompt, setSystemPrompt] = useState(String(initialSettings.system_prompt));
  const [assistantModel, setAssistantModel] = useState(String(initialSettings.assistant_model));
  const [topK, setTopK] = useState(String(initialSettings.top_k));

  const [state, formAction, isPending] = useActionState(updateSettingsAction, null);

  const handleSave = () => {
    const fd = new FormData();
    fd.append("system_prompt", systemPrompt);
    fd.append("assistant_model", assistantModel);
    fd.append("top_k", topK);
    formAction(fd);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="system-prompt">System Prompt</Label>
        <Textarea
          id="system-prompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Instructions for the AI assistant..."
          rows={4}
        />
      </div>

      <hr className="border-border" />

      <div className="space-y-2">
        <Label htmlFor="assistant-model">Assistant Model</Label>
        <Select value={assistantModel} onValueChange={setAssistantModel}>
          <SelectTrigger id="assistant-model" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xiaomi/mimo-v2.5">xiaomi/mimo-v2.5</SelectItem>
            <SelectItem value="anthropic/claude-sonnet-4">Claude Sonnet 4</SelectItem>
            <SelectItem value="anthropic/claude-haiku-4">Claude Haiku 4</SelectItem>
            <SelectItem value="openai/gpt-4o">GPT-4o</SelectItem>
            <SelectItem value="openai/gpt-4o-mini">GPT-4o-mini</SelectItem>
            <SelectItem value="google/gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <hr className="border-border" />

      <div className="space-y-2">
        <Label htmlFor="top-k">Retrieved Contexts</Label>
        <Select value={topK} onValueChange={setTopK}>
          <SelectTrigger id="top-k" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        onClick={handleSave}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Saving..." : "Save"}
      </Button>

      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-500">Settings saved.</p>
      )}
    </div>
  );
}
