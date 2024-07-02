import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes, nonPublicRoutes } from "@/routes";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { nextUrl } = request;
    const isLoggedIn = !!token;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isPlayQuizRoute = nextUrl.pathname === "/play-quiz" && Boolean(nextUrl.searchParams.get("id"));
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isNonPublicRoute = nonPublicRoutes.includes(nextUrl.pathname);


    // Allow API authentication routes to proceed
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Allow public and auth routes without redirection if logged in
    if (isPublicRoute || isAuthRoute) {
        if (isLoggedIn && isAuthRoute) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && isNonPublicRoute) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Redirect to the Home page if not logged in and accessing protected routes
    // if (!isLoggedIn && !isPublicRoute) {
    //     return NextResponse.redirect(new URL("/", nextUrl));
    // }


    // Allow the request to proceed by default
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
