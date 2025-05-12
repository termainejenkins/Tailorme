"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Resume_1 = require("../models/Resume");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all resumes for the authenticated user
router.get('/', auth_1.auth, async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const resumes = await Resume_1.Resume.find({ userId: req.user._id });
        res.json(resumes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching resumes', error });
    }
});
// Get a specific resume
router.get('/:id', auth_1.auth, async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const resume = await Resume_1.Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching resume', error });
    }
});
// Create a new resume
router.post('/', auth_1.auth, async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const resume = new Resume_1.Resume({
            ...req.body,
            userId: req.user._id,
        });
        await resume.save();
        res.status(201).json(resume);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating resume', error });
    }
});
// Update a resume
router.put('/:id', auth_1.auth, async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const resume = await Resume_1.Resume.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { $set: req.body }, { new: true });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json(resume);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating resume', error });
    }
});
// Delete a resume
router.delete('/:id', auth_1.auth, async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const resume = await Resume_1.Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json({ message: 'Resume deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting resume', error });
    }
});
exports.default = router;
