"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resumeSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
resumeSchema.pre('save', function (next) {
    this.metadata.lastModified = new Date();
    next();
});
exports.Resume = mongoose_1.default.model('Resume', resumeSchema);
