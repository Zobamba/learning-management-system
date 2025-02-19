import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: [
    {
      course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      completed_chapters: { type: [String], default: [] },
      total_chapters: { type: Number, default: 0 },
      is_completed: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
