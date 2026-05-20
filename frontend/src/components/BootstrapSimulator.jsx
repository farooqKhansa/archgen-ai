import React, { useState, useEffect } from 'react';
import { FolderOpen, CheckCircle } from 'lucide-react';
import { bootstrapLogs, beforeState, afterState } from '../data/mockData';

export default function BootstrapSimulator() {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    bootstrapLogs.forEach((log, index) => {
      setTimeout(() => {
        setDisplayedLogs(prev => [...prev, log]);
        if (index === bootstrapLogs.length - 1) {
          setIsComplete(true);
        }
      }, (index + 1) * 800);
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Project Bootstrap Simulation</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Before State */}
        <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-400 mb-4">Before</h3>
          <div className="flex flex-col items-center justify-center h-64 bg-gray-900/50 rounded-lg">
            <FolderOpen size={48} className="text-gray-600 mb-2" />
            <p className="text-gray-600 font-medium">{beforeState.label}</p>
            <p className="text-gray-500 text-sm">{beforeState.description}</p>
          </div>
        </div>

        {/* After State */}
        <div className="bg-dark-card border border-accent-blue/30 rounded-lg p-6 transform transition-all duration-500" 
          style={{ opacity: isComplete ? 1 : 0.5 }}>
          <h3 className="text-lg font-semibold text-accent-blue mb-4 flex items-center gap-2">
            <CheckCircle size={18} /> After
          </h3>
          {isComplete ? (
            <div className="space-y-4">
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <p className="text-green-400 font-medium mb-3">{afterState.label}</p>
                <div className="space-y-2 text-sm text-gray-300">
                  {afterState.structure.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-accent-blue">📁</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-accent-blue/10 border border-accent-blue/30 rounded p-3 text-center">
                  <p className="text-accent-blue font-bold">{afterState.stats.files}</p>
                  <p className="text-gray-400 text-xs">Files</p>
                </div>
                <div className="bg-accent-blue/10 border border-accent-blue/30 rounded p-3 text-center">
                  <p className="text-accent-blue font-bold">{afterState.stats.folders}</p>
                  <p className="text-gray-400 text-xs">Folders</p>
                </div>
                <div className="bg-accent-blue/10 border border-accent-blue/30 rounded p-3 text-center">
                  <p className="text-accent-blue font-bold">{afterState.stats.tickets}</p>
                  <p className="text-gray-400 text-xs">Tickets</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Initializing...</p>
            </div>
          )}
        </div>
      </div>

      {/* Log Stream */}
      <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Bootstrap Log Stream</h3>
        <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm space-y-2 h-48 overflow-y-auto">
          {displayedLogs.length === 0 ? (
            <p className="text-gray-600">Waiting to start...</p>
          ) : (
            displayedLogs.map((log, idx) => (
              <div key={idx} className="text-green-400 animate-fadeIn">
                <span className="text-gray-600">$</span> {log}
              </div>
            ))
          )}
          {isComplete && (
            <div className="text-gray-500 pt-2">
              <span className="text-accent-blue animate-pulse">⟳</span> Ready for next phase...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
