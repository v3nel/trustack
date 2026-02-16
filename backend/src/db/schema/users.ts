import { serial, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable(`users`, {
    id: serial(`id`).primaryKey(),
    name: varchar(`name`, { length: 255 }).notNull(),
    email: varchar(`email`, { length: 255 }).notNull().unique(),
    password: varchar(`password`, { length: 255 }).notNull(),
    bio: text(`bio`),
    createdAt: timestamp(`created_at`, { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp(`updated_at`, { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
