import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não definido");
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT inválido:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/cashregister/:path*", "/products/:path*", "/statistic/:path*"],
};
