'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LatexEditor } from '@/components/editor/LatexEditor';
import { PDFPreview } from '@/components/preview/PDFPreview';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, RefreshCw } from 'lucide-react';
import { Loading } from '@/components/ui/loading';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL; 
export default function EditorPage() {
  const router = useRouter();
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [latexContent, setLatexContent] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    // Get stored data
    const storedData = localStorage.getItem('resumeData');
    const storedTemplate = localStorage.getItem('selectedTemplate');
    
    if (storedData && storedTemplate) {
      setResumeData(JSON.parse(storedData));
      setSelectedTemplate(storedTemplate);
      generateLatexContent(JSON.parse(storedData), storedTemplate);
    }
  }, []);

  const generateLatexContent = async (data: any, template: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch(BASE_URL + '/api/resume/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: data, templateId: template }),
      });
      
      const result = await response.json();
      if (result.success) {
        setLatexContent(result.latexContent);
        setPdfUrl(BASE_URL + result.pdfUrl);
      }
    } catch (error) {
      console.error('Failed to generate LaTeX:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompile = async () => {
    try {
      setIsCompiling(true);
      const response = await fetch(BASE_URL+'/api/resume/compile', {
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
      // Add timestamp to force PDF refresh
      setPdfUrl(BASE_URL + data.pdfUrl + '?t=' + Date.now());
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
    <main className="min-h-screen bg-[#0f172a] text-white">
      {
        isGenerating ? (
          <Loading text='Generating Resume...' />
        ):(
          <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Templates
          </Button>
          {/* <Button
            onClick={() => window.open(pdfUrl, '_blank')}
            disabled={!pdfUrl}
            className="bg-sky-500 hover:bg-sky-600 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF
          </Button> */}
          <div className="flex justify-between items-center">
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
          {/* <Button
            onClick={handleDownload}
            disabled={!pdfUrl}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button> */}
        </div>
      </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1e293b] rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">LaTeX Editor</h2>
            <div className="h-[calc(100vh-12rem)]">
          <LatexEditor
            initialValue={latexContent}
            onChange={setLatexContent}
          />
        </div>
          </div>
          
          <div className="bg-[#1e293b] rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <PDFPreview pdfUrl={pdfUrl}  />
          </div>
        </div>
      </div>
        )
      }
      
    </main>
  );
}
