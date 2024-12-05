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

  return (
    <div className="w-full h-full min-h-[500px] rounded-lg border overflow-hidden">
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        title="Resume PDF Preview"
      />
    </div>
  );
}
