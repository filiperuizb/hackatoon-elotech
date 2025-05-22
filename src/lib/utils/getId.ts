import { NextRequest } from "next/server";

export function getIdFromRequest(request: NextRequest): string | undefined {
    const url = new URL(request.url);
    return url.pathname.split("/").pop();
}