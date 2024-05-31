// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTableCreator, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `timely_${name}`);

export const users = createTable("users", {
  id: varchar("id").primaryKey(),
  timezone: varchar("timezone").notNull(),
});

export const sessions = createTable("sessions", {
  id: varchar("id").primaryKey(),
  discordId: varchar("discord_id").notNull(),
});

export interface Session {
  id: string;
  discordId: string;
}
