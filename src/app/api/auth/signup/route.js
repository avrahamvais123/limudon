import dbConnect from "@lib/dbConnect";
import User from "@app/models/User";

export async function POST(request) {
  await dbConnect();

  const userData = await request.json();

  try {
    // בדיקה אם יש כבר משתמש עם אותו אימייל
    const existingUser = await User.findOne({ email: userData?.email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "קיים כבר משתמש עם מייל זהה" }), {
        status: 400,
      });
    }

    const user = new User(userData);
    await user.save();
    return new Response(JSON.stringify({ message: "המשתמש נוצר בהצלחה", user }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
