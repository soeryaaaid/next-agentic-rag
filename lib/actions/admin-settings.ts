"use server";

import { updateSetting } from "@/lib/services/admin-settings";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(
  _prev: { success: boolean; error?: string } | null,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const settings = {
      system_prompt: formData.get("system_prompt") as string,
      assistant_model: formData.get("assistant_model") as string,
      top_k: formData.get("top_k") as string,
    };

    if (!settings.assistant_model?.trim()) {
      return { success: false, error: "Assistant model cannot be empty" };
    }

    const topKNum = parseInt(settings.top_k, 10);
    if (![3, 5, 10].includes(topKNum)) {
      return { success: false, error: "Context count must be 3, 5, or 10" };
    }

    await updateSetting("system_prompt", settings.system_prompt);
    await updateSetting("assistant_model", settings.assistant_model);
    await updateSetting("top_k", topKNum);
    revalidatePath("/admin");
    return { success: true, error: undefined };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
