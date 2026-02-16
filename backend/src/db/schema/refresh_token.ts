import { serial, pgTable, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const refresh_token = pgTable(`refresh_token`, {
    id: serial(`id`).primaryKey(),
    user_id: serial(`user_id`)
        .notNull()
        .references(() => users.id, { onDelete: `cascade` }),
    token: varchar(`token`, { length: 255 }).notNull(),
    created_at: timestamp(`created_at`).notNull().defaultNow(),
    expires_at: timestamp(`expires_at`)
        .notNull()
        .default(sql`now() + interval '3600'`),
    revoked_at: timestamp(`revoked_at`),
});

export type RefreshToken = typeof refresh_token.$inferSelect;
export type NewRefreshToken = typeof refresh_token.$inferInsert;
