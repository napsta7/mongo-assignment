import { Router } from "express";
import apiRoutes from "./api/index.js"; //Importing /users and /thoughts and defining it as apiRoutes
const router = Router();
router.use("/api", apiRoutes); //Using apiRoutes
export default router;
