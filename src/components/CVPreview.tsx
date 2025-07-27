// src/components/CVPreview.tsx
'use client';

import ReactMarkdown from 'react-markdown';

interface CVPreviewProps {
  markdownContent: string;
}

export default function CVPreview({ markdownContent }: CVPreviewProps) {
  return (
    <div className="bg-white p-8 shadow-lg">
      {/* The `prose` class from @tailwindcss/typography provides beautiful styling for markdown */}
      <article className="prose prose-sm max-w-none">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </article>
    </div>
  );
}