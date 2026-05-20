import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: true, theme: 'dark', securityLevel: 'loose' });

export default function DiagramViewer({ diagram, title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && diagram) {
      containerRef.current.innerHTML = '';
      
      const svgContainer = document.createElement('div');
      svgContainer.className = 'mermaid';
      svgContainer.textContent = diagram;
      containerRef.current.appendChild(svgContainer);

      mermaid.run().catch(e => console.error('Mermaid rendering error:', e));
    }
  }, [diagram]);

  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg p-6 overflow-auto">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div
        ref={containerRef}
        className="bg-gray-900/50 rounded p-4 overflow-x-auto flex justify-center items-center min-h-96"
      />
    </div>
  );
}
