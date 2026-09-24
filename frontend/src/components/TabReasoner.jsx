import React, { useState, useEffect } from 'react';
import { Play, Sparkles, AlertCircle, CheckCircle2, XCircle, ArrowRight, Layers, Cpu, ShieldAlert } from 'lucide-react';

export default function TabReasoner({ entities = [], classes = {}, onExecuteQuery }) {
  const [selectedEntityId, setSelectedEntityId] = useState(entities[0]?.viseshaId || 'dravya-01');
  const [queryGoal, setQueryGoal] = useState('GUNAS');
  const [targetProperty, setTargetProperty] = useState('Gandha');
  const [abhavaType, setAbhavaType] = useState('Atyantābhāva');
  const [targetEntityId, setTargetEntityId] = useState('');
  const [loading, setLoading] = useState(false);
  const [reasonerResult, setReasonerResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (entities.length > 0 && !entities.some(e => e.viseshaId === selectedEntityId)) {
      setSelectedEntityId(entities[0].viseshaId);
    }
  }, [entities]);

  const handleRunQuery = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await onExecuteQuery({
        entityId: selectedEntityId,
        queryGoal,
        targetProperty: queryGoal === 'ABHAVA' ? targetProperty : '',
        abhavaType: queryGoal === 'ABHAVA' ? abhavaType : undefined,
        targetEntityId: queryGoal === 'ABHAVA' && abhavaType === 'Anyonyābhāva' ? targetEntityId : undefined
      });
      if (res && res.error) {
        setErrorMsg(res.error);
        setReasonerResult(null);
      } else {
        setReasonerResult(res);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error executing Reasoner query');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEntityId) {
      handleRunQuery();
    }
  }, [selectedEntityId, queryGoal]);

  const selectedEntity = entities.find(e => e.viseshaId === selectedEntityId) || entities[0];
  const classMeta = selectedEntity ? classes[selectedEntity.samanya] : null;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
          Padārtha Semantic Reasoner & Inference Engine
        </h2>
        <p className="text-xs text-[#8c7a65] mt-0.5">
          Algorithm 4.3: Real-time deduction of Guṇa Inherence (Samavāya), Actions (Karma), and Negation (Abhāva)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 editorial-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#ede7dd] pb-3">
            <h3 className="font-serif text-base font-bold text-[#1c1917]">1. Query Setup</h3>
            <span className="text-[11px] font-mono text-[#b55b32] font-semibold">ES6 Reasoner</span>
          </div>

          {/* Select Entity */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">Select Dravya Entity:</label>
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full bg-[#fbf9f5] border border-[#ede7dd] rounded-xl px-3.5 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#b55b32]"
            >
              {entities.map(e => (
                <option key={e.viseshaId} value={e.viseshaId}>
                  {e.name} [{e.samanya}] — ({e.viseshaId})
                </option>
              ))}
            </select>
          </div>

          {/* Query Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1c1917]">Select Reasoner Dimension:</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'GUNAS', label: 'Guṇa Inherence', sub: 'Samavāya & Sāmānya' },
                { id: 'KARMAS', label: 'Dynamic Karmas', sub: 'Active Methods' },
                { id: 'SAMANYA', label: 'Sāmānya Taxonomy', sub: 'Class Hierarchy' },
                { id: 'ABHAVA', label: 'Abhāva Engine', sub: 'Negation Proof' },
                { id: 'FULL_INSPECTION', label: 'Full 360° Profile', sub: 'All 7 Padārthas' }
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => setQueryGoal(g.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    queryGoal === g.id
                      ? 'bg-[#b55b32]/10 border-[#b55b32] text-[#b55b32] font-bold shadow-sm'
                      : 'bg-[#fbf9f5] border-[#ede7dd] text-[#6b5c4b] hover:border-[#d9cfbf]'
                  } ${g.id === 'FULL_INSPECTION' ? 'col-span-2' : ''}`}
                >
                  <div className="font-semibold text-xs">{g.label}</div>
                  <div className="text-[10px] text-[#8c7a65]">{g.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Abhāva Options */}
          {queryGoal === 'ABHAVA' && (
            <div className="p-4 rounded-xl bg-[#f5f0ea] border border-[#ede7dd] space-y-3">
              <div className="text-xs font-bold text-[#b55b32] flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Negation Axiom Type</span>
              </div>
              <select
                value={abhavaType}
                onChange={(e) => setAbhavaType(e.target.value)}
                className="w-full bg-white border border-[#ede7dd] rounded-lg px-3 py-1.5 text-xs text-[#1c1917]"
              >
                <option value="Atyantābhāva">Atyantābhāva (Absolute Inherent Absence)</option>
                <option value="Anyonyābhāva">Anyonyābhāva (Mutual Negation / Identity Difference)</option>
                <option value="Prāgabhāva">Prāgabhāva (Prior Absence before creation)</option>
                <option value="Pradhvaṃsābhāva">Pradhvaṃsābhāva (Absence after destruction)</option>
              </select>

              {abhavaType !== 'Anyonyābhāva' ? (
                <div>
                  <label className="text-[11px] font-semibold text-[#1c1917] block mb-1">Target Property:</label>
                  <input
                    type="text"
                    value={targetProperty}
                    onChange={(e) => setTargetProperty(e.target.value)}
                    placeholder="e.g. Sneha, Rūpa, Gandha"
                    className="w-full bg-white border border-[#ede7dd] rounded-lg px-3 py-1.5 text-xs text-[#1c1917]"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-semibold text-[#1c1917] block mb-1">Compare With:</label>
                  <select
                    value={targetEntityId}
                    onChange={(e) => setTargetEntityId(e.target.value)}
                    className="w-full bg-white border border-[#ede7dd] rounded-lg px-3 py-1.5 text-xs text-[#1c1917]"
                  >
                    <option value="">Select target entity...</option>
                    {entities.filter(e => e.viseshaId !== selectedEntityId).map(e => (
                      <option key={e.viseshaId} value={e.viseshaId}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleRunQuery}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl terracotta-button text-xs font-bold shadow transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Executing Reasoner...' : 'Execute Reasoner (Algo 4.3)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: Reasoner Output Card */}
        <div className="lg:col-span-7 editorial-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#ede7dd] pb-3">
              <h3 className="font-serif text-base font-bold text-[#1c1917]">Inference Engine Output</h3>
              <span className="text-xs font-mono text-[#047857] bg-[#047857]/10 px-2.5 py-0.5 rounded-full font-semibold">
                {selectedEntity?.samanya} • {selectedEntity?.viseshaId}
              </span>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {reasonerResult && !errorMsg && (
              <div className="mt-4 space-y-4 text-xs">
                {/* 1. Guṇas Output */}
                {reasonerResult.queryGoal === 'GUNAS' && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f5f0ea] rounded-xl border border-[#ede7dd] font-mono">
                      <div className="font-bold text-[#b55b32]">Model: {reasonerResult.formalFormula}</div>
                      <div className="text-[11px] text-[#6b5c4b] mt-1">{reasonerResult.explanation}</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl border border-[#ede7dd] bg-white space-y-2">
                        <div className="font-bold text-[#b55b32] flex items-center justify-between">
                          <span>Direct Guṇas (Samavāya)</span>
                          <span className="text-[10px] bg-[#b55b32]/10 text-[#b55b32] px-1.5 py-0.5 rounded font-mono">
                            {reasonerResult.directGunas.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {reasonerResult.directGunas.map((g, idx) => (
                            <span key={idx} className="bg-[#f5f0ea] text-[#1c1917] px-2 py-0.5 rounded text-[11px] border border-[#ede7dd]">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-[#ede7dd] bg-white space-y-2">
                        <div className="font-bold text-[#047857] flex items-center justify-between">
                          <span>Inherited (via {selectedEntity.samanya})</span>
                          <span className="text-[10px] bg-[#047857]/10 text-[#047857] px-1.5 py-0.5 rounded font-mono">
                            {reasonerResult.inheritedGunas.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {reasonerResult.inheritedGunas.map((g, idx) => (
                            <span key={idx} className="bg-[#f5f0ea] text-[#1c1917] px-2 py-0.5 rounded text-[11px] border border-[#ede7dd]">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-[#047857]/10 border border-[#047857]/20 rounded-xl text-[#047857] font-semibold flex items-center justify-between">
                      <span>Total Inseparable Inherent Qualities:</span>
                      <span className="font-mono font-bold">{reasonerResult.totalGunasCount} Guṇas Resolved</span>
                    </div>
                  </div>
                )}

                {/* 2. Karmas Output */}
                {reasonerResult.queryGoal === 'KARMAS' && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f5f0ea] rounded-xl border border-[#ede7dd] font-mono text-[#b55b32]">
                      Active Executable Actions: {reasonerResult.allExecutableKarmas.join(', ')}
                    </div>
                  </div>
                )}

                {/* 3. Taxonomy Output */}
                {reasonerResult.queryGoal === 'SAMANYA' && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#f5f0ea] rounded-xl border border-[#ede7dd] font-mono text-[#1c1917] font-bold">
                      {reasonerResult.formalPath}
                    </div>
                    <div className="space-y-1.5">
                      {reasonerResult.taxonomyChain.map((step, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl border border-[#ede7dd] bg-white flex items-center justify-between">
                          <span className="font-bold text-[#1c1917]">{step.node}</span>
                          <span className="text-[#8c7a65] text-[11px]">{step.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Abhāva Output */}
                {reasonerResult.queryGoal === 'ABHAVA' && (
                  <div className="space-y-3">
                    <div className={`p-4 rounded-xl border ${
                      reasonerResult.isAbsent || reasonerResult.isDifferent
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      <div className="font-bold text-sm">{reasonerResult.resultStatus}</div>
                      <div className="mt-1 text-xs">{reasonerResult.verdict || reasonerResult.conclusion}</div>
                      <div className="mt-1 text-[11px] opacity-90">{reasonerResult.deduction}</div>
                    </div>

                    {reasonerResult.reasoningPath && (
                      <div className="p-3.5 bg-[#f5f0ea] rounded-xl border border-[#ede7dd] font-mono text-[11px] text-[#6b5c4b] space-y-1">
                        <div className="font-bold text-[#1c1917] mb-1">Deductive Syllogism:</div>
                        {reasonerResult.reasoningPath.map((step, idx) => (
                          <div key={idx}>{step}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Full Inspection */}
                {reasonerResult.queryGoal === 'FULL_INSPECTION' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl border border-[#ede7dd] bg-[#f5f0ea]">
                      <div className="font-bold text-[#1c1917]">{reasonerResult.entity.name}</div>
                      <div className="text-xs text-[#6b5c4b] mt-0.5">{reasonerResult.entity.description}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#ede7dd] text-[11px] text-[#8c7a65] font-mono flex items-center justify-between">
            <span>Dynamic Ontological Resolver</span>
            <span className="text-[#047857] font-semibold">Bounded O(1) Complexity</span>
          </div>
        </div>
      </div>
    </div>
  );
}
