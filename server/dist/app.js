"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const resume_1 = __importDefault(require("./routes/resume"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tailorme')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/resumes', resume_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
