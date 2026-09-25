import React, { useState, useEffect } from "react";
import {
  Play,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  Cpu,
  ShieldAlert,
} from "lucide-react";
import CustomSelect from "./common/CustomSelect";

export default function TabReasoner({
  theme,
  isDark,
  entities = [],
  classes = {},
  onExecuteQuery,
}) {
  const isDarkMode = isDark !== undefined ? isDark : theme === "dark";
  const [selectedEntityId, setSelectedEntityId] = useState(
    entities[0]?.viseshaId || "dravya-01",
  );
  const [queryGoal, setQueryGoal] = useState("GUNAS");
  const [targetProperty, setTargetProperty] = useState("Gandha");
  const [abhavaType, setAbhavaType] = useState("Atyantābhāva");
  const [targetEntityId, setTargetEntityId] = useState("");
  const [loading, setLoading] = useState(false);
  const [reasonerResult, setReasonerResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (
      entities.length > 0 &&
      !entities.some((e) => e.viseshaId === selectedEntityId)
    ) {
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
        targetProperty: queryGoal === "ABHAVA" ? targetProperty : "",
        abhavaType: queryGoal === "ABHAVA" ? abhavaType : undefined,
        targetEntityId:
          queryGoal === "ABHAVA" && abhavaType === "Anyonyābhāva"
            ? targetEntityId
            : undefined,
      });
      if (res && res.error) {
        setErrorMsg(res.error);
        setReasonerResult(null);
      } else {
        setReasonerResult(res);
      }
    } catch (err) {
      setErrorMsg(err.message || "Error executing Reasoner query");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEntityId) {
      handleRunQuery();
    }
  }, [selectedEntityId, queryGoal]);

  const selectedEntity =
    entities.find((e) => e.viseshaId === selectedEntityId) || entities[0];
  const classMeta = selectedEntity ? classes[selectedEntity.samanya] : null;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Padārtha Semantic Reasoner & Inference Engine
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Algorithm 4.3: Real-time deduction of Guṇa Inherence (Samavāya),
          Actions (Karma), and Negation (Abhāva)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0C0C0E] p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.07] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              1. Query Setup
            </h3>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              ES6 Reasoner
            </span>
          </div>

          {/* Select Entity */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
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

          {/* Query Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">
              Select Reasoner Dimension:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                {
                  id: "GUNAS",
                  label: "Guṇa Inherence",
                  sub: "Samavāya & Sāmānya",
                },
                {
                  id: "KARMAS",
                  label: "Dynamic Karmas",
                  sub: "Active Methods",
                },
                {
                  id: "SAMANYA",
                  label: "Sāmānya Taxonomy",
                  sub: "Class Hierarchy",
                },
                { id: "ABHAVA", label: "Abhāva Engine", sub: "Negation Proof" },
                {
                  id: "FULL_INSPECTION",
                  label: "Full 360° Profile",
                  sub: "All 7 Padārthas",
                },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setQueryGoal(g.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    queryGoal === g.id
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-400 font-bold shadow-sm"
                      : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
                  } ${g.id === "FULL_INSPECTION" ? "col-span-2" : ""}`}
                >
                  <div className="font-semibold text-xs">{g.label}</div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-500">
                    {g.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Abhāva Options */}
          {queryGoal === "ABHAVA" && (
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Negation Axiom Type</span>
              </div>
              <CustomSelect
                value={abhavaType}
                onChange={setAbhavaType}
                size="sm"
                options={[
                  {
                    value: "Atyantābhāva",
                    label: "Atyantābhāva",
                    sublabel: "(Absolute Absence)",
                  },
                  {
                    value: "Anyonyābhāva",
                    label: "Anyonyābhāva",
                    sublabel: "(Mutual Difference)",
                  },
                  {
                    value: "Prāgabhāva",
                    label: "Prāgabhāva",
                    sublabel: "(Prior Absence)",
                  },
                  {
                    value: "Pradhvaṃsābhāva",
                    label: "Pradhvaṃsābhāva",
                    sublabel: "(Absence After Destruction)",
                  },
                ]}
              />

              {abhavaType !== "Anyonyābhāva" ? (
                <div>
                  <label className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-200 block mb-1">
                    Target Property:
                  </label>
                  <input
                    type="text"
                    value={targetProperty}
                    onChange={(e) => setTargetProperty(e.target.value)}
                    placeholder="e.g. Sneha, Rūpa, Gandha"
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-200 block mb-1">
                    Compare With:
                  </label>
                  <CustomSelect
                    value={targetEntityId}
                    onChange={setTargetEntityId}
                    size="sm"
                    placeholder="Select target entity..."
                    options={entities
                      .filter((e) => e.viseshaId !== selectedEntityId)
                      .map((e) => ({
                        value: e.viseshaId,
                        label: e.name,
                        sublabel: `[${e.samanya}]`,
                      }))}
                  />
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleRunQuery}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm shadow-indigo-900/20 hover:shadow-md transition active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <span>
              {loading
                ? "Executing Reasoner..."
                : "Execute Reasoner (Algo 4.3)"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Column: Reasoner Output Card */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0C0C0E] p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                Inference Engine Output
              </h3>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/20">
                {selectedEntity?.samanya} • {selectedEntity?.viseshaId}
              </span>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {reasonerResult && !errorMsg && (
              <div className="mt-4 space-y-4 text-xs">
                {/* 1. Guṇas Output */}
                {reasonerResult.queryGoal === "GUNAS" && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono">
                      <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        Model: {reasonerResult.formalFormula}
                      </div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
                        {reasonerResult.explanation}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                        <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
                          <span>Direct Guṇas (Samavāya)</span>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                            {reasonerResult.directGunas.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {reasonerResult.directGunas.map((g, idx) => (
                            <span
                              key={idx}
                              className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded text-[11px] border border-zinc-200 dark:border-zinc-700"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                        <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                          <span>Inherited (via {selectedEntity?.samanya})</span>
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                            {reasonerResult.inheritedGunas.length}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {reasonerResult.inheritedGunas.map((g, idx) => (
                            <span
                              key={idx}
                              className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded text-[11px] border border-zinc-200 dark:border-zinc-700"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between">
                      <span>Total Inseparable Inherent Qualities:</span>
                      <span className="font-mono font-bold">
                        {reasonerResult.totalGunasCount} Guṇas Resolved
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Karmas Output */}
                {reasonerResult.queryGoal === "KARMAS" && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-indigo-600 dark:text-indigo-400">
                      Active Executable Actions:{" "}
                      {reasonerResult.allExecutableKarmas.join(", ")}
                    </div>
                  </div>
                )}

                {/* 3. Taxonomy Output */}
                {reasonerResult.queryGoal === "SAMANYA" && (
                  <div className="space-y-3">
                    <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-zinc-900 dark:text-zinc-100 font-bold">
                      {reasonerResult.formalPath}
                    </div>
                    <div className="space-y-1.5">
                      {reasonerResult.taxonomyChain.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between"
                        >
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">
                            {step.node}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                            {step.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Abhāva Output */}
                {reasonerResult.queryGoal === "ABHAVA" && (
                  <div className="space-y-3">
                    <div
                      className={`p-4 rounded-xl border ${
                        reasonerResult.isAbsent || reasonerResult.isDifferent
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                      }`}
                    >
                      <div className="font-bold text-sm">
                        {reasonerResult.resultStatus}
                      </div>
                      <div className="mt-1 text-xs">
                        {reasonerResult.verdict || reasonerResult.conclusion}
                      </div>
                      <div className="mt-1 text-[11px] opacity-90">
                        {reasonerResult.deduction}
                      </div>
                    </div>

                    {reasonerResult.reasoningPath && (
                      <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                        <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                          Deductive Syllogism:
                        </div>
                        {reasonerResult.reasoningPath.map((step, idx) => (
                          <div key={idx}>{step}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 5. Full Inspection */}
                {reasonerResult.queryGoal === "FULL_INSPECTION" && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {reasonerResult.entity.name}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                        {reasonerResult.entity.description}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono flex items-center justify-between">
            <span>Dynamic Ontological Resolver</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
              Bounded O(1) Complexity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
