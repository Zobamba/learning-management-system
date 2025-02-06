import Course from "../models/course.js";
import User from "../models/user.js";

class CourseController {
  createCourse = async (req, res) => {
    const { title, description, content } = req.body;
    const newCourse = new Course({
      title,
      description,
      created_by: req.user.id,
      content,
    });

    try {
      await newCourse.save();
      res.status(201).json({
        message: "Course created successfully",
        createdCourse: newCourse,
      });
    } catch (err) {
      res.status(400).json({ message: "Error creating course", error: err });
    }
  };

  getAllCourses = async (req, res) => {
    try {
      const courses = await Course.find().populate("created_by", "name email");

      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: "No courses found" });
      }

      res.status(200).json({
        message: "Courses retrieved successfully",
        data: courses,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching courses",
        error: error.message,
      });
    }
  };

  enrollStudentInCourse = async (req, res) => {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.students_enrolled.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    course.students_enrolled.push(req.user.id);
    await course.save();

    res.json({ message: "Successfully enrolled in course" });
  };

  updateCourseProgress = async (req, res) => {
    const { courseId } = req.params;
    const { chapterId } = req.body;

    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: "Course not found" });

      const totalChapters = course.content.length;

      const courseProgress = user.progress.find(
        (progress) => progress.course_id.toString() === courseId
      );

      if (courseProgress) {
        if (!courseProgress.completed_chapters.includes(chapterId)) {
          courseProgress.completed_chapters.push(chapterId);
          courseProgress.total_chapters = totalChapters;

          if (courseProgress.completed_chapters.length === totalChapters) {
            courseProgress.is_completed = true;
          }
        }
      } else {
        user.progress.push({
          course_id: courseId,
          completed_chapters: [chapterId],
          total_chapters: totalChapters,
          is_completed: false,
        });
      }

      await user.save();
      res.json({ message: "Progress updated", progress: user.progress });
    } catch (error) {
      res.status(500).json({ message: "Error updating progress", error });
    }
  };

  getCourseProgress = async (req, res) => {
    // const { courseId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progress = user.progress

    if (!progress)
      return res.status(404).json({ message: "Progress not found" });

    res.json({ progress });
  };
}

export default new CourseController();
