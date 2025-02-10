import Feedback from "../models/feedback.js";

class FeedbackController {
  submitFeedback = async (req, res) => {
    try {
      const { courseId } = req.params;
      const { feedback, rating } = req.body;

      const newFeedback = new Feedback({
        course_id: courseId,
        user_id: req.user.id,
        feedback,
        rating,
      });

      await newFeedback.save();
      res.status(201).json({
        message: "Feedback submitted successfully",
        feedback: newFeedback,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating feedback", error: err });
    }
  };

  getAllCourseFeedback = async (req, res) => {
    try {
      const { courseId } = req.params;

      const courseFeedbacks = await Feedback.find({ course_id: courseId });
      res.status(200).json({ courseFeedbacks });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching course feedback", error: err });
    }
  };
}

export default new FeedbackController();
