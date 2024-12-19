'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FileUp, FormInput } from 'lucide-react';

export default function CreateResume() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-16">
      <div className="container mx-auto max-w-[800px] px-4">
        <h1 className="text-3xl font-bold text-center mb-12">
          How would you like to create your resume?
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Option */}
          <button
            onClick={() => router.push('/upload')}
            className="p-8 rounded-lg bg-[#1e293b] border border-gray-800 hover:border-sky-500 transition-all text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-all">
              <FileUp className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
            <p className="text-gray-400">
              Upload your existing resume and let our AI enhance it
            </p>
          </button>

          {/* Form Option */}
          <button
            onClick={() => router.push('/form')}
            className="p-8 rounded-lg bg-[#1e293b] border border-gray-800 hover:border-sky-500 transition-all text-center group"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-all">
              <FormInput className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fill Form</h3>
            <p className="text-gray-400">
              Create a new resume by filling out our structured form
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}
