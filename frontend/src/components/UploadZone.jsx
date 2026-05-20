import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

export default function UploadZone({ onUpload }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (validTypes.includes(file.type)) {
      onUpload(file);
    } else {
      alert('Please upload a PDF, TXT, or DOCX file');
    }
  };

  return (
    <div
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`w-full max-w-2xl mx-auto p-12 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300 ${
        isDragOver
          ? 'border-accent-blue bg-blue-900/20 scale-105'
          : 'border-gray-600 bg-dark-card hover:border-accent-blue hover:bg-blue-900/10'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileInput}
        className="hidden"
        accept=".pdf,.txt,.docx"
      />

      <div className="flex flex-col items-center gap-4">
        <div className={`p-4 rounded-lg transition-all ${isDragOver ? 'bg-accent-blue/30' : 'bg-gray-700/30'}`}>
          <Upload size={48} className="text-accent-blue" />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Upload your SRS, PRD, or User Stories
          </h2>
          <p className="text-gray-400 mb-4">
            Drag and drop your document here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, TXT, DOCX
          </p>
        </div>

        <button
          className="mt-4 px-8 py-3 bg-accent-blue hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50"
        >
          Start Analysis
        </button>
      </div>
    </div>
  );
}
