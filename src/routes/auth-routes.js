import userController from "../controllers/user-controller.js";

export default function authRoutes(app) {
  app.post("/api/auth/register", userController.createUser);
  app.post("/api/auth/login", userController.loginUser);
  app.get("/api/auth/:userId", userController.getUserById);
}
