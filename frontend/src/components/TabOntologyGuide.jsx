import React, { useState } from 'react';
import { BookOpen, Layers, Sparkles, Code2, Database, Shield, Zap, CheckCircle2 } from 'lucide-react';

export default function TabOntologyGuide({ classes = {}, gunas = [], karmas = [], abhavas = [] }) {
  const [activeSubTab, setActiveSubTab] = useState('seven-padarthas');

  const padarthaPrimitives = [
    {
      id: 'dravya',
      name: '1. Dravya (Substance / Substratum)',
      sanskrit: 'द्रव्य (Dravya)',
      sanskritDef: 'गुणाश्रयो द्रव्यम् (Guṇāśrayo dravyam) / क्रियागुणवत् समवायिकारणम्',
      csConcept: 'Entity / Class Node / Object Instance / Substratum of state',
      explanation: 'The ontological entity that serves as the substratum in which qualities (Guṇa) and actions (Karma) inhere eternally.',
      examples: '9 Dravyas: Pṛthvī (Earth), Jala (Water), Tejas (Fire), Vāyu (Air), Ākāśa (Space), Kāla (Time), Diś (Direction), Ātman (Self), Manas (Mind).'
    },
    {
      id: 'guna',
      name: '2. Guṇa (Quality / Attribute)',
      sanskrit: 'गुण (Guṇa)',
      sanskritDef: 'द्रव्याश्रय्यगुणवान् संयोगविभागेष्वकारणमनपेक्ष इति गुणलक्षणम्',
      csConcept: 'Static Attribute / Datatype Literal / Property Vector',
      explanation: 'Static qualities that inhere in substances. They do not possess independent qualities of their own and cannot initiate motion independently.',
      examples: '24 canonical Guṇas including Rūpa (Color), Rasa (Taste), Gandha (Smell), Sparśa (Touch), Gurutva (Weight), Sneha (Viscosity), Buddhi (Cognition).'
    },
    {
      id: 'karma',
      name: '3. Karma (Action / Dynamic Motion)',
      sanskrit: 'कर्म (Karma)',
      sanskritDef: 'एकद्रव्यमगुणं संयोगविभागेष्वनपेक्षकारणं कर्म',
      csConcept: 'Dynamic Method / State Transition / Behavioral Function',
      explanation: 'Dynamic physical or cognitive actions causing spatial conjunction and disjunction in finite substances.',
      examples: '5 Actions: Utkṣepaṇa (Upward), Avakṣepaṇa (Downward), Ākuñcana (Contraction), Prasāraṇa (Expansion), Gamana (Locomotion).'
    },
    {
      id: 'samanya',
      name: '4. Sāmānya (Universal / Genus)',
      sanskrit: 'सामान्य (Sāmānya / Jāti)',
      sanskritDef: 'नित्यमेकमनेकानुगतं सामान्यम् (Nityam ekam anekānugataṁ sāmānyam)',
      csConcept: 'Class Hierarchy / Inheritance (is-a / rdfs:subClassOf)',
      explanation: 'The generic essence residing identically in multiple instances. Subsumes Parā-Jāti (Supreme Universal: Sattā / Being) and Aparā-Jāti (Subordinate Genera: Earthness, Potness).',
      examples: 'Ghaṭatva (Potness in all pots), Dravyatva (Substanceness), Sattā (Universal Existence).'
    },
    {
      id: 'visesha',
      name: '5. Viśeṣa (Particularity / Individual Distinctness)',
      sanskrit: 'विशेष (Viśeṣa)',
      sanskritDef: 'नित्यद्रव्यवृत्तयो विशेषास्त्वनन्ता एव (Nityadravyavṛttayo viśeṣās tv anantā eva)',
      csConcept: 'Primary Key / UUID / Object URI / Hash Identifier',
      explanation: 'The ultimate differentiator residing in eternal indivisible entities (such as atoms or individual souls) that guarantees individual distinctness.',
      examples: 'Unique instance IDs like dravya-01, dravya-02 preventing identity collision.'
    },
    {
      id: 'samavaya',
      name: '6. Samavāya (Inseparable Inherence)',
      sanskrit: 'समवाय (Samavāya)',
      sanskritDef: 'अयुतसिद्धयोः सम्बन्धः समवायः (Ayutasiddhayoḥ sambandhaḥ samavāyaḥ)',
      csConcept: 'Axiomatic Strong Aggregation / Non-nullable Inherent Edge / Composition',
      explanation: 'The eternal, inseparable relationship between parts and wholes, qualities and substances, actions and actors, and universals and individuals.',
      examples: 'Clay Pot ──[Samavāya]──► Red Color; Thread ──[Samavāya]──► Cloth.'
    },
    {
      id: 'abhava',
      name: '7. Abhāva (Absence / Non-Existence / Negation)',
      sanskrit: 'अभाव (Abhāva)',
      sanskritDef: 'भावभिन्नोऽभावः (Bhāvabhinno \'bhāvaḥ) — Systematic Representation of Non-Being',
      csConcept: 'Negation-as-Failure / Disjoint Class Axiom (owl:disjointWith) / Negative Constraint',
      explanation: 'The explicit ontological reality of absence, divided into 4 formal categories to solve open-world knowledge representation challenges.',
      examples: 'Prāgabhāva (Prior), Pradhvaṃsābhāva (Destruction), Atyantābhāva (Absolute), Anyonyābhāva (Mutual Difference).'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Sub navigation for Guide */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: 'seven-padarthas', label: '7 Padārthas (Root Schema)', icon: '🏛️' },
          { id: 'nine-dravyas', label: '9 Dravya Classes', icon: '⚛️' },
          { id: 'twentyfour-gunas', label: '24 Guṇas (Attributes)', icon: '💎' },
          { id: 'five-karmas', label: '5 Karmas (Actions)', icon: '⚡' },
          { id: 'cs-mapping', label: 'Chapter 3: CS Mapping Table', icon: '📊' }
        ].map(st => (
          <button
            key={st.id}
            onClick={() => setActiveSubTab(st.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
              activeSubTab === st.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>{st.icon}</span>
            <span>{st.label}</span>
          </button>
        ))}
      </div>

      {/* Subtab 1: 7 Padārthas */}
      {activeSubTab === 'seven-padarthas' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-amber-200 leading-relaxed">
            <strong>Nyāya-Vaiśeṣika Epistemology:</strong> The Padārtha ontology represents everything that is knowable (<em>jñeya</em>) and nameable (<em>abhidheya</em>). In modern Computer Science, it maps directly to Knowledge Representation formalisms, OWL/RDF ontologies, and Object-Oriented paradigms.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {padarthaPrimitives.map(pad => (
              <div key={pad.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 glass-panel-hover">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-white font-serif">{pad.name}</h4>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {pad.sanskrit}
                  </span>
                </div>
                <div className="text-xs text-amber-300/90 font-mono italic">
                  "{pad.sanskritDef}"
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-indigo-300 font-semibold">CS Mapping: </span>
                  <span className="text-slate-300 font-mono">{pad.csConcept}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pad.explanation}
                </p>
                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <strong className="text-slate-300">Examples:</strong> {pad.examples}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: 9 Dravyas */}
      {activeSubTab === 'nine-dravyas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(classes).map(k => {
              const cls = classes[k];
              return (
                <div key={k} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 glass-panel-hover">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-sm font-bold text-white font-serif">{cls.sanskritName}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                      {cls.substanceType.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-xs text-amber-400 font-semibold">{cls.englishName}</div>
                  <p className="text-xs text-slate-300">{cls.description}</p>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="text-[11px] text-amber-300 font-medium">Distinctive Guṇa:</div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                      {cls.distinctiveGuna}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <strong>Inherent Guṇas:</strong> {cls.gunas.slice(0, 3).join(', ')}...
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 3: 24 Guṇas */}
      {activeSubTab === 'twentyfour-gunas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gunas.map(g => (
              <div key={g.id} className="glass-panel p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 font-serif">{g.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {g.id}
                  </span>
                </div>
                <div className="text-xs text-white font-medium">{g.english}</div>
                <div className="text-[11px] text-slate-400">
                  <span className="text-purple-300 font-medium">{g.type}</span> • Applies to: {g.appliesTo.join(', ')}
                </div>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400">
                  CS: {g.csType}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: 5 Karmas */}
      {activeSubTab === 'five-karmas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {karmas.map(k => (
              <div key={k.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-rose-400 font-serif">{k.name}</h4>
                  <span className="text-xs font-mono text-slate-400">{k.id}</span>
                </div>
                <div className="text-xs font-semibold text-slate-200">{k.english}</div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-indigo-300 font-mono">
                  Method Mapping: {k.csMapping}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 5: Chapter 3 Mapping Table */}
      {activeSubTab === 'cs-mapping' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 overflow-x-auto">
          <h4 className="text-sm font-bold text-white font-serif mb-4 flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Chapter 3: Traditional IKS to Modern Computer Science Ontological Mapping</span>
          </h4>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-amber-400 font-mono">
                <th className="p-3">IKS / Traditional Concept</th>
                <th className="p-3">Philosophical Meaning</th>
                <th className="p-3">Computer Science Concept</th>
                <th className="p-3">Implementation in Project</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="p-3 font-bold text-white">Padārtha</td>
                <td className="p-3">Category of knowable reality</td>
                <td className="p-3 text-indigo-300 font-mono">Ontological Primitive / Base Class</td>
                <td className="p-3 font-mono text-emerald-400">Root Schema Object</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Dravya</td>
                <td className="p-3">Substance / Substratum</td>
                <td className="p-3 text-indigo-300 font-mono">Entity / Node / Object Instance</td>
                <td className="p-3 font-mono text-emerald-400">Node Object with ID & Class</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Guṇa</td>
                <td className="p-3">Inherent static quality</td>
                <td className="p-3 text-indigo-300 font-mono">Attribute / Datatype Property</td>
                <td className="p-3 font-mono text-emerald-400">Attribute Array</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Karma</td>
                <td className="p-3">Dynamic motion / action</td>
                <td className="p-3 text-indigo-300 font-mono">Method / State Transition</td>
                <td className="p-3 font-mono text-emerald-400">Action Array</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Sāmānya</td>
                <td className="p-3">Universal / Genus</td>
                <td className="p-3 text-indigo-300 font-mono">Class Hierarchy (is-a)</td>
                <td className="p-3 font-mono text-emerald-400">Taxonomy Parent Link</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Viśeṣa</td>
                <td className="p-3">Ultimate particularity</td>
                <td className="p-3 text-indigo-300 font-mono">Unique ID / URI / UUID</td>
                <td className="p-3 font-mono text-emerald-400">Primary Key viseshaId</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Samavāya</td>
                <td className="p-3">Inseparable inherence</td>
                <td className="p-3 text-indigo-300 font-mono">Axiomatic Relation / Strong Aggregation</td>
                <td className="p-3 font-mono text-emerald-400">Inherence Link Table</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Abhāva</td>
                <td className="p-3">Absence / Non-existence</td>
                <td className="p-3 text-indigo-300 font-mono">Negation Axiom / Disjointness</td>
                <td className="p-3 font-mono text-emerald-400">Absence Evaluator</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
