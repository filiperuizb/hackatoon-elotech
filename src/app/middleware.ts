import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-mvp";

const PUBLIC_ROUTES = [
  "/api/login",
  "/api/profissionais",
  "/api/documentotipo",
  "/api/especialidades",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    PUBLIC_ROUTES.some((route) => path.startsWith(route)) ||
    request.method === "OPTIONS"
  ) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Token inválido ou expirado" }, {
      status: 401,
    });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};