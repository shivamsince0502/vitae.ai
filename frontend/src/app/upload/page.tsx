'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumeUpload from '@/components/ResumeUpload';

export default function UploadResume() {
  const router = useRouter();

  const handleUploadSuccess = (parsedData: any) => {
    // Store the parsed data in localStorage or state management
    localStorage.setItem('resumeData', JSON.stringify(parsedData));
    router.push('/templates');
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-16">
      <div className="container mx-auto max-w-[800px] px-4">
        <h1 className="text-3xl font-bold text-center mb-12">
          Upload Your Resume
        </h1>
        <ResumeUpload onUploadComplete={handleUploadSuccess} />
      </div>
    </main>
  );
}
