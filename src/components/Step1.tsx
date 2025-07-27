// src/components/Step1.tsx
'use client';

import { CVData } from '@/lib/types';

interface Step1Props {
  data: CVData;
  handleChange: (section: keyof CVData, field: string, value: string) => void;
}

export default function Step1({ data, handleChange }: Step1Props) {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('personalInfo', e.target.name, e.target.value);
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange('careerObjective', 'careerObjective', e.target.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="fullName" id="fullName" value={data.personalInfo.fullName} onChange={handlePersonalInfoChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" value={data.personalInfo.phoneNumber} onChange={handlePersonalInfoChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g., City, Country)</label>
          <input type="text" name="location" id="location" value={data.personalInfo.location} onChange={handlePersonalInfoChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
          <input type="url" name="linkedin" id="linkedin" value={data.personalInfo.linkedin} onChange={handlePersonalInfoChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Career Objective</h2>
      <div>
        <label htmlFor="careerObjective" className="block text-sm font-medium text-gray-700">
  Briefly describe your career goal or what you&apos;re looking for.
</label>
        <textarea
          name="careerObjective"
          id="careerObjective"
          rows={4}
          value={data.careerObjective}
          onChange={handleObjectiveChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}