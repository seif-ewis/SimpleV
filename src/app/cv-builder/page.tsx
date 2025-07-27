// app/cv-builder/page.tsx
import CVForm from '@/components/CVForm';

export default function CVBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        CV Builder
      </h1>
      <CVForm />
    </div>
  );
}