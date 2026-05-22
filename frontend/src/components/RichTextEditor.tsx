"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/dist/mdeditor.css";
import "@uiw/react-markdown-preview/dist/markdown-preview.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={(val) => onChange(val || "")} height={420} />
    </div>
  );
}
