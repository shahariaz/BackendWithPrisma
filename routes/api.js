import { Router } from "express";
import AuthController from "../controllers/authController.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddleware from "../middleware/Authenticate.js";
import newsController from '../controllers/NewsController.js';
const router = Router();

router.post("/auth/register",AuthController.register)
router.post("/auth/login",AuthController.login)

//* router for user profile
router.get("/profile",ProfileController.index);
router.put("/profile/:id",authMiddleware,ProfileController.update);
//* router for news
router.post("/news/:id",authMiddleware,newsController.store);
router.get("/news",authMiddleware,newsController.index);
router.get("/news/:id",authMiddleware,newsController.show);
router.put("/news/:id",authMiddleware,newsController.update);
router.delete("/news/:id",authMiddleware,newsController.destory);


export default router;

