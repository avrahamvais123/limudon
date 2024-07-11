import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    //required: [true, "password is required"],
  },
});

// Pre-save middleware to encrypt password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  console.log("this.isModified: ", this.isModified);

  // Generate a salt and hash on separate function calls
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log("this.password: ", this.password);

  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
