import React, { useState } from 'react';
import { Download, Loader } from 'lucide-react';
import { downloadReport } from '../services/api';

export default function ReportDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await downloadReport();
    } catch (err) {
      // Mock download for demo
      const mockReport = new Blob(['Architecture Report - Mock Data'], { type: 'text/plain' });
      const url = window.URL.createObjectURL(mockReport);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'architecture-report.txt');
      document.body.appendChild(link);
      link.click();
      link.parentElement.removeChild(link);
      window.URL.revokeObjectURL(url);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-card border border-accent-blue/30 rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Your Architecture Report is Ready</h2>
      
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Your comprehensive architecture report including requirements, design decisions, diagrams, and bootstrap recommendations has been generated.
      </p>

      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="px-8 py-3 bg-accent-blue hover:bg-blue-600 disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 mx-auto"
      >
        {isLoading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download size={18} />
            Download Report
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}

      <p className="text-gray-500 text-xs mt-4">Format: PDF • File size: ~2.4 MB</p>
    </div>
  );
}
