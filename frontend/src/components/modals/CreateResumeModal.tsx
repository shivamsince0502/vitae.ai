"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { FileUpload } from '../ui/file-upload';
import { Loading } from '../ui/loading';

interface CreateResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateResumeModal({ isOpen, onClose }: CreateResumeModalProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    try {
      // TODO: Implement PDF upload and analysis
      console.log('Analyzing resume:', file.name);
      router.push('/editor');
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Resume</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isUploading ? (
            <Loading text="Analyzing your resume..." />
          ) : (
            <>
              <FileUpload
                onFileSelect={handleFileSelect}
                accept=".pdf"
                maxSize={5 * 1024 * 1024}
              />
              <div className="text-center">
                <span className="px-2 text-sm text-muted-foreground">or</span>
              </div>
              <Button
                onClick={() => router.push('/form')}
                className="w-full"
                variant="outline"
              >
                Start Fresh
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
