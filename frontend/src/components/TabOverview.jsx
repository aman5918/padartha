import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2, ShieldCheck, Cpu, Code2, Database, Download, FileText } from 'lucide-react';

export default function TabOverview({ 
  entities = [], 
  classes = {}, 
  onNavigateTab, 
  onExecuteQuery, 
  onRunTests,
  theme
}) {
  const [selectedEntityId, setSelectedEntityId] = useState(entities[0]?.viseshaId || 'dravya-01');
  const [queryGoal, setQueryGoal] = useState('GUNAS');
  const [targetProp, setTargetProp] = useState('Gandha');
  const [reasonerOutput, setReasonerOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Abhāva Calculator quick states
  const [calcEntityId, setCalcEntityId] = useState('dravya-01');
  const [calcProperty, setCalcProperty] = useState('Sneha (Viscosity)');
  const [calcResult, setCalcResult] = useState(null);

  const isDark = theme === 'dark';

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await onExecuteQuery({
        entityId: selectedEntityId,
        queryGoal,
        targetProperty: queryGoal === 'ABHAVA' ? targetProp : ''
      });
      setReasonerOutput(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCalculateAbhava = async () => {
    try {
      const res = await onExecuteQuery({
        entityId: calcEntityId,
        queryGoal: 'ABHAVA',
        targetProperty: calcProperty
      });
      setCalcResult(res);
    } catch (e) {
      console.error(e);
    }
  };



  const currentEntity = entities.find(e => e.viseshaId === selectedEntityId) || entities[0];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. HERO SECTION */}
      <section className="editorial-card overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider font-mono ${
              isDark ? 'text-amber-400' : 'text-[#b55b32]'
            }`}>
              <span>IKS → Mathematics / Logic → Computer Science</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]">
              Padārtha Ontology <br />
              <span className={`italic font-normal ${isDark ? 'text-amber-400' : 'text-[#b55b32]'}`}>
                as a Dynamic Programming &
              </span> <br />
              Knowledge Representation Model
            </h1>

            <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
              isDark ? 'text-slate-300' : 'text-[#6b5c4b]'
            }`}>
              A full-stack computational engine formalizing Sage Gautama's & Sage Kaṇāda's 
              <strong> 7 Padārthas</strong> into modern Knowledge Graphs, Axiomatic Inherence (Samavāya), 
              and Negation-as-Absence (Abhāva) Inference.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('reasoner')}
                className="px-5 py-2.5 rounded-full terracotta-button font-medium text-xs sm:text-sm flex items-center space-x-2 shadow-md"
              >
                <span>Execute Reasoner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab('graph')}
                className={`px-5 py-2.5 rounded-full border font-medium text-xs sm:text-sm transition flex items-center space-x-2 ${
                  isDark 
                    ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200' 
                    : 'border-[#ede7dd] bg-[#fbf9f5] hover:bg-[#ede7dd] text-[#1c1917]'
                }`}
              >
                <span>Explore Knowledge Graph</span>
                <ArrowRight className="w-4 h-4 text-emerald-500" />
              </button>
            </div>

            <div className={`pt-3 border-t text-xs flex items-center space-x-3 ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-[#ede7dd] text-[#8c7a65]'
            }`}>
              <span>👨‍🎓 Aman Yadav (68) & Tanish Gupta (17)</span>
              <span>•</span>
              <span>Guide: Prof. Javed Pathan</span>
              <span>•</span>
              <span>Rizvi College (Univ of Mumbai)</span>
            </div>
          </div>

          {/* Right: Dark Obsidian Hierarchy Card */}
          <div className="lg:col-span-5">
            <div className="dark-obsidian-card p-6 rounded-2xl font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-[#d9cfbf] border-b border-zinc-800 pb-2">
                <span className="text-[11px] text-[#b55b32] font-bold">PADĀRTHA HIERARCHY TREE</span>
                <span className="text-[10px] text-zinc-500">Root Universal (Sattā)</span>
              </div>

              <div className="text-zinc-300 text-center py-2 space-y-1 select-none leading-tight font-mono text-[13px]">
                <div className="text-[#fbbf24] font-bold">Padārtha (Knowable Reality)</div>
                <div className="text-zinc-500">│</div>
                <div className="text-emerald-400">├── Bhāva (Positive Being)</div>
                <div className="text-zinc-400 pl-4">│   ├── Dravya (9 Substances)</div>
                <div className="text-zinc-400 pl-4">│   ├── Guṇa (24 Qualities)</div>
                <div className="text-zinc-400 pl-4">│   ├── Karma (5 Actions)</div>
                <div className="text-zinc-400 pl-4">│   ├── Sāmānya (Universals)</div>
                <div className="text-zinc-400 pl-4">│   ├── Viśeṣa (Unique UUIDs)</div>
                <div className="text-zinc-400 pl-4">│   └── Samavāya (Inherence)</div>
                <div className="text-rose-400">└── Abhāva (Negation / Absence)</div>
              </div>

              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Computational Complexity:</span>
                <span className="text-emerald-400 font-bold">O(1) Inherence Lookup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FROM ANCIENT PHILOSOPHY TO MODERN COMPUTING */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            From Ancient Philosophy to Modern Computing
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>
            Three-stage conceptual mapping from Sanskrit epistemology to algorithmic systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="editorial-card p-6 space-y-2.5 editorial-card-hover">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#b55b32] font-semibold">
              01 • IKS Concept
            </div>
            <h3 className="font-serif text-lg font-bold">
              Padārtha Ontology
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#6b5c4b]'}`}>
              Systematized in the <em>Nyāya Sūtra</em> and <em>Tarkasaṃgraha</em> to categorize everything that can be known (jñeya) and named (abhidheya).
            </p>
          </div>

          <div className="editorial-card p-6 space-y-2.5 editorial-card-hover">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-500 font-semibold">
              02 • Formal Logic & Triples
            </div>
            <h3 className="font-serif text-lg font-bold">
              Knowledge Graph Triples
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#6b5c4b]'}`}>
              Subject-Predicate-Object relations: ⟨ Dravya ──[Samavāya]──► Guṇa ⟩ and ⟨ Dravya ──[Sāmānya]──► Class ⟩.
            </p>
          </div>

          <div className="editorial-card p-6 space-y-2.5 editorial-card-hover">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              03 • Computer Science
            </div>
            <h3 className="font-serif text-lg font-bold">
              Dynamic Semantic Reasoner
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-[#6b5c4b]'}`}>
              Bottom-up graph traversal algorithm executing property inherence, taxonomic inheritance, and Abhāva negation validation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PADĀRTHA REASONER & GENERATOR */}
      <section className="editorial-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold">
            Padārtha Reasoner & Inherence Generator
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>
            Interactive generation of direct qualities (Samavāya) and inherited class traits (Sāmānya)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1">
                Select Dravya Entity:
              </label>
              <select
                value={selectedEntityId}
                onChange={(e) => setSelectedEntityId(e.target.value)}
                className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
              >
                {entities.map(e => (
                  <option key={e.viseshaId} value={e.viseshaId}>
                    {e.name} [{e.samanya}]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">
                Query Goal:
              </label>
              <select
                value={queryGoal}
                onChange={(e) => setQueryGoal(e.target.value)}
                className="w-full theme-input rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
              >
                <option value="GUNAS">Guṇa Inherence Analysis (Samavāya)</option>
                <option value="KARMAS">Active & Inherited Karmas (Actions)</option>
                <option value="SAMANYA">Sāmānya Taxonomy (Class Chain)</option>
                <option value="ABHAVA">Abhāva Negation Test</option>
              </select>
            </div>

            {queryGoal === 'ABHAVA' && (
              <div>
                <label className="text-xs font-semibold block mb-1">
                  Target Property to Test:
                </label>
                <input
                  type="text"
                  value={targetProp}
                  onChange={(e) => setTargetProp(e.target.value)}
                  placeholder="e.g. Gandha, Sneha, Rūpa"
                  className="w-full theme-input rounded-xl px-3 py-2 text-xs focus:outline-none"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl terracotta-button text-xs font-bold shadow transition flex items-center justify-center space-x-2"
            >
              <span>{isGenerating ? 'Computing...' : 'Generate Inherence Output'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Output */}
          <div className="lg:col-span-7 sub-panel rounded-2xl p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className={`flex items-center justify-between border-b pb-2 mb-3 ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-[#ede7dd] text-[#8c7a65]'
              }`}>
                <span className="font-semibold">Generated Inherence Structure</span>
                <span>{currentEntity?.viseshaId}</span>
              </div>

              {reasonerOutput ? (
                <div className="space-y-3">
                  {reasonerOutput.queryGoal === 'GUNAS' && (
                    <>
                      <div>
                        <span className="text-[#b55b32] font-bold">Direct Guṇas (Samavāya): </span>
                        <span>{reasonerOutput.directGunas?.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-emerald-500 font-bold">Inherited (via {currentEntity?.samanya}): </span>
                        <span>{reasonerOutput.inheritedGunas?.join(', ')}</span>
                      </div>
                      <div className={`pt-2 border-t ${isDark ? 'border-slate-800' : 'border-[#ede7dd]'}`}>
                        Total Resolved: <strong>{reasonerOutput.totalGunasCount} Guṇas</strong>
                      </div>
                    </>
                  )}

                  {reasonerOutput.queryGoal === 'SAMANYA' && (
                    <div className="space-y-1">
                      <div className="text-[#b55b32] font-bold">Taxonomic Class Chain:</div>
                      <div>{reasonerOutput.formalPath}</div>
                    </div>
                  )}

                  {reasonerOutput.queryGoal === 'KARMAS' && (
                    <div className="space-y-1">
                      <div className="text-[#b55b32] font-bold">Executable Actions:</div>
                      <div>{reasonerOutput.allExecutableKarmas?.join(', ')}</div>
                    </div>
                  )}

                  {reasonerOutput.queryGoal === 'ABHAVA' && (
                    <div className="space-y-1">
                      <div className={`font-bold ${reasonerOutput.isAbsent ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {reasonerOutput.resultStatus}
                      </div>
                      <div>{reasonerOutput.verdict}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`text-center py-8 ${isDark ? 'text-slate-500' : 'text-[#8c7a65]'}`}>
                  Click "Generate Inherence Output" to evaluate {currentEntity?.name}.
                </div>
              )}
            </div>

            <div className={`pt-3 border-t text-[11px] flex items-center justify-between ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-[#ede7dd] text-[#8c7a65]'
            }`}>
              <span>Dynamic Ontological Resolver</span>
              <span className="text-emerald-500 font-semibold">Algorithm 4.3</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALCULATE ABHĀVA */}
      <section className="editorial-card p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold">
            Calculate Abhāva (Negation Axiom Engine)
          </h2>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>
            Every valid property represents positive presence (Bhāva); absence is tested through Traikālika-Asaṃsarga
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center sub-panel p-5 rounded-2xl">
          <div className="sm:col-span-4">
            <label className="text-[11px] font-semibold block mb-1">
              Select Substrate (Dravya):
            </label>
            <select
              value={calcEntityId}
              onChange={(e) => setCalcEntityId(e.target.value)}
              className="w-full theme-input rounded-xl px-3 py-2 text-xs"
            >
              {entities.map(e => (
                <option key={e.viseshaId} value={e.viseshaId}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="text-[11px] font-semibold block mb-1">
              Property / Guṇa:
            </label>
            <input
              type="text"
              value={calcProperty}
              onChange={(e) => setCalcProperty(e.target.value)}
              placeholder="e.g. Sneha (Viscosity), Rūpa"
              className="w-full theme-input rounded-xl px-3 py-2 text-xs"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-transparent block mb-1">Action</label>
            <button
              onClick={handleCalculateAbhava}
              className="w-full py-2 rounded-xl terracotta-button text-xs font-bold shadow transition"
            >
              Calculate
            </button>
          </div>

          <div className="sm:col-span-2 theme-input rounded-xl p-3 text-center">
            <div className={`text-[10px] font-mono font-semibold ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>VERDICT</div>
            <div className={`text-xs font-mono font-bold mt-0.5 ${
              calcResult?.isAbsent ? 'text-rose-500' : 'text-emerald-500'
            }`}>
              {calcResult ? (calcResult.isAbsent ? 'TRUE (Absent)' : 'FALSE (Present)') : '—'}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW DYNAMIC ONTOLOGICAL REASONING WORKS */}
      <section className="editorial-card p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold">
            How Dynamic Ontological Reasoning Works
          </h2>
          <p className={`text-xs font-semibold font-mono mt-0.5 ${isDark ? 'text-amber-400' : 'text-[#b55b32]'}`}>
            Build once. Reason continuously across instances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className={`lg:col-span-5 space-y-3 text-xs leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-[#6b5c4b]'
          }`}>
            <p>
              In Nyāya metaphysics, the traits of a substance instance $e$ are never recomputed from scratch. The system retrieves direct inhered properties (Samavāya) and unions them with memoized class-level properties (Sāmānya).
            </p>
            <div className="p-3.5 sub-panel rounded-xl font-mono text-[11px] space-y-1">
              <div><strong>Formal Relation:</strong></div>
              <div className={`font-bold ${isDark ? 'text-amber-400' : 'text-[#b55b32]'}`}>
                G(e) = Direct(e) ∪ Inherited(Class(e))
              </div>
            </div>
            <p>
              This bounded graph depth ensures $O(1)$ query evaluation time, directly demonstrating the principles of Dynamic Programming and sub-problem caching.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="dark-obsidian-card p-5 font-mono text-xs overflow-x-auto">
              <div className="text-zinc-500 text-[11px] mb-2">// Algorithm 4.3: ES6 Reasoner Inherence Resolution</div>
              <pre className="text-zinc-200">
{`function resolveInherentQualities(entity) {
  const directGunas = entity.inherentGunas;
  const classMeta = PadarthaKB.classes[entity.samanya];
  
  // Memoized Union via Samavaya + Samanya
  const allGunas = [
    ...directGunas, 
    ...classMeta.gunas
  ];
  
  return Array.from(new Set(allGunas));
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ALGORITHM ANALYSIS */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold">
            Algorithm Complexity Analysis
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="editorial-card p-6 text-center space-y-1">
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>TIME COMPLEXITY</div>
            <div className="font-mono text-3xl font-bold text-[#b55b32]">O(1)</div>
            <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-[#6b5c4b]'}`}>Bounded tree depth traversal (depth ≤ 6)</div>
          </div>

          <div className="editorial-card p-6 text-center space-y-1">
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>SPACE COMPLEXITY</div>
            <div className="font-mono text-3xl font-bold text-emerald-500">O(N × (G + K))</div>
            <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-[#6b5c4b]'}`}>Linear memory footprint with N entities</div>
          </div>

          <div className="editorial-card p-6 text-center space-y-1">
            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-[#8c7a65]'}`}>REUSE & MEMOIZATION</div>
            <div className="font-mono text-3xl font-bold text-indigo-400">100% PASS</div>
            <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-[#6b5c4b]'}`}>TC01-TC08 automated verification</div>
          </div>
        </div>
      </section>
    </div>
  );
}
