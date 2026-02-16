import { eq } from "drizzle-orm";
import { db } from "@/db";
import { refresh_token } from "@/db/schema/refresh_token";
import type { NewRefreshToken } from "@/db/schema/refresh_token";
import { getUserById } from "./users.service";
import { generateRefreshToken } from "@/lib/jwt";
import { hashToken } from "@/lib/hash";

export async function getRefreshToken(user_id: number) {
    return db
        .select()
        .from(refresh_token)
        .where(eq(refresh_token.user_id, user_id))
        .orderBy(refresh_token.created_at)
        .limit(1);
}

export async function revokeRefreshToken(id: number) {
    const result = await db
        .update(refresh_token)
        .set({ revoked_at: new Date() })
        .where(eq(refresh_token, id))
        .returning();
    return result[0]!;
}

export async function createRefreshToken(user_id: number) {
    const token = await generateRefreshToken(user_id);
    const token_hash = hashToken(token);
    const result = await db
        .insert(refresh_token)
        .values({ token: token_hash, user_id: user_id })
        .returning();
    return result[0]!;
}
