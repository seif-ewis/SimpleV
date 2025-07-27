// src/components/CVForm.tsx
'use client';

import { useState, useRef } from 'react'; // <-- Import useRef
import { CVData } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import CVPreview from './CVPreview'; // <-- Import CVPreview
import { toPng } from 'html-to-image'; // <-- Import html-to-image
import jsPDF from 'jspdf'; // <-- Import jspdf

// ... (ProgressBar component remains the same)
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
  const percentage = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};


export default function CVForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: { fullName: 'Ada Lovelace', email: 'ada@example.com', phoneNumber: '123-456-7890', linkedin: 'linkedin.com/in/ada', location: 'London, UK' },
    careerObjective: 'To apply my skills in mathematical analysis and computational algorithms to pioneer new frontiers in technology.',
    skills: ['Analytical Engines', 'Mathematical Algorithms', 'Note-taking', 'Collaboration'],
    experience: [{ id: uuidv4(), jobTitle: 'Analytical Engine Programmer', company: 'Charles Babbage Workshops', startDate: '1842', endDate: '1843', responsibilities: '- Wrote the world\'s first algorithm intended to be processed by a machine.\n- Theorized a method for the engine to repeat a series of instructions, a process known as looping.\n- Described how the engine could be programmed to calculate Bernoulli numbers.' }],
    education: [{ id: uuidv4(), degree: 'Mathematics & Science', university: 'Private Tutelage by Mary Somerville', graduationYear: '1832' }],
    projects: 'Wrote extensive notes on the Analytical Engine, including what is now recognized as the first computer program.',
    languages: 'English (Native), French (Fluent)',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCv, setGeneratedCv] = useState<string | null>(null);
  const cvPreviewRef = useRef<HTMLDivElement>(null); // <-- NEW: Ref for the preview component

  const totalSteps = 4;

  const nextStep = () => setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  // ... (All data handler functions remain the same)
  const handleInputChange = (section: keyof CVData, field: string, value: string | string[]) => { setCvData(prevData => { if (section === 'personalInfo') { return { ...prevData, personalInfo: { ...prevData.personalInfo, [field]: value }}; } return { ...prevData, [section]: value }; }); };
  const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setCvData(prevData => ({ ...prevData, experience: prevData.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp) })); };
  const addExperience = () => { setCvData(prev => ({ ...prev, experience: [...prev.experience, { id: uuidv4(), jobTitle: '', company: '', startDate: '', endDate: '', responsibilities: '' }]})); };
  const removeExperience = (id: string) => { setCvData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) })); };
  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; setCvData(prevData => ({ ...prevData, education: prevData.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu) })); };
  const addEducation = () => { setCvData(prev => ({ ...prev, education: [...prev.education, { id: uuidv4(), degree: '', university: '', graduationYear: '' }]}));};
  const removeEducation = (id: string) => { setCvData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));};
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => { const skillsArray = e.target.value.split(',').map(skill => skill.trim()); setCvData(prev => ({ ...prev, skills: skillsArray })); };

  const handleSubmit = async () => {
    setIsLoading(true);
    setGeneratedCv(null);
    try {
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cvData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate CV: ${response.status} ${errorText}`);
      }
      const data = await response.json();
      setGeneratedCv(data.generatedCv);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW: PDF Download Handler ---
  const handleDownloadPdf = async () => {
    if (!cvPreviewRef.current) return;

    try {
      const dataUrl = await toPng(cvPreviewRef.current, { quality: 1.0, pixelRatio: 2 });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('ai-generated-cv.pdf');

    } catch (error) {
      console.error('Failed to download PDF', error);
      alert('Could not download PDF. Please try again.');
    }
  };

  // --- RENDER LOGIC ---
  if (isLoading) {
    return <div className="text-center p-10"><h2 className="text-2xl font-semibold">Generating Your CV...</h2><p className="text-gray-600">The AI is working its magic. This may take a moment.</p></div>;
  }

  if (generatedCv) {
    // UPDATED: Show the preview component instead of a <pre> tag
    return (
      <div className="max-w-4xl mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Your AI-Generated CV</h2>
          <div ref={cvPreviewRef}>
            <CVPreview markdownContent={generatedCv} />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => setGeneratedCv(null)} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
              Back to Edit
            </button>
            <button onClick={handleDownloadPdf} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Download as PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Form rendering part remains the same ---
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {
        { 1: <Step1 data={cvData} handleChange={handleInputChange} />,
          2: <Step2 data={cvData.experience} handleChange={handleExperienceChange} addExperience={addExperience} removeExperience={removeExperience} />,
          3: <Step3 educationData={cvData.education} skillsData={cvData.skills} handleEducationChange={handleEducationChange} addEducation={addEducation} removeEducation={removeEducation} handleSkillsChange={handleSkillsChange} />,
          4: <Step4 data={cvData} handleChange={handleInputChange} />
        }[currentStep]
      }
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? ( <button onClick={prevStep} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Back</button> ) : <div></div>}
        {currentStep < totalSteps ? ( <button onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Next</button> ) : ( <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Generate CV</button> )}
      </div>
    </div>
  );
}