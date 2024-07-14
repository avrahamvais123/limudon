import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export const tokenControl = async (request) => {
  const url = new URL(request.url);
  const token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("Token:", token);
  console.log("Refresh Token:", refreshToken);
  console.log("URL:", url.pathname);

  const isExcluded =
    url.pathname === "/" ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/auth");

  console.log("isExcluded:", isExcluded);

  if (!token && !refreshToken && !isExcluded) {
    console.log("No token or refresh token found, redirecting to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  console.log("Secret:", secret);

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      console.log("Decoded Token:", payload);
      console.log("Token is valid");
      return NextResponse.next();
    } catch (err) {
      console.log("Invalid token, error:", err.message);
      if (err.message !== "JWTExpired" || !refreshToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
  }

  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, secret);
      console.log("Decoded Refresh Token:", payload);

      const newToken = await new SignJWT({
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        score: payload.score,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(secret);

      console.log("New Token:", newToken);

      const response = NextResponse.next();
      response.cookies.set("token", newToken, { httpOnly: true, path: "/" });
      console.log("Token set in cookies");

      return response;
    } catch (err) {
      console.log("Invalid refresh token, error:", err.message);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  console.log("Falling through to NextResponse.next()");
  return NextResponse.next();
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
