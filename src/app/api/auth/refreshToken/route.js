import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@lib/dbConnect";
import User from "@app/models/User";

export async function POST(request) {
  await dbConnect();

  const refreshToken = cookies().get("refreshToken")?.value;

  if (!refreshToken) {
    return new Response(
      JSON.stringify({ message: "No refresh token provided" }),
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const token = jwt.sign(
      {
        userId: user?._id,
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        score: user?.score,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({
        message: "Token refreshed",
        token: token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict;`,
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid refresh token" }), {
      status: 401,
    });
  }
}
