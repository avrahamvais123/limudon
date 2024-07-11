// app/api/auth/login/route.js
import dbConnect from "@lib/dbConnect";
import User from "@app/models/User";
import bcrypt from "bcrypt";

export async function POST(request) {
  await dbConnect();

  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // כאן תוכל ליצור את הטוקן או ה-session לפי הצורך

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
