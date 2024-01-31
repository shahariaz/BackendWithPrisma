import { Router } from "express";
import AuthController from "../controllers/authController.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddleware from "../middleware/Authenticate.js";
const router = Router();

router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)

//* router for user profile
router.get("/profile",authMiddleware,ProfileController.index);
router.put("/profile/:id",authMiddleware,ProfileController.update);

export default router;

