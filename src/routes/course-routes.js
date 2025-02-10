import courseController from "../controllers/course-controller.js";
import authenticateJWT from "../middlewares/auth.js";

export default function courseRoutes(app) {
  app.post("/api/course", authenticateJWT, courseController.createCourse);
  app.get("/api/course/all", courseController.getAllCourses);
  app.get(
    "/api/course/progress",
    authenticateJWT,
    courseController.getCourseProgress
  );
  app.patch(
    "/api/course/:courseId/progress",
    authenticateJWT,
    courseController.updateCourseProgress
  );
  app.get("/api/course/:courseId", courseController.getCourseById);
  app.post(
    "/api/course/:courseId/enroll",
    authenticateJWT,
    courseController.enrollStudentInCourse
  );
}
