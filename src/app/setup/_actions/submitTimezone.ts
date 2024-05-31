"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { sessions, users } from "~/server/db/schema";

export async function submitTimezone(timezone: string, sessionId: string) {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (session.length === 0) throw new Error("Session not found");

  const sessionData = session[0]!!;

  await db
    .update(users)
    .set({ timezone })
    .where(eq(users.id, sessionData.discordId));

  await db.delete(sessions).where(eq(sessions.id, sessionId));
}
