import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import type { NewUser } from "@/db/schema";

export async function getAllUsers() {
    return await db.select().from(users);
}

export async function getUserById(id: number) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}

export async function createUser(data: NewUser) {
    const result = await db.insert(users).values(data).returning();
    return result[0]!;
}

export async function updateUser(id: number, data: Partial<NewUser>) {
    const result = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return result[0];
}

export async function deleteUser(id: number) {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result[0];
}
