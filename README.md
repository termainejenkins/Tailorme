# Tailorme - Resume Management System

Tailorme is a modern resume management system that allows users to create and maintain a master resume with customizable profiles tailored to specific employers. Built with React, Node.js, and MongoDB.

## Creator

Created by **Termaine Jenkins** (TJ)

## Features

- Create and manage a master resume
- Generate tailored resumes for specific job applications
- Dark/Light mode support
- Export resumes in multiple formats (PDF, DOCX, TXT)
- Secure authentication
- Responsive design

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT
- **Testing**: Jest
- **Build Tools**: TypeScript, Webpack

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Project Structure

```
tailorme/
├── client/             # React frontend
├── server/             # Node.js backend
├── shared/             # Shared TypeScript types
└── package.json        # Root package.json for workspace management
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tailorme.git
   cd tailorme
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   Create a `.env` file in the server directory:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/tailorme
   JWT_SECRET=your-super-secret-key-change-this-in-production
   ```

4. **Start the development servers**

   Run both client and server:
   ```bash
   npm run dev
   ```

   Or run them separately:
   ```bash
   # Run client only
   npm run dev:client

   # Run server only
   npm run dev:server
   ```

## Available Scripts

### Development
- `npm run dev` - Start both client and server
- `npm run dev:client` - Start client only
- `npm run dev:server` - Start server only
- `npm run dev:shared` - Run shared package in watch mode
- `npm run dev:debug` - Run with server debugging enabled

### Testing
- `npm run test` - Run all tests
- `npm run test:client` - Run client tests
- `npm run test:server` - Run server tests
- `npm run test:watch` - Run tests in watch mode

### Building
- `npm run build` - Build all packages
- `npm run build:client` - Build client
- `npm run build:server` - Build server
- `npm run build:shared` - Build shared package

### Linting
- `npm run lint` - Lint all packages
- `npm run lint:client` - Lint client
- `npm run lint:server` - Lint server
- `npm run lint:fix` - Fix linting issues

### Production
- `npm run prod:build` - Build for production
- `npm run prod:start` - Start production server

### Maintenance
- `npm run clean` - Clean all build artifacts
- `npm run install:all` - Install all dependencies

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Resumes
- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/:id` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 