import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export function generateAccessToken(payload: { user_id: number; email: string }) {
    return new SignJWT({ user_id: String(payload.user_id), email: payload.email })
        .setProtectedHeader({ alg: `HS256` })
        .setIssuedAt()
        .setExpirationTime(`15m`)
        .sign(secret);
}

export function generateRefreshToken(user_id: number) {
    return new SignJWT({ user_id: String(user_id) })
        .setProtectedHeader({ alg: `HS256` })
        .setIssuedAt()
        .setExpirationTime(`7d`)
        .sign(secret);
}
