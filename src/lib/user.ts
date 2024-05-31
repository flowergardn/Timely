import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function getUser(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId));
  if (user.length === 0) return null;

  const userData = user[0];
  if (!userData) return null;

  return userData;
}
