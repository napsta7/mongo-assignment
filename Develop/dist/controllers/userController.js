import User from "../models/User.js";
//Using find() to get all users.
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//Using findById() to get a specific user.
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate("thoughts")
            .populate("friends")
            .select("-__v");
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            res.json(user);
            return;
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        return;
    }
};
//Using findByIdAndUpdate() to update a specific user by ID.
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            res.status(404).json("Error: User not found.");
        }
        else {
            res.status(200).json(updatedUser);
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//Using create() to create a new user.
export const createUser = async (req, res) => {
    try {
        const createUser = await User.create(req.body);
        res.json(createUser);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//Using findByIdAndDelete() to delete a user by ID.
export const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete({ _id: req.params.userId });
        if (!deleteUser) {
            res.status(404).json("Error: User not found.");
        }
        else {
            res.status(200).json("User deleted successfully.");
        }
    }
    catch (err) {
        res.status(500).json({ error: "Error: " + err.message });
    }
};
//Using findByIdAndUpdate() to add a new friend to this user.
export const addFriend = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json("Error: User not found.");
        }
        else {
            res.status(200).json(updatedUser);
            return;
        }
    }
    catch (err) {
        res.status(500).json("Error: " + err.message);
        return;
    }
};
//Using findByIdAndUpdate to pull (remove) a friend from this user.
export const removeFriend = async (req, res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
        if (!updatedUser) {
            res.status(404).json("Error: User not found.");
        }
        else {
            res.status(200).json(updatedUser);
            return;
        }
    }
    catch (err) {
        res.status(500).json({ error: "Error: " + err.message });
        return;
    }
};
