import { url, endpoints } from "@/constants/api";

export async function permissionRoutes(
  allowedRoles: string[],
): Promise<boolean> {
  console.log(allowedRoles);
  console.log(document.cookie);

  try {
    const res = await fetch(`${url}${endpoints.auth.me}`, {
      method: "GET",
      cache: "no-cache",
      credentials: "include",
    });

    console.log(res);

    if (!res.ok) return false;

    const data = await res.json();
    const user = data.user;

    console.log("user:", user);

    return allowedRoles.includes(user.role);
  } catch (error) {
    console.error(error);
    return false;
  }
}
