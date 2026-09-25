import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Filter,
  Eye,
  Sparkles,
  Layers,
  Info,
  Maximize2,
} from "lucide-react";
import CustomSelect from "./common/CustomSelect";

export default function TabKnowledgeGraph({
  theme,
  isDark,
  graphData,
  onNodeSelect,
  selectedEntityId,
}) {
  const canvasRef = useRef(null);
  const [filterGroup, setFilterGroup] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isDarkMode = isDark !== undefined ? isDark : theme === "dark";

  // Node positions map for simulation
  const [nodePositions, setNodePositions] = useState({});

  useEffect(() => {
    if (!graphData || !graphData.nodes) return;

    // Arrange nodes in hierarchical concentric rings
    const positions = {};
    const width = 850;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    // Center Root
    positions["root-padartha"] = { x: centerX, y: 60, vx: 0, vy: 0 };
    positions["realm-bhava"] = { x: centerX - 180, y: 140, vx: 0, vy: 0 };
    positions["realm-abhava"] = { x: centerX + 180, y: 140, vx: 0, vy: 0 };

    // Categories
    const catKeys = [
      "cat-dravya",
      "cat-guna",
      "cat-karma",
      "cat-samanya",
      "cat-visesha",
      "cat-samavaya",
    ];
    catKeys.forEach((key, idx) => {
      positions[key] = {
        x: centerX - 260 + idx * 85,
        y: 230 + (idx % 2 === 0 ? 0 : 25),
        vx: 0,
        vy: 0,
      };
    });

    // Abhava types
    ["abhava-0", "abhava-1", "abhava-2", "abhava-3"].forEach((k, idx) => {
      positions[k] = {
        x: centerX + 120 + idx * 75,
        y: 230 + (idx % 2 === 0 ? 0 : 25),
        vx: 0,
        vy: 0,
      };
    });

    // Dravya Classes
    const classKeys = [
      "class-Pṛthvī",
      "class-Jala",
      "class-Tejas",
      "class-Vāyu",
      "class-Ākāśa",
      "class-Kāla",
      "class-Diś",
      "class-Ātman",
      "class-Manas",
    ];
    classKeys.forEach((k, idx) => {
      positions[k] = {
        x: 60 + idx * 80,
        y: 330 + (idx % 2 === 0 ? 0 : 30),
        vx: 0,
        vy: 0,
      };
    });

    // Entities & Gunas
    const otherNodes = graphData.nodes.filter((n) => !positions[n.id]);
    otherNodes.forEach((node, idx) => {
      const angle = (idx / Math.max(1, otherNodes.length)) * Math.PI * 2;
      const radius = 220 + (idx % 3) * 50;
      positions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + 80 + Math.sin(angle) * (radius * 0.5),
        vx: 0,
        vy: 0,
      };
    });

    setNodePositions(positions);
  }, [graphData]);

  // Automated Zoom-to-Fit Auto-Calc
  const handleAutoFit = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !graphData?.nodes || Object.keys(nodePositions).length === 0)
      return;

    const visibleNodes = graphData.nodes.filter(
      (n) => filterGroup === "all" || n.group === filterGroup,
    );
    if (visibleNodes.length === 0) {
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
      return;
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    for (const node of visibleNodes) {
      const pos = nodePositions[node.id];
      if (!pos) continue;
      if (pos.x < minX) minX = pos.x;
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y < minY) minY = pos.y;
      if (pos.y > maxY) maxY = pos.y;
    }

    if (!isFinite(minX) || !isFinite(maxX)) return;

    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;
    const padding = 50;
    const availableWidth = canvas.width - padding * 2;
    const availableHeight = canvas.height - padding * 2;

    const scaleX = graphWidth > 0 ? availableWidth / graphWidth : 1;
    const scaleY = graphHeight > 0 ? availableHeight / graphHeight : 1;
    const rawZoom = Math.min(scaleX, scaleY);
    const clampedZoom = Math.max(0.5, Math.min(2.2, rawZoom));

    const graphCenterX = (minX + maxX) / 2;
    const graphCenterY = (minY + maxY) / 2;

    const newPanOffset = {
      x: canvas.width / 2 - graphCenterX * clampedZoom,
      y: canvas.height / 2 - graphCenterY * clampedZoom,
    };

    setZoomLevel(clampedZoom);
    setPanOffset(newPanOffset);
  }, [graphData, filterGroup, nodePositions]);

  // Canvas Drawing with Dynamic Palette & Directional Arrowheads
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !graphData || !nodePositions) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Palette Colors according to theme
    const palette = {
      canvasBg: isDarkMode ? "#000000" : "#FAFAFA",
      nodeText: isDarkMode ? "#f4f4f5" : "#1c1917",
      edgeDefault: isDarkMode ? "#3f3f46" : "#cbd5e1",
      edgeDashed: isDarkMode ? "#f87171" : "#dc2626",
      edgeLabel: isDarkMode ? "#a1a1aa" : "#64748b",
      glowRing: "#818CF8",
      highlightOutline: isDarkMode ? "#818CF8" : "#4F46E5",
    };

    // 1. Fill Canvas Background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = palette.canvasBg;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoomLevel, zoomLevel);

    // Filter nodes by group (retains all nodes when searching, fades non-matches)
    const visibleNodes = graphData.nodes.filter((n) => {
      if (filterGroup !== "all" && n.group !== filterGroup) return false;
      return true;
    });
    const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

    const isSearchActive = !!searchTerm.trim();
    const normalizedSearch = searchTerm.trim().toLowerCase();

    // Map of matching node IDs for search highlight
    const matchingNodeIds = new Set();
    visibleNodes.forEach((node) => {
      if (
        !isSearchActive ||
        node.label.toLowerCase().includes(normalizedSearch)
      ) {
        matchingNodeIds.add(node.id);
      }
    });

    // 2. Draw Edges with Directional Triple Arrowheads
    (graphData.edges || []).forEach((edge) => {
      if (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to))
        return;
      const p1 = nodePositions[edge.from];
      const p2 = nodePositions[edge.to];
      if (!p1 || !p2) return;

      const toNode = visibleNodes.find((n) => n.id === edge.to);
      const targetRadius =
        toNode?.group === "root"
          ? 18
          : toNode?.group === "entityInstance"
            ? 14
            : 11;

      const isConnectedToMatch =
        matchingNodeIds.has(edge.from) && matchingNodeIds.has(edge.to);
      ctx.globalAlpha = isSearchActive
        ? isConnectedToMatch
          ? 0.95
          : 0.2
        : 0.85;

      const edgeColor = edge.dashes
        ? palette.edgeDashed
        : edge.color?.color || palette.edgeDefault;

      // Line Angle via Math.atan2
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

      // Arrowhead dimensions
      const arrowLength = 9;
      const arrowWidth = 5;
      const tipX = p2.x - targetRadius * Math.cos(angle);
      const tipY = p2.y - targetRadius * Math.sin(angle);

      // Draw Main Edge Line stopping at arrowhead base
      const baseX = tipX - arrowLength * Math.cos(angle);
      const baseY = tipY - arrowLength * Math.sin(angle);

      ctx.beginPath();
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = edge.dashes ? 1.5 : 1.2;
      if (edge.dashes) {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(baseX, baseY);
      ctx.stroke();

      // Render crisp directional arrowhead triangle before target node radius
      ctx.setLineDash([]);
      const leftX = baseX + (arrowWidth / 2) * Math.sin(angle);
      const leftY = baseY - (arrowWidth / 2) * Math.cos(angle);
      const rightX = baseX - (arrowWidth / 2) * Math.sin(angle);
      const rightY = baseY + (arrowWidth / 2) * Math.cos(angle);

      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(leftX, leftY);
      ctx.lineTo(rightX, rightY);
      ctx.closePath();
      ctx.fillStyle = edgeColor;
      ctx.fill();

      // Edge label
      if (edge.label && zoomLevel >= 0.85) {
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.font = "9px JetBrains Mono, monospace";
        ctx.fillStyle = palette.edgeLabel;
        ctx.fillText(edge.label, midX - 18, midY - 3);
      }
    });

    ctx.setLineDash([]);

    // 3. Draw Nodes with Search Highlight & Context Fade
    visibleNodes.forEach((node) => {
      const pos = nodePositions[node.id];
      if (!pos) return;

      const isSelected = selectedNode?.id === node.id;
      const isEntityMatch = node.id === `entity-${selectedEntityId}`;
      const isMatch = matchingNodeIds.has(node.id);

      // Context Fade: Fade non-matches to alpha 0.20 when search is active
      ctx.globalAlpha = isSearchActive ? (isMatch ? 1.0 : 0.2) : 1.0;

      const radius =
        node.group === "root" ? 18 : node.group === "entityInstance" ? 14 : 11;

      // Luminous pulse ring on search match
      if (isSearchActive && isMatch) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 7, 0, Math.PI * 2);
        ctx.strokeStyle = palette.glowRing;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(251, 191, 36, 0.22)";
        ctx.fill();
      }

      // Node Outer Selection Halo
      if (isSelected || isEntityMatch) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? "rgba(251, 191, 36, 0.30)"
          : "rgba(217, 119, 6, 0.25)";
        ctx.fill();
        ctx.strokeStyle = palette.highlightOutline;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Node Circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color || "#3b82f6";
      ctx.fill();
      ctx.strokeStyle = isDarkMode ? "#ffffff" : "#ffffff";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Node Label
      ctx.font = `${node.group === "root" ? "bold 12px" : "10px"} Inter, sans-serif`;
      ctx.fillStyle = palette.nodeText;
      ctx.textAlign = "center";
      const labelFirstLine = node.label.split("\n")[0];
      ctx.fillText(labelFirstLine, pos.x, pos.y + radius + 12);
    });

    ctx.globalAlpha = 1.0;
    ctx.restore();
  }, [
    graphData,
    nodePositions,
    filterGroup,
    searchTerm,
    selectedNode,
    zoomLevel,
    panOffset,
    selectedEntityId,
    isDarkMode,
  ]);

  // Handle canvas click to select node
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const clickY = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    const clicked = graphData?.nodes?.find((n) => {
      const pos = nodePositions[n.id];
      if (!pos) return false;
      const dist = Math.hypot(pos.x - clickX, pos.y - clickY);
      return dist <= 22;
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
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-white dark:bg-[#0C0C0E] p-4 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-serif">
              Nyāya Ontological Knowledge Graph
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Subject-Predicate-Object Triples & Inherence Edges
            </p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <div className="w-44">
            <CustomSelect
              value={filterGroup}
              onChange={setFilterGroup}
              size="sm"
              options={[
                { value: "all", label: "All Graph Nodes" },
                { value: "dravyaClass", label: "9 Dravya Classes" },
                { value: "entityInstance", label: "Viśeṣa Entities" },
                { value: "gunaNode", label: "Inherent Guṇas" },
                { value: "karmaNode", label: "Karmas (Actions)" },
                { value: "abhavaType", label: "4 Abhāva Negations" },
              ]}
            />
          </div>

          <input
            type="text"
            placeholder="Search graph nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors w-44"
          />

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 2.2))}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.5))}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleAutoFit}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-indigo-600 dark:text-indigo-400 rounded-lg transition"
              title="Auto-Fit Graph Bounds"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoomLevel(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg transition"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Inspector Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Canvas Area */}
        <div
          className={`lg:col-span-8 rounded-2xl border ${isDarkMode ? "bg-black border-white/[0.08]" : "bg-[#FAFAFA] border-zinc-200"} overflow-hidden relative min-h-[500px] shadow-sm`}
        >
          <canvas
            ref={canvasRef}
            width={850}
            height={550}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
          />

          {/* Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-[#09090b]/90 backdrop-blur-md border border-zinc-200 dark:border-white/[0.08] p-2.5 rounded-xl text-[10px] space-y-1 text-zinc-700 dark:text-zinc-300 pointer-events-none shadow-sm">
            <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              Graph Legend:
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f46e5]"></span>
              <span>Root Padārtha</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span>
              <span>Dravya Class</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]"></span>
              <span>Viśeṣa Entity</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>Guṇa (Quality)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]"></span>
              <span>Karma (Action)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
              <span>Abhāva (Negation)</span>
            </div>
          </div>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0C0C0E] p-5 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 border-b border-zinc-200 dark:border-zinc-800 pb-3 font-serif">
              <Eye className="w-4 h-4" />
              <span>Ontological Node Inspector</span>
            </div>

            {selectedNode ? (
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Node Identifier:
                  </div>
                  <div className="font-mono text-sm text-teal-600 dark:text-teal-400 font-bold">
                    {selectedNode.id}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Sanskrit & English Label:
                  </div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 whitespace-pre-line">
                    {selectedNode.label}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Ontological Category Group:
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide mt-0.5">
                    {selectedNode.group}
                  </div>
                </div>

                {selectedNode.title && (
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Definition / Semantic Role:
                    </div>
                    <div className="text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                      {selectedNode.title}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 text-center text-zinc-500 dark:text-zinc-500 text-xs py-8">
                <Info className="w-8 h-8 mx-auto mb-2 text-zinc-400 dark:text-zinc-600" />
                <span>
                  Click any node in the graph viewport to inspect its axiomatic
                  properties and relations.
                </span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
            {graphData?.stats ? (
              <span>
                Nodes: {graphData.stats.totalNodes} | Edges:{" "}
                {graphData.stats.totalEdges} | Triples:{" "}
                {graphData.stats.totalEdges}
              </span>
            ) : (
              <span>Loading Knowledge Graph...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
