import { NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import dbConnect from "@lib/dbConnect";
import User from "@app/models/User";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const { data } = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
    grant_type: "authorization_code",
  });

  const { access_token } = data;

  const { data: userInfo } = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  await dbConnect();
  let user = await User.findOne({ email: userInfo.email });
  if (!user) {
    user = new User({ email: userInfo.email, username: userInfo.name });
    await user.save();
  }

  const token = jwt.sign(
    { userId: user._id, ...userInfo },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/`
  );
  response.cookies.set("token", token, {
    httpOnly: false,
    path: "/",
    maxAge: 3600,
  });

  return response;
}
