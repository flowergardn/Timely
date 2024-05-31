import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import * as timezones from "~/lib/timezones";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await db.select().from(users).where(eq(users.id, params.id));

  if (user.length === 0) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const fmt = timezones.getTime("America/Chicago").format("HH:mm");

  return Response.json(fmt);
}
