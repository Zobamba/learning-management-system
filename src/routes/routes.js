import authRoutes from "./auth-routes.js";
import courseRoutes from "./course-routes.js";
import feedbackRoutes from "./feedback-routes.js";

export default function routes(app) {
  authRoutes(app);
  courseRoutes(app);
  feedbackRoutes(app);
}
