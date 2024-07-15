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

