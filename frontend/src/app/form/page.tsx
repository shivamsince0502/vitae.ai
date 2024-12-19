'use client';

import { MultiStepForm } from '@/components/form/MultiStepForm';
import { useRouter } from 'next/navigation';

export default function FormPage() {
  const router = useRouter();

  const handleFormSubmit = (data: any) => {
    // Store the form data in localStorage or state management
    localStorage.setItem('resumeData', JSON.stringify(data));
    router.push('/templates');
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-16">
      <div className="container mx-auto max-w-[800px] px-4">
        <h1 className="text-3xl font-bold text-center mb-12">
          Fill Your Resume Details
        </h1>
        <div className="bg-[#1e293b] p-8 rounded-lg">
          <MultiStepForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </main>
  );
}