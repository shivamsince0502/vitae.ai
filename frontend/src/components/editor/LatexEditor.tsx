"use client";

import { Editor } from '@monaco-editor/react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface LatexEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export function LatexEditor({ initialValue = '', onChange }: LatexEditorProps) {
  const [editorContent, setEditorContent] = useState(initialValue);

  const handleEditorChange = (value: string = '') => {
    setEditorContent(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">LaTeX Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Format
          </Button>
          <Button variant="outline" size="sm">
            Copy
          </Button>
          <Button size="sm">
            Compile PDF
          </Button>
        </div>
      </div>
      <div className="flex-1 min-h-[500px]">
        <Editor
          height="100%"
          defaultLanguage="latex"
          theme="vs-dark"
          value={editorContent}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
