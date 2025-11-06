import { useEffect, useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from 'reactflow';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';
import 'reactflow/dist/style.css';

// client-only page: ReactFlow must render in browser, not during SSR
export default function GraphPage() {
  const { t } = useTranslation();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:3000/api/graph');
        const graph = await res.json();
        // create simple positions so nodes don't overlap too much
        const createdNodes = graph.nodes.map((n, i) => ({
          id: n.id,
          data: { label: n.label },
          position: { x: 200 * (i % 4), y: 120 * Math.floor(i / 4) },
          draggable: true
        }));
        const createdEdges = graph.edges.map((e, i) => ({
          id: `e${i}`,
          source: e.from,
          target: e.to,
          label: e.label,
          animated: false
        }));
        setNodes(createdNodes);
        setEdges(createdEdges);
      } catch (err) {
        console.error('Failed to load graph:', err);
        setNodes([]);
        setEdges([]);
      }
    }

    // run only on client
    if (typeof window !== 'undefined') load();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <header style={{ 
        padding: '20px 24px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ 
          margin: 0,
          color: 'white',
          fontSize: '24px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          🔗 {t('pages.graph.title')}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LanguageSwitcher variant="graph" />
          <a 
            href="/"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ← {t('common.backToHome')}
          </a>
        </div>
      </header>

      <div style={{ height: 'calc(100vh - 80px)', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          style={{
            background: 'transparent'
          }}
        >
          <MiniMap 
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '8px'
            }}
          />
          <Controls 
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '8px'
            }}
          />
          <Background color="#cbd5e0" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}