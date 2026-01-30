import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não definido");
  }

  if (!token) {
    return NextResponse.next();
  }

  try {
    jwt.verify(token, secret);

    return NextResponse.redirect(new URL("/cashregister", request.url));
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
