import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Resume, ResumeExportOptions } from '@tailorme/shared';
import { ExportService } from '../services/exportService';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume;
  selectedSections: string[];
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  resume,
  selectedSections,
}) => {
  const [format, setFormat] = useState<'pdf' | 'docx' | 'txt'>('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const options: ResumeExportOptions = {
        format,
        includeMetadata,
        template: 'default',
        sections: selectedSections,
      };

      const blob = await ExportService.exportResume(resume, options);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      // TODO: Show error notification
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4 p-6">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Export Resume
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'pdf' | 'docx' | 'txt')}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                         shadow-sm focus:border-blue-500 focus:ring-blue-500 
                         dark:bg-gray-700 dark:text-white"
              >
                <option value="pdf">PDF</option>
                <option value="docx">Word Document</option>
                <option value="txt">Plain Text</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeMetadata"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                         border-gray-300 rounded dark:border-gray-600"
              />
              <label
                htmlFor="includeMetadata"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Include metadata
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 
                       dark:hover:bg-gray-600 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center px-4 py-2 text-sm font-medium 
                       text-white bg-blue-600 rounded-md hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 disabled:opacity-50"
            >
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}; 