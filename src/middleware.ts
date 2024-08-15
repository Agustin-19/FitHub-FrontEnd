import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface DecodedToken {
    role: string;
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || "";
    const url = new URL(request.url);

    // Si el usuario está autenticado
    if (token) {
        try {
            const decodedToken = jwtDecode<DecodedToken>(token);

            // Verificar si el rol es diferente de "admin" y "superadmin"
            if (decodedToken.role !== "admin" && decodedToken.role !== "superadmin") {
                const homeUrl = new URL("/", request.url);
                return NextResponse.redirect(homeUrl);
            }
        } catch (error) {
            console.error("Error decodificando el token", error);
            const homeUrl = new URL("/", request.url);
            return NextResponse.redirect(homeUrl);
        }
        
        if (url.pathname === "/login" || url.pathname === "/register") {
            const homeUrl = new URL("/", request.url); 
            return NextResponse.redirect(homeUrl);
        }
    } else {
        if (url.pathname.startsWith("/admin")) {
            const loginUrl = new URL("/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login", "/register"],
};