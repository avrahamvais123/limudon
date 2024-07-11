// app/api/auth/signin/route.js

import dbConnect from "@lib/dbConnect";
import User from "../../../models/User";

export async function POST(request) {
  await dbConnect();

  const { username, email, password } = await request.json();

  try {
    const user = new User({ username, email, password });
    await user.save();
    return new Response(JSON.stringify({ message: "User created", user }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
