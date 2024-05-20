import userController from "../controllers/User.controller";
import protect from "../middleware/Auth.middleware";

const routes = (app) => {

  //User Routes
  app.post("/user/login", userController.loginUser);
  app.post("/user/signup", userController.signupUser);
};

export default routes;
