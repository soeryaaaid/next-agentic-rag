import { db } from "@/lib/db";
import { adminSettings } from "@/lib/db/schema";

export const SETTING_KEYS = ["system_prompt", "assistant_model", "top_k"] as const;
export type SettingKey = (typeof SETTING_KEYS)[number];

export const VALID_TOP_K = [3, 5, 10] as const;

export const DEFAULT_SETTINGS: Record<SettingKey, string | number> = {
  system_prompt: "",
  assistant_model: process.env.ASSISTANT_MODEL || "xiaomi/mimo-v2.5",
  top_k: 5,
};

export interface SettingValue {
  key: SettingKey;
  value: string | number;
}

export async function getSettings(): Promise<Record<SettingKey, string | number>> {
  const rows = await db.select().from(adminSettings);
  const settings = { ...DEFAULT_SETTINGS } as Record<SettingKey, string | number>;
  for (const row of rows) {
    if (SETTING_KEYS.includes(row.key as SettingKey)) {
      settings[row.key as SettingKey] = row.value as string | number;
    }
  }
  return settings;
}

export async function updateSetting(
  key: SettingKey,
  value: string | number,
): Promise<SettingValue> {
  if (key === "top_k") {
    const num = typeof value === "string" ? parseInt(value, 10) : value;
    if (!(VALID_TOP_K as readonly number[]).includes(num)) {
      throw new Error(
        `Invalid top_k value: ${value}. Must be one of ${VALID_TOP_K.join(", ")}`,
      );
    }
    value = num;
  }

  if (key === "assistant_model" && typeof value === "string" && value.trim() === "") {
    throw new Error("Assistant model cannot be empty");
  }

  await db
    .insert(adminSettings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: adminSettings.key,
      set: { value, updatedAt: new Date() },
    });

  return { key, value };
}
