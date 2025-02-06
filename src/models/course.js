import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: [
    {
      chapter: { type: String },
      video_url: { type: String },
      quiz: { type: String },
    },
  ],
  students_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
