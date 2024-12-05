"use client";

import { useState } from 'react';
import { LatexEditor } from '@/components/editor/LatexEditor';
import { PDFPreview } from '@/components/preview/PDFPreview';

export default function EditorPage() {
  const [latexCode, setLatexCode] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string>();

  const handleLatexChange = (newCode: string) => {
    setLatexCode(newCode);
    // TODO: Implement real-time compilation
    console.log('LaTeX code updated:', newCode);
  };

  const handleCompile = async () => {
    try {
      // TODO: Implement LaTeX compilation
      console.log('Compiling LaTeX code...');
    } catch (error) {
      console.error('Error compiling LaTeX:', error);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume Editor</h1>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          <div className="flex flex-col h-full">
            <LatexEditor
              initialValue={latexCode}
              onChange={handleLatexChange}
              onCompile={handleCompile}
            />
          </div>
          <div className="flex flex-col h-full">
            <PDFPreview pdfUrl={pdfUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
