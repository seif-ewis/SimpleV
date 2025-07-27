// src/components/Step2.tsx
'use client';

import { Experience } from '@/lib/types';

interface Step2Props {
  data: Experience[];
  handleChange: (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
}

export default function Step2({ data, handleChange, addExperience, removeExperience }: Step2Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Work Experience</h2>
      {data.map((exp, index) => (
        <div key={exp.id} className="mb-8 p-4 border rounded-md relative">
          {data.length > 1 && (
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600"
              aria-label="Remove experience"
            >
              &times;
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`jobTitle-${exp.id}`} className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" name="jobTitle" id={`jobTitle-${exp.id}`} value={exp.jobTitle} onChange={(e) => handleChange(exp.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-gray-700">Company</label>
              <input type="text" name="company" id={`company-${exp.id}`} value={exp.company} onChange={(e) => handleChange(exp.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium text-gray-700">Start Date</label>
              <input type="text" name="startDate" id={`startDate-${exp.id}`} placeholder="e.g., Jan 2020" value={exp.startDate} onChange={(e) => handleChange(exp.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium text-gray-700">End Date</label>
              <input type="text" name="endDate" id={`endDate-${exp.id}`} placeholder="e.g., Present" value={exp.endDate} onChange={(e) => handleChange(exp.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`responsibilities-${exp.id}`} className="block text-sm font-medium text-gray-700">Responsibilities & Achievements</label>
              <textarea name="responsibilities" id={`responsibilities-${exp.id}`} rows={4} value={exp.responsibilities} onChange={(e) => handleChange(exp.id, e)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
      >
        + Add Another Experience
      </button>
    </div>
  );
}