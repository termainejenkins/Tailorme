import axios from 'axios';
import { Resume } from '@tailorme/shared';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const resumeService = {
  // Get all resumes
  async getAllResumes(): Promise<Resume[]> {
    const response = await axios.get(`${API_URL}/resumes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Get a specific resume
  async getResume(id: string): Promise<Resume> {
    const response = await axios.get(`${API_URL}/resumes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Create a new resume
  async createResume(resume: Omit<Resume, 'id'>): Promise<Resume> {
    const response = await axios.post(`${API_URL}/resumes`, resume, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Update a resume
  async updateResume(id: string, resume: Partial<Resume>): Promise<Resume> {
    const response = await axios.put(`${API_URL}/resumes/${id}`, resume, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  // Delete a resume
  async deleteResume(id: string): Promise<void> {
    await axios.delete(`${API_URL}/resumes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
}; 