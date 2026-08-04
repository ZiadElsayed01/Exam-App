import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAMES = [
  "__Secure-next-auth.session-token",
  "next-auth.session-token",
] as const;

export async function getNextAuthToken() {
  const cookieStore = await cookies();
  const cookieName =
    process.env.NODE_ENV === "production"
      ? SESSION_COOKIE_NAMES[0]
      : SESSION_COOKIE_NAMES[1];

  const tokenValue =
    cookieStore.get(cookieName)?.value ??
    cookieStore.get(SESSION_COOKIE_NAMES[1])?.value ??
    cookieStore.get(SESSION_COOKIE_NAMES[0])?.value;

  if (!tokenValue) {
    return null;
  }

  try {
    const jwt = decode({
      token: tokenValue,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    console.error(error);
    return null;
  }
}
