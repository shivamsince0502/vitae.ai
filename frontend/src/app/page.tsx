'use client';

import ResumeBuilder from '@/components/ResumeBuilder';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">AI Resume Builder</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Create a professional resume in minutes using AI-powered content generation. 
            Upload your existing resume or fill out a form to get started.
          </p>
        </div>
        <ResumeBuilder />
      </div>
    </main>
  );
}
