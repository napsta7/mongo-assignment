import { Router } from "express";
const router = Router();
import { getAllThoughts, getThoughtById, updateThought, createThought, deleteThought, createReaction, deleteReaction, } from "../../controllers/thoughtController.js";
//GET all thoughts
router.get("/", getAllThoughts);
//GET a single thought by ID
router.get("/:thoughtId", getThoughtById);
//PUT to update a thought by ID
router.put("/:thoughtId", updateThought);
//POST a new thought
router.post("/", createThought);
//DELETE a thought by ID
router.delete("/:thoughtId", deleteThought);
//POST to add a reaction
router.post("/:thoughtId/reactions", createReaction);
//DELETE to remove a reaction
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);
export { router as thoughtRoutes };
