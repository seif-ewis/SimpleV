// src/lib/types.ts

export type PersonalInfo = {
  fullName: string;
  email: string;
  phoneNumber: string;
  linkedin: string;
  location: string;
};

export type Experience = {
  id: string; // for unique key
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

export type Education = {
  id: string; // for unique key
  degree: string;
  university: string;
  graduationYear: string;
};

export type CVData = {
  personalInfo: PersonalInfo;
  careerObjective: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: string; // Keeping it simple for now
  languages: string; // Keeping it simple for now
};