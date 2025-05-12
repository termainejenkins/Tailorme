"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const Resume_1 = require("../../models/Resume");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('Resume Routes', () => {
    let token;
    let userId;
    beforeEach(() => {
        // Create a test user and generate token
        userId = new mongoose.Types.ObjectId().toString();
        token = jsonwebtoken_1.default.sign({ _id: userId }, process.env.JWT_SECRET || 'test-secret');
    });
    describe('GET /api/resumes', () => {
        it('should return all resumes for authenticated user', async () => {
            // Create test resumes
            await Resume_1.Resume.create([
                {
                    userId,
                    masterData: {
                        sections: [{
                                type: 'personal_info',
                                title: 'Personal Info',
                                content: 'Test content',
                            }],
                    },
                },
                {
                    userId,
                    masterData: {
                        sections: [{
                                type: 'summary',
                                title: 'Summary',
                                content: 'Test summary',
                            }],
                    },
                },
            ]);
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/resumes')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
        });
        it('should return 401 if not authenticated', async () => {
            const response = await (0, supertest_1.default)(app_1.default)
                .get('/api/resumes');
            expect(response.status).toBe(401);
        });
    });
    describe('POST /api/resumes', () => {
        it('should create a new resume', async () => {
            const resumeData = {
                masterData: {
                    sections: [{
                            type: 'personal_info',
                            title: 'Personal Info',
                            content: 'Test content',
                        }],
                },
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/resumes')
                .set('Authorization', `Bearer ${token}`)
                .send(resumeData);
            expect(response.status).toBe(201);
            expect(response.body.masterData.sections).toHaveLength(1);
            expect(response.body.userId).toBe(userId);
        });
        it('should return 400 for invalid resume data', async () => {
            const invalidData = {
                masterData: {
                    sections: [{
                            type: 'invalid_type',
                            title: 'Invalid Section',
                        }],
                },
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .post('/api/resumes')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidData);
            expect(response.status).toBe(400);
        });
    });
    describe('PUT /api/resumes/:id', () => {
        it('should update an existing resume', async () => {
            const resume = await Resume_1.Resume.create({
                userId,
                masterData: {
                    sections: [{
                            type: 'personal_info',
                            title: 'Original Title',
                            content: 'Original content',
                        }],
                },
            });
            const updateData = {
                masterData: {
                    sections: [{
                            type: 'personal_info',
                            title: 'Updated Title',
                            content: 'Updated content',
                        }],
                },
            };
            const response = await (0, supertest_1.default)(app_1.default)
                .put(`/api/resumes/${resume._id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updateData);
            expect(response.status).toBe(200);
            expect(response.body.masterData.sections[0].title).toBe('Updated Title');
        });
        it('should return 404 for non-existent resume', async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();
            const response = await (0, supertest_1.default)(app_1.default)
                .put(`/api/resumes/${nonExistentId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({});
            expect(response.status).toBe(404);
        });
    });
    describe('DELETE /api/resumes/:id', () => {
        it('should delete an existing resume', async () => {
            const resume = await Resume_1.Resume.create({
                userId,
                masterData: {
                    sections: [{
                            type: 'personal_info',
                            title: 'Test Title',
                            content: 'Test content',
                        }],
                },
            });
            const response = await (0, supertest_1.default)(app_1.default)
                .delete(`/api/resumes/${resume._id}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            const deletedResume = await Resume_1.Resume.findById(resume._id);
            expect(deletedResume).toBeNull();
        });
        it('should return 404 for non-existent resume', async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toString();
            const response = await (0, supertest_1.default)(app_1.default)
                .delete(`/api/resumes/${nonExistentId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(404);
        });
    });
});
