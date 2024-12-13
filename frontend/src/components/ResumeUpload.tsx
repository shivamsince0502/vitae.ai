'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { FileUp, FileText, X } from 'lucide-react';

interface ResumeUploadProps {
  onUploadComplete: (parsedData: any) => void;
}

export default function ResumeUpload({ onUploadComplete }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    
    // Validate file type
    if (
      selectedFile.type === 'application/pdf' || 
      selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a PDF or DOCX file');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      // Log form data for debugging
      for (let [key, value] of formData.entries()) {
        console.log('Form Data:', key, value);
      }

      const response = await fetch('http://localhost:3002/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // Log full response for debugging
      console.log('Upload Response:', data);

      if (data.success) {
        onUploadComplete(data.data);
      } else {
        setError(data.message || 'Failed to upload resume');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('An error occurred during upload');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900 rounded-lg p-8 border border-zinc-800">
      <div 
        {...getRootProps()} 
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-300
          ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 hover:border-zinc-600'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <FileUp className="h-12 w-12 text-zinc-500" />
          <p className="text-zinc-400">
            {isDragActive 
              ? 'Drop your resume here' 
              : 'Drag and drop your resume, or click to select a file'}
          </p>
          <p className="text-sm text-zinc-500">Supports PDF and DOCX (max 50MB)</p>
        </div>
      </div>

      {file && (
        <div className="mt-6 flex items-center justify-between bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-blue-400" />
            <div>
              <p className="text-white">{file.name}</p>
              <p className="text-zinc-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={removeFile}
            className="text-zinc-400 hover:text-white hover:bg-zinc-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {file && (
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleUpload} 
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUploading ? 'Uploading...' : 'Upload Resume'}
          </Button>
        </div>
      )}
    </div>
  );
}
