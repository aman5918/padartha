import React from 'react';
import { Layers, Sparkles, Activity, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export default function HeroStats({ stats, activeEntitiesCount }) {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 glass-panel border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-indigo-950/40 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IKS Concept as CS Concept • Indian Knowledge Systems & AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-serif">
              Padārtha Ontology (Nyāya) as <br className="hidden sm:inline" />
              <span className="vedic-gradient-text">Knowledge Representation Model</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              A full-stack MERN computational engine that formalizes Sage Gautama's and Sage Kaṇāda's 
              <strong> 7 Padārthas</strong> into modern Graph Ontologies (OWL/RDF), Object-Oriented Taxonomy, 
              Axiomatic Inherence (Samavāya), and Negation-as-Absence (Abhāva) Inference.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center text-slate-300">
                👨‍🎓 <strong>Aman Yadav</strong> (68) & <strong>Tanish Gupta</strong> (17)
              </span>
              <span className="text-slate-600">•</span>
              <span>Guide: <strong>Prof. Javed Pathan</strong></span>
              <span className="text-slate-600">•</span>
              <span><strong>Rizvi College</strong>, University of Mumbai</span>
            </div>
          </div>

          {/* Quick Architecture Triples */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl shadow-inner font-mono text-xs space-y-2 text-slate-300 lg:w-80">
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span>Nyāya Triple Model</span>
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-emerald-400">⟨ Dravya (Subject) ⟩</div>
            <div className="text-amber-300 pl-3">├── [ Samavāya ] ──► Guṇa / Karma</div>
            <div className="text-indigo-300 pl-3">├── [ Sāmānya ] ──► Class / Genus</div>
            <div className="text-rose-400 pl-3">└── [ Abhāva ] ──► Negation Axiom</div>
          </div>
        </div>
      </div>

      {/* Metric Counters Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: '7 Padārthas', val: '6 Bhāva + 1 Abhāva', desc: 'Ontological Primitives', color: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/30', text: 'text-amber-400' },
          { label: '9 Dravya Classes', val: '5 Bhūtas + 4 Vibhu', desc: 'Substratum Types', color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/30', text: 'text-purple-400' },
          { label: '24 Guṇas', val: 'Attributes & Types', desc: 'Static Inherence', color: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/30', text: 'text-amber-300' },
          { label: '5 Karmas', val: 'Dynamic Actions', desc: 'State Transitions', color: 'from-rose-500/20 to-rose-600/5', border: 'border-rose-500/30', text: 'text-rose-400' },
          { label: '4 Abhāva Types', val: 'Negation Primitives', desc: 'Atyantābhāva & Co.', color: 'from-red-500/20 to-red-600/5', border: 'border-red-500/30', text: 'text-red-400' },
          { label: 'Active Entities', val: `${activeEntitiesCount || 6} Instances`, desc: 'Viśeṣa UUID Nodes', color: 'from-teal-500/20 to-teal-600/5', border: 'border-teal-500/30', text: 'text-teal-400' },
        ].map((item, i) => (
          <div key={i} className={`p-3.5 rounded-xl glass-panel bg-gradient-to-br ${item.color} border ${item.border}`}>
            <div className={`text-sm sm:text-base font-bold ${item.text}`}>{item.label}</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">{item.val}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
