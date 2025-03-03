import User from "../models/User.js";
import { Request, Response } from "express";

//Read
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

//Read
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends")
      .select("-__v");

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
      return;
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    return;
  }
};

//Update
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      res.status(404).json("Error: User not found.");
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
//Create
export const createUser = async (req: Request, res: Response) => {
  try {
    const createUser = await User.create(req.body);
    res.json(createUser);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
//Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });
    if (!deleteUser) {
      res.status(404).json("Error: User not found.");
    } else {
      res.status(200).json("User deleted successfully.");
    }
  } catch (err: any) {
    res.status(500).json({ error: "Error: " + err.message });
  }
};
//Add friend
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json("Error: User not found.");
    } else {
      res.status(200).json(updatedUser);
      return;
    }
  } catch (err: any) {
    res.status(500).json("Error: " + err.message);
    return;
  }
};
//Remove friend
export const removeFriend = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json("Error: User not found.");
    } else {
      res.status(200).json("User deleted successfully.");
      return;
    }
  } catch (err: any) {
    res.status(500).json({ error: "Error: " + err.message });
    return;
  }
};
