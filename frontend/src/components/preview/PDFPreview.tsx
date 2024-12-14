"use client";
import PDFObject from "pdfobject";
import { useState } from "react";
import { Document, Page ,pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFPreviewProps {
  pdfUrl?: string;
}

export function PDFPreview({ pdfUrl }: PDFPreviewProps) {
  if (!pdfUrl) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px] bg-muted/10 rounded-lg border">
        <p className="text-muted-foreground">
          Preview will appear here after compilation
        </p>
      </div>
    );
  }
  // PDFObject.embed(pdfUrl, "#pdf-preview", {
  //   height: "100%",
  //   width: "100%",
  // })
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className="w-full h-full min-h-[500px] rounded-lg border overflow-hidden">
      {/* <iframe
        src={pdfUrl}
        className="w-full h-full"
        title="Resume PDF Preview"
      /> */}
      <div id="pdf-preview"></div>
      <embed
		style={{
		        width: '100%',
			height: '100%',
		}}
		type='application/pdf'
		src={pdfUrl}
		/>
    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}></Document>
    </div>
  );
}
