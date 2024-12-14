'use client';

import { useEffect, useState } from 'react';
import { LatexEditor } from '@/components/editor/LatexEditor';
import { PDFPreview } from '@/components/preview/PDFPreview';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

export default function ResumeEditPage() {
  const [latexContent, setLatexContent] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCompile = async () => {
    try {
      setIsCompiling(true);
      const response = await fetch('http://localhost:3002/api/resume/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex: latexContent }),
      });

      if (!response.ok) {
        throw new Error('Compilation failed');
      }

      const data = await response.json();
      setPdfUrl(data.pdfUrl);
    } catch (error) {
      console.error('Compilation error:', error);
      alert('Failed to compile LaTeX. Please check your code and try again.');
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;
    
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
        <div className="flex gap-4">
          <Button
            onClick={handleCompile}
            disabled={isCompiling}
            className="flex items-center gap-2"
          >
            {isCompiling ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Compiling...
              </>
            ) : (
              'Compile'
            )}
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!pdfUrl}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="h-[calc(100vh-12rem)]">
          <LatexEditor
            initialValue={latexContent}
            onChange={setLatexContent}
          />
        </div>
        <div className="h-[calc(100vh-12rem)]">
          <PDFPreview pdfUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
}
