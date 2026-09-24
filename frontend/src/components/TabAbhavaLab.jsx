import React, { useState } from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, XCircle, BookOpen, Cpu, ArrowRight, HelpCircle } from 'lucide-react';

export default function TabAbhavaLab({ entities = [], abhavas = [], onExecuteAbhava }) {
  const [selectedEntityId, setSelectedEntityId] = useState(entities[0]?.viseshaId || 'dravya-01');
  const [selectedAbhavaType, setSelectedAbhavaType] = useState('Atyantābhāva');
  const [targetProperty, setTargetProperty] = useState('Sneha (Viscosity)');
  const [comparisonEntityId, setComparisonEntityId] = useState(entities[1]?.viseshaId || 'dravya-02');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestAbhava = async () => {
    setLoading(true);
    try {
      const res = await onExecuteAbhava({
        entityId: selectedEntityId,
        abhavaType: selectedAbhavaType,
        targetProperty: selectedAbhavaType === 'Anyonyābhāva' ? '' : targetProperty,
        targetEntityId: selectedAbhavaType === 'Anyonyābhāva' ? comparisonEntityId : undefined
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentEntity = entities.find(e => e.viseshaId === selectedEntityId) || entities[0];
  const comparisonEntity = entities.find(e => e.viseshaId === comparisonEntityId);

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="glass-panel p-5 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-950/20 via-slate-900 to-amber-950/20">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white font-serif">
              Abhāva Negation & Non-Being Reasoning Laboratory
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Formalizing Negation-as-Absence, Disjoint Class Axioms, and Temporal Non-Existence in Knowledge Systems
            </p>
          </div>
        </div>
      </div>

      {/* 4 Types of Abhāva Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {abhavas.map(ab => (
          <div
            key={ab.type}
            onClick={() => setSelectedAbhavaType(ab.type)}
            className={`glass-panel p-4 rounded-2xl border cursor-pointer transition ${
              selectedAbhavaType === ab.type
                ? 'bg-red-950/30 border-red-500 shadow-md shadow-red-500/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
              <span className="text-xs font-bold text-white font-serif">{ab.type}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 font-mono">
                {ab.sanskrit.split(' ')[0]}
              </span>
            </div>
            <div className="text-[11px] text-amber-300/90 font-mono italic mb-1.5">
              "{ab.definition}"
            </div>
            <p className="text-xs text-slate-300 mb-2">
              {ab.explanation}
            </p>
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-indigo-300">
              CS: {ab.csEquivalent}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Negation Lab Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Test Setup */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Cpu className="w-5 h-5 text-red-400" />
            <h4 className="text-sm font-bold text-white font-serif">Configure Negation Proof</h4>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Select Target Dravya Substrate:
            </label>
            <select
              value={selectedEntityId}
              onChange={(e) => setSelectedEntityId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
            >
              {entities.map(e => (
                <option key={e.viseshaId} value={e.viseshaId}>
                  {e.name} ({e.samanya})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Selected Abhāva Axiom Type:
            </label>
            <select
              value={selectedAbhavaType}
              onChange={(e) => setSelectedAbhavaType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
            >
              <option value="Atyantābhāva">Atyantābhāva (Absolute Inherent Absence)</option>
              <option value="Anyonyābhāva">Anyonyābhāva (Mutual Negation / Identity Difference)</option>
              <option value="Prāgabhāva">Prāgabhāva (Prior Absence before Production)</option>
              <option value="Pradhvaṃsābhāva">Pradhvaṃsābhāva (Posterior Absence after Destruction)</option>
            </select>
          </div>

          {selectedAbhavaType !== 'Anyonyābhāva' ? (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Property / Guṇa / Motion to Test for Absence:
              </label>
              <input
                type="text"
                value={targetProperty}
                onChange={(e) => setTargetProperty(e.target.value)}
                placeholder="e.g. Sneha (Viscosity), Rūpa, Gandha"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-red-500"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {[
                  { name: 'Sneha (Viscosity)', desc: 'Absent in Earth, Fire, Air' },
                  { name: 'Rūpa (Color)', desc: 'Absent in Space, Air, Mind' },
                  { name: 'Gandha (Smell)', desc: 'Absent in Water, Fire, Air' },
                  { name: 'Śabda (Sound)', desc: 'Inheres only in Space' }
                ].map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTargetProperty(item.name)}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                  >
                    {item.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Compare Distinction Against Another Entity:
              </label>
              <select
                value={comparisonEntityId}
                onChange={(e) => setComparisonEntityId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100"
              >
                {entities.filter(e => e.viseshaId !== selectedEntityId).map(e => (
                  <option key={e.viseshaId} value={e.viseshaId}>
                    {e.name} ({e.samanya})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleTestAbhava}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition flex items-center justify-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{loading ? 'Evaluating Negation...' : 'Run Abhāva Verification Proof'}</span>
          </button>
        </div>

        {/* Proof & Results Column */}
        <div className="lg:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white font-serif flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Negation Axiom Verification Output</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Formal Truth Value</span>
            </div>

            {result ? (
              <div className="mt-4 space-y-4">
                {/* Status Box */}
                <div className={`p-4 rounded-xl border ${
                  result.isAbsent || result.isDifferent
                    ? 'bg-red-950/30 border-red-500/40 text-red-200'
                    : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="flex items-center space-x-2 text-sm font-bold">
                    {result.isAbsent || result.isDifferent ? (
                      <CheckCircle2 className="w-5 h-5 text-red-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-emerald-400" />
                    )}
                    <span>{result.resultStatus}</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1.5">
                    {result.verdict || result.conclusion}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    {result.deduction}
                  </div>
                </div>

                {/* Classical Sanskrit Axiom & Syllogism */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-amber-400 font-bold">
                    Nyāya Logic Axiom:
                  </div>
                  <div className="text-xs text-amber-200 font-serif italic">
                    {result.sanskritFormula || "त्रैकालिकसंसर्गावच्छिन्नप्रतियोगिताकोऽभावोऽत्यन्ताभावः (Traikālikasaṃsargāvacchinna-pratiyogitāko 'bhāvo 'tyantābhāvaḥ)"}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Atyantābhāva denotes eternal non-existence in a substratum across all three times (past, present, and future).
                  </div>
                </div>

                {/* Deduction Trace */}
                {result.reasoningPath && (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 font-mono text-xs text-slate-300">
                    <div className="text-slate-400 font-bold mb-1">Reasoner Step Trace:</div>
                    {result.reasoningPath.map((step, idx) => (
                      <div key={idx}>{step}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 text-center text-slate-500 text-xs py-10">
                <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <span>Select an entity and property, then click "Run Abhāva Verification Proof" to observe formal Nyāya negation logic.</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            Solves Open-World vs Closed-World Semantic Negation Challenges
          </div>
        </div>
      </div>
    </div>
  );
}
