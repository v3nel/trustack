import { db } from "@/db";
import { users, refresh_token } from "@/db/schema";
import { hashPassword } from "@/lib/hash";
import crypto from "crypto";
import { sql } from "drizzle-orm";

const seedUsers = [
    {
        name: `Alice Martin`,
        email: `alice.martin@example.com`,
        password: `Alice123!`,
        bio: `Développeuse fullstack freelance spécialisée en React et Node.js. 5 ans d'expérience.`,
    },
    {
        name: `Bob Dupont`,
        email: `bob.dupont@example.com`,
        password: `Bob123!`,
        bio: `Designer UI/UX passionné par les interfaces minimalistes et accessibles.`,
    },
    {
        name: `Charlie Leroy`,
        email: `charlie.leroy@example.com`,
        password: `Charlie123!`,
        bio: `Consultant DevOps & Cloud — AWS, Docker, Kubernetes.`,
    },
    {
        name: `Diana Moreau`,
        email: `diana.moreau@example.com`,
        password: `Diana123!`,
        bio: `Rédactrice technique et traductrice freelance FR/EN/ES.`,
    },
    {
        name: `Éric Fontaine`,
        email: `eric.fontaine@example.com`,
        password: `Eric123!`,
        bio: null,
    },
];

async function seed() {
    console.log(`🌱 Seeding database...`);

    // Clean existing data (order matters for foreign keys)
    await db.delete(refresh_token);
    await db.delete(users);

    // Reset sequences
    await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE refresh_token_id_seq RESTART WITH 1`);

    // Insert users with hashed passwords
    const insertedUsers = [];
    for (const u of seedUsers) {
        const hashedPassword = await hashPassword(u.password);
        const [inserted] = await db
            .insert(users)
            .values({
                name: u.name,
                email: u.email,
                password: hashedPassword,
                bio: u.bio,
            })
            .returning();
        insertedUsers.push(inserted);
        console.log(`  ✓ User: ${inserted?.name} (id=${inserted?.id})`);
    }

    // Insert some refresh tokens for a few users
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const seedTokens = [
        {
            user_id: insertedUsers[0]?.id, // Alice — token actif
            token: crypto.randomBytes(32).toString(`hex`),
            expires_at: oneDayLater,
            revoked_at: null,
        },
        {
            user_id: insertedUsers[1]?.id, // Bob — token expiré
            token: crypto.randomBytes(32).toString(`hex`),
            expires_at: yesterday,
            revoked_at: null,
        },
        {
            user_id: insertedUsers[2]?.id, // Charlie — token révoqué
            token: crypto.randomBytes(32).toString(`hex`),
            expires_at: oneHourLater,
            revoked_at: now,
        },
        {
            user_id: insertedUsers[0]?.id, // Alice — ancien token révoqué
            token: crypto.randomBytes(32).toString(`hex`),
            expires_at: yesterday,
            revoked_at: yesterday,
        },
    ];

    for (const t of seedTokens) {
        const [inserted] = await db.insert(refresh_token).values(t).returning();
        console.log(
            `  ✓ Token id=${inserted?.id} for user_id=${inserted?.user_id} (expires=${inserted?.expires_at.toISOString()}, revoked=${inserted?.revoked_at?.toISOString() ?? `no`})`,
        );
    }

    console.log(`\n✅ Seeding complete!`);
    console.log(`   ${insertedUsers.length} users`);
    console.log(`   ${seedTokens.length} refresh tokens`);

    process.exit(0);
}

seed().catch((err) => {
    console.error(`❌ Seed failed:`, err);
    process.exit(1);
});
