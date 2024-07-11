// store.js
import { proxy } from "valtio";

const user = proxy({
  userId: "",
  name: "",
  email: "",
  picture: "",
  score: 0,
});

const quiz = proxy({
  type: "",
});

export { user, quiz };
