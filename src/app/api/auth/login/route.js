import dbConnect from "@lib/dbConnect";
import User from "@app/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const refreshToken = jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({
        message: "Login successful",
        token: token,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `token=${token}; Path=/; HttpOnly; SameSite=Strict;`,
            `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Strict;`
          ],
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
