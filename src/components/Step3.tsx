// src/components/Step3.tsx
'use client';

import { Education } from '@/lib/types';

interface Step3Props {
  educationData: Education[];
  skillsData: string[];
  handleEducationChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  handleSkillsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Step3({
  educationData,
  skillsData,
  handleEducationChange,
  addEducation,
  removeEducation,
  handleSkillsChange,
}: Step3Props) {
  return (
    <div>
      {/* Education Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Education</h2>
      {educationData.map((edu) => (
        <div key={edu.id} className="mb-8 p-4 border rounded-md relative">
          {educationData.length > 1 && (
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600"
              aria-label="Remove education"
            >
              &times;
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-700">Degree & Major</label>
              <input type="text" name="degree" id={`degree-${edu.id}`} value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor={`university-${edu.id}`} className="block text-sm font-medium text-gray-700">University</label>
              <input type="text" name="university" id={`university-${edu.id}`} value={edu.university} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`graduationYear-${edu.id}`} className="block text-sm font-medium text-gray-700">Graduation Year</label>
              <input type="text" name="graduationYear" id={`graduationYear-${edu.id}`} value={edu.graduationYear} onChange={(e) => handleEducationChange(edu.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
      >
        + Add Another Education
      </button>

      <hr className="my-8" />

      {/* Skills Section */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Skills</h2>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          List your top skills, separated by commas (e.g., JavaScript, React, Node.js)
        </label>
        <input
          type="text"
          name="skills"
          id="skills"
          value={skillsData.join(', ')}
          onChange={handleSkillsChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}