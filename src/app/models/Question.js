import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
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
});

export default mongoose.models.Question || mongoose.model("Question", questionSchema);
