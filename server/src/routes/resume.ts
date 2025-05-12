import express from 'express';
import { Resume } from '../models/Resume';
import { auth } from '../middleware/auth';

const router = express.Router();

// Get all resumes for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const resumes = await Resume.find({ userId: req.user._id });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error });
  }
});

// Get a specific resume
router.get('/:id', auth, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error });
  }
});

// Create a new resume
router.post('/', auth, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const resume = new Resume({
      ...req.body,
      userId: req.user._id,
    });
    
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: 'Error creating resume', error });
  }
});

// Update a resume
router.put('/:id', auth, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body },
      { new: true }
    );
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: 'Error updating resume', error });
  }
});

// Delete a resume
router.delete('/:id', auth, async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error });
  }
});

export default router; 