import Thought from "../models/Thought";
import { Request, Response } from "express";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
