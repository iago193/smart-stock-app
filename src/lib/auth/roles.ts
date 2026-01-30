import { cookies } from "next/headers";
import { url, endpoints } from "@/constants/api";

export async function permissionRoutes(
  allowedRoles: string[],
): Promise<boolean> {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${url}${endpoints.auth.me}`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) return false;

    const { user } = await res.json();

    const allowed = allowedRoles.includes(user.role);

    return allowed;
  } catch {
    return false;
  }
}
