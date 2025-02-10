import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, index: true },
  image: {type: String, required: true},
  rating: { type: Number, min: 1, max: 5, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  content: [
    {
      chapter: { type: String },
      video_url: { type: String },
      quiz: { type: String },
    },
  ],
  students_enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

courseSchema.index({ category: 1, rating: -1 });

courseSchema.index({ title: "text", description: "text" });

const Course = mongoose.model("Course", courseSchema);

export default Course;
