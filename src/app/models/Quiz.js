import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
  },
  correct: {
    type: String,
    required: [true, "Correct is required"],
  },
  answers: {
    type: Array,
    required: [true, "Answers is required"],
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  level: {
    type: Number,
  },
  alphabet: {
    type: String,
  },
});

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
