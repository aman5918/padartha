import React, { useState, useEffect, useRef } from 'react';
import { Network, ZoomIn, ZoomOut, RotateCcw, Filter, Eye, Sparkles, Layers, Info } from 'lucide-react';

export default function TabKnowledgeGraph({ graphData, onNodeSelect, selectedEntityId }) {
  const canvasRef = useRef(null);
  const [filterGroup, setFilterGroup] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Node positions map for simulation
  const [nodePositions, setNodePositions] = useState({});

  useEffect(() => {
    if (!graphData || !graphData.nodes) return;

    // Arrange nodes in hierarchical concentric rings
    const positions = {};
    const width = 800;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    // Center Root
    positions['root-padartha'] = { x: centerX, y: 60, vx: 0, vy: 0 };
    positions['realm-bhava'] = { x: centerX - 180, y: 140, vx: 0, vy: 0 };
    positions['realm-abhava'] = { x: centerX + 180, y: 140, vx: 0, vy: 0 };

    // Categories
    const catKeys = ['cat-dravya', 'cat-guna', 'cat-karma', 'cat-samanya', 'cat-visesha', 'cat-samavaya'];
    catKeys.forEach((key, idx) => {
      const angle = Math.PI * 0.8 + (idx / (catKeys.length - 1)) * Math.PI * 0.8;
      positions[key] = {
        x: centerX - 260 + idx * 85,
        y: 230 + (idx % 2 === 0 ? 0 : 25),
        vx: 0,
        vy: 0
      };
    });

    // Abhava types
    ['abhava-0', 'abhava-1', 'abhava-2', 'abhava-3'].forEach((k, idx) => {
      positions[k] = {
        x: centerX + 120 + idx * 75,
        y: 230 + (idx % 2 === 0 ? 0 : 25),
        vx: 0,
        vy: 0
      };
    });

    // Dravya Classes
    const classKeys = ['class-Pṛthvī', 'class-Jala', 'class-Tejas', 'class-Vāyu', 'class-Ākāśa', 'class-Kāla', 'class-Diś', 'class-Ātman', 'class-Manas'];
    classKeys.forEach((k, idx) => {
      positions[k] = {
        x: 60 + idx * 80,
        y: 330 + (idx % 2 === 0 ? 0 : 30),
        vx: 0,
        vy: 0
      };
    });

    // Entities & Gunas
    const otherNodes = graphData.nodes.filter(n => !positions[n.id]);
    otherNodes.forEach((node, idx) => {
      const angle = (idx / Math.max(1, otherNodes.length)) * Math.PI * 2;
      const radius = 220 + (idx % 3) * 50;
      positions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + 80 + Math.sin(angle) * (radius * 0.5),
        vx: 0,
        vy: 0
      };
    });

    setNodePositions(positions);
  }, [graphData]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !graphData || !nodePositions) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoomLevel, zoomLevel);

    // Filter nodes
    const visibleNodes = graphData.nodes.filter(n => {
      if (filterGroup !== 'all' && n.group !== filterGroup) return false;
      if (searchTerm && !n.label.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

    // Draw Edges
    (graphData.edges || []).forEach(edge => {
      if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) return;
      const p1 = nodePositions[edge.from];
      const p2 = nodePositions[edge.to];
      if (!p1 || !p2) return;

      ctx.beginPath();
      ctx.strokeStyle = edge.dashes ? '#ef4444' : (edge.color?.color || '#334155');
      ctx.lineWidth = edge.dashes ? 1.5 : 1.2;
      if (edge.dashes) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // Edge label
      if (edge.label && zoomLevel >= 0.9) {
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(edge.label, midX - 20, midY - 3);
      }
    });

    ctx.setLineDash([]);

    // Draw Nodes
    visibleNodes.forEach(node => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      const isSelected = selectedNode?.id === node.id;
      const isEntityMatch = node.id === `entity-${selectedEntityId}`;

      // Node Outer Glow / Highlight
      if (isSelected || isEntityMatch) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Node Circle
      ctx.beginPath();
      const radius = node.group === 'root' ? 18 : node.group === 'entityInstance' ? 14 : 11;
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color || '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Node Label
      ctx.font = `${node.group === 'root' ? 'bold 12px' : '10px'} Inter, sans-serif`;
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      const labelFirstLine = node.label.split('\n')[0];
      ctx.fillText(labelFirstLine, pos.x, pos.y + radius + 12);
    });

    ctx.restore();
  }, [graphData, nodePositions, filterGroup, searchTerm, selectedNode, zoomLevel, panOffset, selectedEntityId]);

  // Handle canvas click to select node
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const clickY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    const clicked = graphData?.nodes?.find(n => {
      const pos = nodePositions[n.id];
      if (!pos) return false;
      const dist = Math.hypot(pos.x - clickX, pos.y - clickY);
      return dist <= 20;
    });

    if (clicked) {
      setSelectedNode(clicked);
      if (onNodeSelect) onNodeSelect(clicked);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-serif">Nyāya Ontological Knowledge Graph</h3>
            <p className="text-[11px] text-slate-400">Subject-Predicate-Object Triples & Inherence Edges</p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            >
              <option value="all">All Graph Nodes</option>
              <option value="dravyaClass">9 Dravya Classes</option>
              <option value="entityInstance">Viśeṣa Entities</option>
              <option value="gunaNode">Inherent Guṇas</option>
              <option value="karmaNode">Karmas (Actions)</option>
              <option value="abhavaType">4 Abhāva Negations</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search graph nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500 w-44"
          />

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 2.2))}
              className="p-1 hover:bg-slate-800 text-slate-300 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.5))}
              className="p-1 hover:bg-slate-800 text-slate-300 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
              className="p-1 hover:bg-slate-800 text-slate-300 rounded"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Canvas Area */}
        <div className="lg:col-span-8 glass-panel rounded-2xl border border-slate-800 overflow-hidden relative bg-slate-950 min-h-[500px]">
          <canvas
            ref={canvasRef}
            width={850}
            height={550}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-xl text-[10px] space-y-1 text-slate-300 pointer-events-none">
            <div className="font-bold text-slate-400 mb-1">Graph Legend:</div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
              <span>Root Padārtha</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span>
              <span>Dravya Class</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]"></span>
              <span>Viśeṣa Entity</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]"></span>
              <span>Guṇa (Quality)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]"></span>
              <span>Karma (Action)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
              <span>Abhāva (Negation)</span>
            </div>
          </div>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-amber-400 border-b border-slate-800 pb-3 font-serif">
              <Eye className="w-4 h-4" />
              <span>Ontological Node Inspector</span>
            </div>

            {selectedNode ? (
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Node Identifier:</div>
                  <div className="font-mono text-sm text-teal-400 font-bold">{selectedNode.id}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Sanskrit & English Label:</div>
                  <div className="text-sm font-bold text-white whitespace-pre-line">{selectedNode.label}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs text-slate-400">Ontological Category Group:</div>
                  <div className="text-xs font-semibold text-amber-300 uppercase tracking-wide mt-0.5">
                    {selectedNode.group}
                  </div>
                </div>

                {selectedNode.title && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-xs text-slate-400">Definition / Semantic Role:</div>
                    <div className="text-xs text-slate-300 mt-1">{selectedNode.title}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 text-center text-slate-500 text-xs py-8">
                <Info className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <span>Click any node in the graph viewport to inspect its axiomatic properties and relations.</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            {graphData?.stats ? (
              <span>Nodes: {graphData.stats.totalNodes} | Edges: {graphData.stats.totalEdges} | Triples: {graphData.stats.totalEdges}</span>
            ) : (
              <span>Loading Knowledge Graph...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
