import { Router } from "express";
const router = Router();
import { getAllUsers, getUserById, updateUser, createUser, deleteUser, addFriend, removeFriend, } from "../../controllers/userController.js";
// GET all users
router.get("/", getAllUsers);
// GET a single user by ID
router.get("/:userId", getUserById);
// POST a new user
router.post("/", createUser);
// PUT to update a user by ID
router.put("/:userId", updateUser);
// DELETE a user by ID
router.delete("/:userId", deleteUser);
// POST to add a friend
router.post("/:userId/friends/:friendId", addFriend);
// DELETE to remove a friend
router.delete("/:userId/friends/:friendId", removeFriend);
export { router as userRoutes };
