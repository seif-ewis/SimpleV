// src/components/Step4.tsx
'use client';

import { CVData } from '@/lib/types';

interface Step4Props {
  data: CVData;
  handleChange: (section: keyof CVData, field: string, value: string) => void;
}

export default function Step4({ data, handleChange }: Step4Props) {
  const handleProjectsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange('projects', 'projects', e.target.value);
  };

  const handleLanguagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange('languages', 'languages', e.target.value);
  };

  return (
    <div>
      {/* Projects Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Projects</h2>
      <div>
        <label htmlFor="projects" className="block text-sm font-medium text-gray-700">
          Describe any relevant projects. You can list multiple projects, each with a name and description.
        </label>
        <textarea
          name="projects"
          id="projects"
          rows={6}
          value={data.projects}
          onChange={handleProjectsChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <hr className="my-8" />

      {/* Languages Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Languages</h2>
      <div>
        <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
          List the languages you speak and your proficiency (e.g., English - Native, Spanish - Conversational).
        </label>
        <textarea
          name="languages"
          id="languages"
          rows={4}
          value={data.languages}
          onChange={handleLanguagesChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}