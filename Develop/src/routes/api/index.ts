import { Router } from "express";
import { userRoutes } from "./userRoutes.js"; //Importing user routes
import { thoughtRoutes } from "./thoughtRoutes.js"; //Importing thought routes

const router = Router();

router.use("/users", userRoutes); //Using the user routes
router.use("/thoughts", thoughtRoutes); //Using the thought routes

export default router;
