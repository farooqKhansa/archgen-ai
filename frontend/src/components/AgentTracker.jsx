import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, Zap } from 'lucide-react';

export default function AgentTracker({ agents }) {
  const [activeAgents, setActiveAgents] = useState([]);

  useEffect(() => {
    agents.forEach((agent, index) => {
      setTimeout(() => {
        setActiveAgents(prev => [...prev, agent.id]);
      }, index * 1500);
    });
  }, [agents]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'text-green-400';
      case 'running':
        return 'text-accent-blue';
      case 'pending':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (agentId, status) => {
    const isActive = activeAgents.includes(agentId);

    if (!isActive) {
      return (
        <span className="px-3 py-1 bg-gray-700/50 text-gray-400 text-sm rounded-full flex items-center gap-1">
          <Clock size={14} /> Pending
        </span>
      );
    }

    return (
      <span className="px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full flex items-center gap-1">
        <CheckCircle size={14} /> Complete
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Agent Progress Tracker</h2>
      
      <div className="space-y-3">
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            className={`transform transition-all duration-500 ${
              activeAgents.includes(agent.id)
                ? 'translate-x-0 opacity-100'
                : '-translate-x-4 opacity-0'
            }`}
          >
            <div className="bg-dark-card border border-gray-700 rounded-lg p-4 hover:border-accent-blue/50 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center text-accent-blue font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm ml-11">{agent.description}</p>
                </div>

                <div>
                  {activeAgents.includes(agent.id) && (
                    <div className="flex items-center gap-2">
                      {activeAgents[activeAgents.length - 1] === agent.id ? (
                        <div className="animate-spin">
                          <Zap size={18} className="text-accent-blue" />
                        </div>
                      ) : null}
                      {getStatusBadge(agent.id, agent.status)}
                    </div>
                  )}
                </div>
              </div>

              {index < agents.length - 1 && (
                <div className="ml-4 mt-3 h-8 border-l border-gray-600 relative">
                  {activeAgents.includes(agents[index + 1].id) && (
                    <div className="absolute left-0 top-0 h-full border-l-2 border-accent-blue/50 animate-pulse" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
