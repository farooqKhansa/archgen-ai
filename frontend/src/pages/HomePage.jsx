import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadZone from '../components/UploadZone';

export default function HomePage() {
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    try {
      // In a real app, you would upload to the API here
      // For now, just navigate to results
      navigate('/results');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-dark-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent-blue">🏗️</span>
            <h1 className="text-2xl font-bold">ArchGen AI</h1>
          </div>
          <p className="text-gray-400 text-sm">AI-Powered Architecture Generation</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Generate Architecture Design
            <span className="block text-accent-blue">in Minutes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-2">
            Upload your requirements document and let AI generate a complete architecture
          </p>
          <p className="text-gray-500">Powered by advanced LLMs and architectural expertise</p>
        </div>

        {/* Upload Zone */}
        <div className="flex justify-center">
          <UploadZone onUpload={handleFileUpload} />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 text-center hover:border-accent-blue/50 transition-all">
            <div className="text-4xl mb-3">📄</div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Analysis</h3>
            <p className="text-gray-400 text-sm">Intelligent parsing of requirements and constraints</p>
          </div>

          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 text-center hover:border-accent-blue/50 transition-all">
            <div className="text-4xl mb-3">🏛️</div>
            <h3 className="text-lg font-semibold text-white mb-2">Architecture Design</h3>
            <p className="text-gray-400 text-sm">Best-practice architectural patterns and components</p>
          </div>

          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 text-center hover:border-accent-blue/50 transition-all">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">Complete Documentation</h3>
            <p className="text-gray-400 text-sm">Diagrams, schemas, test cases, and reports</p>
          </div>
        </div>

        {/* Supported Formats */}
        <div className="mt-16 bg-dark-card border border-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">Supports multiple document formats</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <span className="px-4 py-2 bg-gray-900/50 rounded-lg text-gray-300 text-sm">📕 PDF</span>
            <span className="px-4 py-2 bg-gray-900/50 rounded-lg text-gray-300 text-sm">📝 TXT</span>
            <span className="px-4 py-2 bg-gray-900/50 rounded-lg text-gray-300 text-sm">📘 DOCX</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-dark-card/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>© 2024 ArchGen AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
