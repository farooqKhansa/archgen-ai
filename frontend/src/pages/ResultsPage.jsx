import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AgentTracker from '../components/AgentTracker';
import ArtifactsPanel from '../components/ArtifactsPanel';
import BootstrapSimulator from '../components/BootstrapSimulator';
import ReportDownload from '../components/ReportDownload';
import { mockAgents } from '../data/mockData';

export default function ResultsPage() {
  const navigate = useNavigate();
  const [useMockData, setUseMockData] = useState(true);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-accent-blue transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Upload
            </button>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Data Source:</span>
              <button
                onClick={() => setUseMockData(!useMockData)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  useMockData
                    ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/50'
                    : 'bg-gray-700/50 text-gray-400 border border-gray-600'
                }`}
              >
                {useMockData ? 'Mock Data' : 'Live API'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Architecture Analysis Results</h1>
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">
              Analysis Complete
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section A: Agent Progress Tracker */}
        <section className="animate-slideInUp">
          <AgentTracker agents={mockAgents} />
        </section>

        {/* Section B: Artifacts Panel */}
        <section className="animate-slideInUp delay-100" style={{ animationDelay: '0.2s' }}>
          <ArtifactsPanel />
        </section>

        {/* Section C: Bootstrap Simulator */}
        <section className="animate-slideInUp delay-100" style={{ animationDelay: '0.4s' }}>
          <BootstrapSimulator />
        </section>

        {/* Section D: Report Download */}
        <section className="animate-slideInUp delay-100" style={{ animationDelay: '0.6s' }}>
          <ReportDownload />
        </section>

        {/* Additional Information */}
        <section className="bg-dark-card border border-gray-700 rounded-lg p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-accent-blue font-bold">1</span>
              <div>
                <p className="font-semibold text-white">Review Architecture</p>
                <p className="text-gray-400 text-sm">Examine all diagrams and recommendations</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-blue font-bold">2</span>
              <div>
                <p className="font-semibold text-white">Download Bootstrap Code</p>
                <p className="text-gray-400 text-sm">Get started with the generated project structure</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-blue font-bold">3</span>
              <div>
                <p className="font-semibold text-white">Review Test Strategy</p>
                <p className="text-gray-400 text-sm">Check comprehensive test cases and coverage</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-accent-blue font-bold">4</span>
              <div>
                <p className="font-semibold text-white">Share Report</p>
                <p className="text-gray-400 text-sm">Download and share with your team</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-dark-card/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-2">About ArchGen</h3>
              <p className="text-gray-400 text-sm">AI-powered architecture generation for modern applications</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Features</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Requirements Analysis</li>
                <li>• UML Diagrams</li>
                <li>• Database Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">Support</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Documentation</li>
                <li>• Contact Support</li>
                <li>• Feedback</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 ArchGen AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
