export async function hashPassword(password: string) {
    return Bun.password.hash(password, { algorithm: "argon2d"})
}

export async function verifyPassword(password: string, hash: string) {
    return Bun.password.verify(password, hash)
}

export function hashToken(token: string) {
    const hasher = new Bun.CryptoHasher("sha256")
    hasher.update(token)
    return hasher.digest("hex")
}