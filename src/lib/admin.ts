import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

function allowedAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email || !allowedAdminEmails().has(email)) {
    return null;
  }

  return session;
}

