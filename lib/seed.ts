import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const DEFAULT_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
const DEFAULT_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "admin123";

export async function seed() {
  const [existing] = await db.select({ id: users.id }).from(users).limit(1);

  if (existing) {
    console.log("Users table already has data, skipping seed.");
    return null;
  }

  await auth.api.createUser({
    body: {
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      name: "Admin",
      role: "admin",
    },
  });

  console.log(`Admin user created: ${DEFAULT_EMAIL}`);
  return { role: "admin" };
}

const isMainModule = process.argv[1]?.endsWith("seed.ts");
if (isMainModule) {
  seed().catch(console.error);
}
