import Thought from "../models/Thought.js";
//Read
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//Read
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ error: "Thought not found." });
        }
        else {
            res.status(200).json(thought);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//Update
export const updateThought = async (req, res) => {
    try {
        const updateThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updateThought) {
            res.status(404).json("Error: Thought not found.");
        }
        else {
            res.status(200).json(updateThought);
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//Create
export const createThought = async (req, res) => {
    try {
        const createThought = await Thought.create(req.body);
        res.json(createThought);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//Delete
export const deleteThought = async (req, res) => {
    try {
        const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deleteThought) {
            res.status(404).json("Error: Thought not found.");
        }
        else {
            res.status(200).json("Thought successfully deleted.");
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//Create reaction
export const createReaction = async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, {
            $push: { reactions: { reactionBody, username } },
        }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: "Thought not found" });
        }
        else {
            res.status(200).json(updatedThought);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        return;
    }
};
//Delete reaction
export const deleteReaction = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, {
            $pull: { reactions: { reactionId } },
        }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: "Thought not found" });
        }
        else {
            res.status(200).json(updatedThought);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        return;
    }
};
