import mongoose from 'mongoose';
import { Resume, ResumeSection, ResumeProfile } from '@tailorme/shared';

export interface IResume extends mongoose.Document, Omit<Resume, 'id'> {
  userId: mongoose.Types.ObjectId;
}

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  masterData: {
    sections: [{
      id: String,
      type: {
        type: String,
        enum: ['personal_info', 'summary', 'experience', 'education', 'skills', 'certifications', 'projects', 'custom'],
        required: true,
      },
      title: String,
      content: String,
      isVisible: Boolean,
      alternatives: [String],
      relevanceScore: Number,
      order: Number,
      metadata: {
        keywords: [String],
        lastModified: Date,
        created: Date,
      },
    }],
  },
  profiles: [{
    id: String,
    name: String,
    description: String,
    targetRole: String,
    visibleSections: [String],
    sectionOrder: [String],
    metadata: {
      created: Date,
      lastModified: Date,
      version: Number,
    },
  }],
  metadata: {
    created: {
      type: Date,
      default: Date.now,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
});

// Update lastModified timestamp before saving
resumeSchema.pre('save', function(next) {
  this.metadata.lastModified = new Date();
  next();
});

export const Resume = mongoose.model<IResume>('Resume', resumeSchema); 