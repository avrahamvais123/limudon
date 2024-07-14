import { NextResponse } from "next/server";
import { tokenControl } from "./middleware/tokenCntrol";

export async function middleware(request) {
  return await tokenControl(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|logo.ico|logo-limudon.png|books-background.jpg|$).*)",
  ],
};

// auth/login|api/auth/signup|api/auth/login|auth/signup|api/auth/google|api/auth/callback/google|

/* // רשימת נתיבים שמוחרגים מהבדיקה
  const excludedPaths = [
    "/auth/login",
    "/auth/signup",
    "/api/auth/google",
    "/api/auth/callback/google",
    "/",
  ];

  // בדיקה אם הנתיב נמצא תחת /api או /auth או הוא אחד מהנתיבים המוחרגים המדויקים
  const isExcluded = excludedPaths.some(
    (path) =>
      url.pathname === path ||
      url.pathname.startsWith("/api") ||
      url.pathname.startsWith("/auth")
  ); */
