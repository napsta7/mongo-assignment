import Thought from "../models/Thought";
import { Request, Response } from "express";

//Read
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};

//Read
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json("Error: Thought not found.");
    } else {
      res.status(200).json(thought);
    }
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
//Update
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updateThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updateThought) {
      res.status(404).json("Error: Thought not found.");
    } else {
      res.status(200).json(updateThought);
    }
  } catch (err) {
    res.status(400).json("Error:", err.message);
  }
};
//Create
export const createThought = async (req: Request, res: Response) => {
  try {
    const createThought = await Thought.create(req.body);
    res.json(createThought);
  } catch (err) {
    res.status(400).json("Error:", err.message);
  }
};
//Delete
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deleteThought) {
      res.status(404).json("Error: Thought not found.");
    } else {
      res.status(200).json("Thought successfully deleted.");
    }
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
//TODO: Create and Delete reactions

//Create reaction
export const createReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $push: { reactions: { reactionBody, username } },
      },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
//Delete reaction
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $pull: { reactions: { reactionId } },
      },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.status(200).json(updatedThought);
  } catch (error) {
    res.status(500).json({ message: "Error deleting reaction", error });
  }
};
