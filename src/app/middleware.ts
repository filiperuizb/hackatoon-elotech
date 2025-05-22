import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo-mvp";

export function middleware(request: NextRequest) {
    const isLoginRoute = request.nextUrl.pathname.startsWith("/api/login");
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (isLoginRoute) return NextResponse.next();

    if (!token) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    try {
        jwt.verify(token, SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
    }
}

export const config = {
    matcher: ["/api/:path*"],
};