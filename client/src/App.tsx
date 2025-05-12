import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

// Placeholder components for now
const ResumesPage = () => <div className="p-4">Resumes Page</div>;
const ProfilesPage = () => <div className="p-4">Profiles Page</div>;
const SettingsPage = () => <div className="p-4">Settings Page</div>;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/resumes" element={<ResumesPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<ResumesPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App; 