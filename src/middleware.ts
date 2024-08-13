import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface DecodedToken {
    role: string;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
        const loginUrl = new URL("/", request.url);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        if (decodedToken.role !== "admin") {
            const homeUrl = new URL("/", request.url);
            return NextResponse.redirect(homeUrl);
        }
    } catch (error) {
        console.error("Error decodificando el token", error);
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
