import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Profile {
  id: string;
  name: string;
  description: string;
  targetRole: string;
  visibleSections: string[];
}

interface ProfileManagerProps {
  profiles: Profile[];
  onProfileSelect: (profileId: string) => void;
  onProfileCreate: (profile: Omit<Profile, 'id'>) => void;
  onProfileDelete: (profileId: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
  profiles,
  onProfileSelect,
  onProfileCreate,
  onProfileDelete,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    description: '',
    targetRole: '',
  });

  const handleCreateProfile = () => {
    onProfileCreate({
      ...newProfile,
      visibleSections: [],
    });
    setIsCreating(false);
    setNewProfile({ name: '', description: '', targetRole: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resume Profiles</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Profile
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className="text-lg font-medium mb-4">Create New Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Name
              </label>
              <input
                type="text"
                value={newProfile.name}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Software Engineer Profile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Role
              </label>
              <input
                type="text"
                value={newProfile.targetRole}
                onChange={(e) => setNewProfile({ ...newProfile, targetRole: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={newProfile.description}
                onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Describe the purpose of this profile..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.targetRole}</p>
              <p className="text-sm text-gray-600 mt-1">{profile.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onProfileSelect(profile.id)}
                className="px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                View
              </button>
              <button
                onClick={() => onProfileDelete(profile.id)}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileManager; 