import User from "../models/User";
import { Request, Response } from "express";

//Read
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};

//Read
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends")
      .select("-__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error:", err.message);
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
  } catch (err) {
    res.status(400).json("Error:", err.message);
  }
};
//Create
export const createUser = async (req: Request, res: Response) => {
  try {
    const createUser = await User.create(req.body);
    res.json(createUser);
  } catch (err) {
    res.status(400).json("Error:", err.message);
  }
};
//Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await User.findOneAndDelete(req.params.userId);
    if (!deleteUser) {
      res.status(404).json("Error: User not found.");
    } else {
      res.status(200).json("User deleted successfully.");
    }
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
//Add friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json("Error: User not found.");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
//Remove friend
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json("Error: User not found.");
    } else {
      res.status(200).json("User deleted successfully.");
    }
  } catch (err) {
    res.status(500).json("Error:", err.message);
  }
};
