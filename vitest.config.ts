import { defineConfig } from "vitest/config";
import path from "path";

process.loadEnvFile(".env.local");

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
