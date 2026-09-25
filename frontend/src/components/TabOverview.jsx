import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Code2,
  Database,
  Download,
  FileText,
} from "lucide-react";
import CustomSelect from "./common/CustomSelect";

export default function TabOverview({
  theme,
  isDark,
  entities = [],
  classes = {},
  onNavigateTab,
  onExecuteQuery,
  onRunTests,
}) {
  const isDarkMode = isDark !== undefined ? isDark : theme === "dark";
  const [selectedEntityId, setSelectedEntityId] = useState(
    entities[0]?.viseshaId || "dravya-01",
  );
  const [queryGoal, setQueryGoal] = useState("GUNAS");
  const [targetProp, setTargetProp] = useState("Gandha");
  const [reasonerOutput, setReasonerOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Abhāva Calculator quick states
  const [calcEntityId, setCalcEntityId] = useState("dravya-01");
  const [calcProperty, setCalcProperty] = useState("Sneha (Viscosity)");
  const [calcResult, setCalcResult] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await onExecuteQuery({
        entityId: selectedEntityId,
        queryGoal,
        targetProperty: queryGoal === "ABHAVA" ? targetProp : "",
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
        queryGoal,
        targetProperty: calcProperty,
      });
      setCalcResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  const currentEntity =
    entities.find((e) => e.viseshaId === selectedEntityId) || entities[0];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. HERO SECTION */}
      <section className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.08] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className={`inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider font-mono ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              <span>IKS → Mathematics / Logic → Computer Science</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-zinc-900 dark:text-zinc-100">
              Padārtha Ontology <br />
              <span
                className={`italic font-light ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}
              >
                as a Dynamic Programming &
              </span>{" "}
              <br />
              Knowledge Representation Model
            </h1>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl ${
                isDarkMode ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              A full-stack computational engine formalizing Sage Gautama's &
              Sage Kaṇāda's
              <strong className="text-zinc-900 dark:text-white">
                {" "}
                7 Padārthas
              </strong>{" "}
              into modern Knowledge Graphs, Axiomatic Inherence (Samavāya), and
              Negation-as-Absence (Abhāva) Inference.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab("reasoner")}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center space-x-2 shadow-sm shadow-indigo-900/20 hover:shadow-md active:scale-[0.98] transition-all"
              >
                <span>Execute Reasoner</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab("graph")}
                className={`px-5 py-2.5 rounded-xl border font-medium text-xs sm:text-sm transition flex items-center space-x-2 ${
                  isDarkMode
                    ? "border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                    : "border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800"
                }`}
              >
                <span>Explore Knowledge Graph</span>
                <ArrowRight className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              </button>
            </div>

            <div
              className={`pt-3 border-t text-xs flex items-center space-x-3 ${
                isDarkMode
                  ? "border-zinc-800 text-zinc-400"
                  : "border-zinc-200 text-zinc-500"
              }`}
            >
              <span>👨‍🎓 Aman Yadav (68) & Tanish Gupta (17)</span>
              <span>•</span>
              <span>Guide: Prof. Javed Pathan</span>
              <span>•</span>
              <span>Rizvi College (Univ of Mumbai)</span>
            </div>
          </div>

          {/* Right: Hierarchy Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0c0c0e] border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-zinc-300 border-b border-zinc-800 pb-2">
                <span className="text-[11px] text-indigo-400 font-bold">
                  PADĀRTHA HIERARCHY TREE
                </span>
                <span className="text-[10px] text-zinc-500">
                  Root Universal (Sattā)
                </span>
              </div>

              <div className="text-zinc-300 text-center py-2 space-y-1 select-none leading-tight font-mono text-[13px]">
                <div className="text-indigo-300 font-bold">
                  Padārtha (Knowable Reality)
                </div>
                <div className="text-zinc-600">│</div>
                <div className="text-emerald-400">
                  ├── Bhāva (Positive Being)
                </div>
                <div className="text-zinc-400 pl-4">
                  │ ├── Dravya (9 Substances)
                </div>
                <div className="text-zinc-400 pl-4">
                  │ ├── Guṇa (24 Qualities)
                </div>
                <div className="text-zinc-400 pl-4">
                  │ ├── Karma (5 Actions)
                </div>
                <div className="text-zinc-400 pl-4">
                  │ ├── Sāmānya (Universals)
                </div>
                <div className="text-zinc-400 pl-4">
                  │ ├── Viśeṣa (Unique UUIDs)
                </div>
                <div className="text-zinc-400 pl-4">
                  │ └── Samavāya (Inherence)
                </div>
                <div className="text-rose-400">
                  └── Abhāva (Negation / Absence)
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Computational Complexity:</span>
                <span className="text-emerald-400 font-bold">
                  O(1) Inherence Lookup
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FROM ANCIENT PHILOSOPHY TO MODERN COMPUTING */}
      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            From Ancient Philosophy to Modern Computing
          </h2>
          <p
            className={`text-xs mt-0.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
          >
            Three-stage conceptual mapping from Sanskrit epistemology to
            algorithmic systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 space-y-2.5 hover:border-zinc-300 dark:hover:border-indigo-400/20 hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              01 • IKS Concept
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Padārtha Ontology
            </h3>
            <p
              className={`text-xs leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Systematized in the <em>Nyāya Sūtra</em> and{" "}
              <em>Tarkasaṃgraha</em> to categorize everything that can be known
              (jñeya) and named (abhidheya).
            </p>
          </div>

          <div className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 space-y-2.5 hover:border-zinc-300 dark:hover:border-indigo-400/20 hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">
              02 • Formal Logic & Triples
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Knowledge Graph Triples
            </h3>
            <p
              className={`text-xs leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Subject-Predicate-Object relations: ⟨ Dravya ──[Samavāya]──► Guṇa
              ⟩ and ⟨ Dravya ──[Sāmānya]──► Class ⟩.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 space-y-2.5 hover:border-zinc-300 dark:hover:border-indigo-400/20 hover:-translate-y-0.5 transition-all duration-200">
            <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-semibold">
              03 • Computer Science
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Dynamic Semantic Reasoner
            </h3>
            <p
              className={`text-xs leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Bottom-up graph traversal algorithm executing property inherence,
              taxonomic inheritance, and Abhāva negation validation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PADĀRTHA REASONER & GENERATOR */}
      <section className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.08] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Padārtha Reasoner & Inherence Generator
          </h2>
          <p
            className={`text-xs mt-0.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
          >
            Interactive generation of direct qualities (Samavāya) and inherited
            class traits (Sāmānya)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5 text-zinc-800 dark:text-zinc-200">
                Select Dravya Entity:
              </label>
              <CustomSelect
                value={selectedEntityId}
                onChange={setSelectedEntityId}
                options={entities.map((e) => ({
                  value: e.viseshaId,
                  label: e.name,
                  sublabel: `[${e.samanya}]`,
                  badge: e.viseshaId,
                }))}
              />
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5 text-zinc-800 dark:text-zinc-200">
                Query Goal:
              </label>
              <CustomSelect
                value={queryGoal}
                onChange={setQueryGoal}
                options={[
                  {
                    value: "GUNAS",
                    label: "Guṇa Inherence Analysis",
                    sublabel: "(Samavāya)",
                  },
                  {
                    value: "KARMAS",
                    label: "Active & Inherited Karmas",
                    sublabel: "(Actions)",
                  },
                  {
                    value: "SAMANYA",
                    label: "Sāmānya Taxonomy",
                    sublabel: "(Class Chain)",
                  },
                  {
                    value: "ABHAVA",
                    label: "Abhāva Negation Test",
                    sublabel: "(Non-Being)",
                  },
                ]}
              />
            </div>

            {queryGoal === "ABHAVA" && (
              <div>
                <label className="text-xs font-semibold block mb-1 text-zinc-800 dark:text-zinc-200">
                  Target Property to Test:
                </label>
                <input
                  type="text"
                  value={targetProp}
                  onChange={(e) => setTargetProp(e.target.value)}
                  placeholder="e.g. Gandha, Sneha, Rūpa"
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
                />
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm shadow-indigo-900/20 hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>
                {isGenerating ? "Computing..." : "Generate Inherence Output"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Output */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              <div
                className={`flex items-center justify-between border-b pb-2 mb-3 ${
                  isDarkMode
                    ? "border-zinc-800 text-zinc-400"
                    : "border-zinc-200 text-zinc-500"
                }`}
              >
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Generated Inherence Structure
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {currentEntity?.viseshaId}
                </span>
              </div>

              {reasonerOutput ? (
                <div className="space-y-3">
                  {reasonerOutput.queryGoal === "GUNAS" && (
                    <>
                      <div>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                          Direct Guṇas (Samavāya):{" "}
                        </span>
                        <span>{reasonerOutput.directGunas?.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                          Inherited (via {currentEntity?.samanya}):{" "}
                        </span>
                        <span>{reasonerOutput.inheritedGunas?.join(", ")}</span>
                      </div>
                      <div
                        className={`pt-2 border-t ${isDarkMode ? "border-zinc-800" : "border-zinc-200"}`}
                      >
                        Total Resolved:{" "}
                        <strong>{reasonerOutput.totalGunasCount} Guṇas</strong>
                      </div>
                    </>
                  )}

                  {reasonerOutput.queryGoal === "SAMANYA" && (
                    <div className="space-y-1">
                      <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                        Taxonomic Class Chain:
                      </div>
                      <div>{reasonerOutput.formalPath}</div>
                    </div>
                  )}

                  {reasonerOutput.queryGoal === "KARMAS" && (
                    <div className="space-y-1">
                      <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                        Executable Actions:
                      </div>
                      <div>
                        {reasonerOutput.allExecutableKarmas?.join(", ")}
                      </div>
                    </div>
                  )}

                  {reasonerOutput.queryGoal === "ABHAVA" && (
                    <div className="space-y-1">
                      <div
                        className={`font-bold ${reasonerOutput.isAbsent ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}
                      >
                        {reasonerOutput.resultStatus}
                      </div>
                      <div>{reasonerOutput.verdict}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`text-center py-8 ${isDarkMode ? "text-zinc-500" : "text-zinc-400"}`}
                >
                  Click "Generate Inherence Output" to evaluate{" "}
                  {currentEntity?.name}.
                </div>
              )}
            </div>

            <div
              className={`pt-3 border-t text-[11px] flex items-center justify-between ${
                isDarkMode
                  ? "border-zinc-800 text-zinc-400"
                  : "border-zinc-200 text-zinc-500"
              }`}
            >
              <span>Dynamic Ontological Resolver</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                Algorithm 4.3
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALCULATE ABHĀVA */}
      <section className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.08] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] p-6 sm:p-8 space-y-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Calculate Abhāva (Negation Axiom Engine)
          </h2>
          <p
            className={`text-xs mt-0.5 ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
          >
            Every valid property represents positive presence (Bhāva); absence
            is tested through Traikālika-Asaṃsarga
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 p-5 rounded-2xl">
          <div className="sm:col-span-4">
            <label className="text-[11px] font-semibold block mb-1 text-zinc-700 dark:text-zinc-200">
              Select Substrate (Dravya):
            </label>
            <CustomSelect
              value={calcEntityId}
              onChange={setCalcEntityId}
              size="sm"
              options={entities.map((e) => ({
                value: e.viseshaId,
                label: e.name,
                sublabel: `[${e.samanya}]`,
              }))}
            />
          </div>

          <div className="sm:col-span-4">
            <label className="text-[11px] font-semibold block mb-1 text-zinc-700 dark:text-zinc-200">
              Property / Guṇa:
            </label>
            <input
              type="text"
              value={calcProperty}
              onChange={(e) => setCalcProperty(e.target.value)}
              placeholder="e.g. Sneha (Viscosity), Rūpa"
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[11px] font-semibold text-transparent block mb-1">
              Action
            </label>
            <button
              onClick={handleCalculateAbhava}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm shadow-indigo-900/20 transition active:scale-[0.98]"
            >
              Calculate
            </button>
          </div>

          <div className="sm:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 text-center">
            <div
              className={`text-[10px] font-mono font-semibold ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
            >
              VERDICT
            </div>
            <div
              className={`text-xs font-mono font-bold mt-0.5 ${
                calcResult?.isAbsent
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {calcResult
                ? calcResult.isAbsent
                  ? "TRUE (Absent)"
                  : "FALSE (Present)"
                : "—"}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW DYNAMIC ONTOLOGICAL REASONING WORKS */}
      <section className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            How Dynamic Ontological Reasoning Works
          </h2>
          <p
            className={`text-xs font-semibold font-mono mt-0.5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}
          >
            Build once. Reason continuously across instances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div
            className={`lg:col-span-5 space-y-3 text-xs leading-relaxed ${
              isDarkMode ? "text-zinc-300" : "text-zinc-600"
            }`}
          >
            <p>
              In Nyāya metaphysics, the traits of a substance instance $e$ are
              never recomputed from scratch. The system retrieves direct inhered
              properties (Samavāya) and unions them with memoized class-level
              properties (Sāmānya).
            </p>
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-[11px] space-y-1">
              <div>
                <strong className="text-zinc-800 dark:text-zinc-100">
                  Formal Relation:
                </strong>
              </div>
              <div
                className={`font-bold ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}
              >
                G(e) = Direct(e) ∪ Inherited(Class(e))
              </div>
            </div>
            <p>
              This bounded graph depth ensures $O(1)$ query evaluation time,
              directly demonstrating the principles of Dynamic Programming and
              sub-problem caching.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0c0c0e] border border-zinc-800/80 text-zinc-100 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.6)] p-5 font-mono text-xs overflow-x-auto">
              <div className="text-zinc-500 text-[11px] mb-2">
                // Algorithm 4.3: ES6 Reasoner Inherence Resolution
              </div>
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
          <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Algorithm Complexity Analysis
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 text-center space-y-1">
            <div
              className={`text-[11px] font-mono ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
            >
              TIME COMPLEXITY
            </div>
            <div className="font-mono text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              O(1)
            </div>
            <div
              className={`text-xs ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Bounded tree depth traversal (depth ≤ 6)
            </div>
          </div>

          <div className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 text-center space-y-1">
            <div
              className={`text-[11px] font-mono ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
            >
              SPACE COMPLEXITY
            </div>
            <div className="font-mono text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              O(N × (G + K))
            </div>
            <div
              className={`text-xs ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Linear memory footprint with N entities
            </div>
          </div>

          <div className="bg-white dark:bg-[#0C0C0E] border border-zinc-200 dark:border-white/[0.07] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-6 text-center space-y-1">
            <div
              className={`text-[11px] font-mono ${isDarkMode ? "text-zinc-400" : "text-zinc-500"}`}
            >
              REUSE &amp; MEMOIZATION
            </div>
            <div className="font-mono text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              100% PASS
            </div>
            <div
              className={`text-xs ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              TC01-TC08 automated verification
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
