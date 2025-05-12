import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface Section {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
  alternatives: string[];
  relevanceScore: number;
}

interface ResumeEditorProps {
  initialSections: Section[];
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ initialSections }) => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, isVisible: !section.isVisible }
        : section
    ));
  };

  const updateContent = (sectionId: string, newContent: string) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, content: newContent }
        : section
    ));
  };

  const useAlternative = (sectionId: string, alternativeIndex: number) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, content: section.alternatives[alternativeIndex] }
        : section
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedSection(section.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {section.isVisible ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            {section.isVisible && (
              <div className="space-y-4">
                <p className="text-gray-700">{section.content}</p>
                
                {section.alternatives.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Alternative Phrasings
                    </h4>
                    <div className="space-y-2">
                      {section.alternatives.map((alt, index) => (
                        <button
                          key={index}
                          onClick={() => useAlternative(section.id, index)}
                          className="block w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeEditor; 