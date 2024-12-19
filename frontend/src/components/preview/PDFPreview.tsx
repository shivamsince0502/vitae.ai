'use client';

import { useState, useEffect } from 'react';
import { Loading } from '../ui/loading';

interface PDFPreviewProps {
  pdfUrl?: string;
}

export function PDFPreview({ pdfUrl }: PDFPreviewProps) {
  const [pdfUrlState, setPdfUrlState] = useState(pdfUrl);

  useEffect(() => {
    setPdfUrlState(pdfUrl);
  }, [pdfUrl]);

  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] bg-muted/10 rounded-lg border">
        <p className="text-muted-foreground">
          PDF preview will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-12rem)] rounded-lg border overflow-hidden bg-white">
      <embed
        src={pdfUrlState}
        type="application/pdf"
        style={{
          width: '100%',
          height: '100%',
          display: 'block', // Ensure it's block-level
        }}
      />
      {/* Fallback iframe if embed doesn't work */}
      <iframe
        src={pdfUrlState}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'none', // Initially hidden
        }}
        title="Resume PDF Preview"
        onLoad={(e) => {
          const embed = e.currentTarget.previousElementSibling as HTMLElement;
          if (embed && !embed.clientHeight) {
            // If embed is not working (no height), show iframe
            embed.style.display = 'none';
            e.currentTarget.style.display = 'block';
          }
        }}
      />
    </div>
  );
}
