import feedbackController from "../controllers/feedback-controller.js";
import authenticateJWT from "../middlewares/auth.js";

export default function feedbackRoutes(app) {
  app.post(
    "/api/feedback/:courseId/submit",
    authenticateJWT,
    feedbackController.submitFeedback
  );
  app.get("/api/feedback/:courseId", feedbackController.getAllCourseFeedback);
}
