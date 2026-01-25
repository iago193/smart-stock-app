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

  // Se NÃO tem token → deixa acessar o login
  if (!token) {
    return NextResponse.next();
  }

  try {
    jwt.verify(token, secret);

    // Redireciona para área interna
    return NextResponse.redirect(new URL("/cashregister", request.url));
  } catch {
    // Token inválido → deixa acessar o login
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/"],
};
