import React, { useState } from 'react';
import DiagramViewer from './DiagramViewer';
import { mockRequirements, mockArchitecture, mockDiagrams, mockDatabase, mockTestCases } from '../data/mockData';
import { Code2, Database } from 'lucide-react';

export default function ArtifactsPanel() {
  const [activeTab, setActiveTab] = useState('requirements');

  const tabs = [
    { id: 'requirements', label: 'Requirements' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'diagrams', label: 'Diagrams' },
    { id: 'database', label: 'Database' },
    { id: 'tests', label: 'Test Cases' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analysis Artifacts</h2>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-700 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-accent-blue border-b-2 border-accent-blue'
                : 'text-gray-400 hover:text-gray-300 border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            {/* Actors */}
            <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actors</h3>
              <div className="space-y-3">
                {mockRequirements.actors.map(actor => (
                  <div key={actor.id} className="flex gap-4 p-3 bg-gray-900/50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center text-accent-blue">
                      👤
                    </div>
                    <div>
                      <p className="font-medium text-white">{actor.name}</p>
                      <p className="text-gray-400 text-sm">{actor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Functional Requirements</h3>
              <ul className="space-y-2">
                {mockRequirements.functional.map(req => (
                  <li key={req.id} className="flex gap-3 text-gray-300">
                    <span className="text-accent-blue flex-shrink-0">✓</span>
                    <span>{req.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Constraints */}
            <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Constraints</h3>
              <ul className="space-y-2">
                {mockRequirements.constraints.map(constraint => (
                  <li key={constraint.id} className="flex gap-3 text-gray-300">
                    <span className="text-orange-400 flex-shrink-0">⚡</span>
                    <span>{constraint.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            {/* Architecture Pattern */}
            <div className="bg-dark-card border border-accent-blue/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-accent-blue mb-3">Recommended Pattern</h3>
              <p className="text-2xl font-bold text-white mb-2">{mockArchitecture.pattern}</p>
              <p className="text-gray-400">{mockArchitecture.reasoning}</p>
            </div>

            {/* Components */}
            <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Components</h3>
              <div className="space-y-3">
                {mockArchitecture.components.map(component => (
                  <div key={component.id} className="border border-gray-700 rounded-lg p-4 hover:border-accent-blue/50 transition-all">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="font-semibold text-white">{component.name}</p>
                        <p className="text-sm text-accent-blue">{component.technology}</p>
                      </div>
                      <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">Component</span>
                    </div>
                    <p className="text-gray-400 text-sm">{component.responsibility}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Diagrams Tab */}
        {activeTab === 'diagrams' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DiagramViewer diagram={mockDiagrams.useCaseDiagram} title="Use Case Diagram" />
            <DiagramViewer diagram={mockDiagrams.classDiagram} title="Class Diagram" />
            <DiagramViewer diagram={mockDiagrams.sequenceDiagram} title="Sequence Diagram" />
          </div>
        )}

        {/* Database Tab */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            {/* ER Diagram */}
            <DiagramViewer diagram={mockDatabase.erDiagram} title="Entity Relationship Diagram" />

            {/* SQL Schema */}
            <div className="bg-dark-card border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Database size={18} /> SQL Schema
              </h3>
              <pre className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                {mockDatabase.schema}
              </pre>
            </div>
          </div>
        )}

        {/* Test Cases Tab */}
        {activeTab === 'tests' && (
          <div className="bg-dark-card border border-gray-700 rounded-lg p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Test Cases</h3>
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="px-4 py-2 text-gray-400 font-medium">ID</th>
                  <th className="px-4 py-2 text-gray-400 font-medium">Name</th>
                  <th className="px-4 py-2 text-gray-400 font-medium">Type</th>
                  <th className="px-4 py-2 text-gray-400 font-medium">Priority</th>
                  <th className="px-4 py-2 text-gray-400 font-medium">Steps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockTestCases.map(testCase => (
                  <tr key={testCase.id} className="hover:bg-gray-900/50 transition-all">
                    <td className="px-4 py-3 text-accent-blue font-medium">{testCase.id}</td>
                    <td className="px-4 py-3 text-white">{testCase.name}</td>
                    <td className="px-4 py-3 text-gray-300">{testCase.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        testCase.priority === 'Critical' ? 'bg-red-900/30 text-red-400' :
                        testCase.priority === 'High' ? 'bg-orange-900/30 text-orange-400' :
                        'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {testCase.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-400 text-xs max-w-xs">
                        {testCase.steps.length} steps
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
