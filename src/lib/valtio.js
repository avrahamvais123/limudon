// store.js
import { proxy } from "valtio";

const user = proxy({
  userId: "",
  name: "",
  email: "",
  password: "",
  image: "",
  score: 0,
  isAdmin: false,
  isPaid: false,
});

const quiz = proxy({
  type: "",
});

export { user, quiz };
