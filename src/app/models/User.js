import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  image: {
    type: String,
  },
  score: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isPaid: {
    type: Boolean,
    default: false,
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
