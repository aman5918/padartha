import React, { useState } from "react";
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Cpu,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import CustomSelect from "./common/CustomSelect";

export default function TabAbhavaLab({
  theme,
  isDark,
  entities = [],
  abhavas = [],
  onExecuteAbhava,
}) {
  const isDarkMode = isDark !== undefined ? isDark : theme === "dark";
  const [selectedEntityId, setSelectedEntityId] = useState(
    entities[0]?.viseshaId || "dravya-01",
  );
  const [selectedAbhavaType, setSelectedAbhavaType] = useState("Atyantābhāva");
  const [targetProperty, setTargetProperty] = useState("Sneha (Viscosity)");
  const [comparisonEntityId, setComparisonEntityId] = useState(
    entities[1]?.viseshaId || "dravya-02",
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTestAbhava = async () => {
    setLoading(true);
    try {
      const res = await onExecuteAbhava({
        entityId: selectedEntityId,
        abhavaType: selectedAbhavaType,
        targetProperty:
          selectedAbhavaType === "Anyonyābhāva" ? "" : targetProperty,
        targetEntityId:
          selectedAbhavaType === "Anyonyābhāva"
            ? comparisonEntityId
            : undefined,
      });
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentEntity =
    entities.find((e) => e.viseshaId === selectedEntityId) || entities[0];
  const comparisonEntity = entities.find(
    (e) => e.viseshaId === comparisonEntityId,
  );

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-5 rounded-2xl border border-rose-500/20 bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-indigo-500/10 dark:from-rose-950/30 dark:via-zinc-950/80 dark:to-indigo-950/30 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-serif">
              Abhāva Negation & Non-Being Reasoning Laboratory
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
              Formalizing Negation-as-Absence, Disjoint Class Axioms, and
              Temporal Non-Existence in Knowledge Systems
            </p>
          </div>
        </div>
      </div>

      {/* 4 Types of Abhāva Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {abhavas.map((ab) => (
          <div
            key={ab.type}
            onClick={() => setSelectedAbhavaType(ab.type)}
            className={`p-4 rounded-2xl border cursor-pointer transition ${
              selectedAbhavaType === ab.type
                ? "bg-rose-500/10 dark:bg-rose-950/40 border-rose-500 shadow-sm shadow-rose-500/10"
                : "bg-white dark:bg-[#0C0C0E] border-zinc-200 dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2">
              <span className="text-xs font-bold text-zinc-900 dark:text-white font-serif">
                {ab.type}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 font-mono font-medium">
                {ab.sanskrit.split(" ")[0]}
              </span>
            </div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono italic mb-1.5">
              "{ab.definition}"
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-2 leading-relaxed">
              {ab.explanation}
            </p>
            <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-indigo-700 dark:text-indigo-300">
              CS: {ab.csEquivalent}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Negation Lab Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Test Setup */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0C0C0E] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-4">
          <div className="flex items-center space-x-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <Cpu className="w-5 h-5 text-rose-500 dark:text-rose-400" />
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-serif">
              Configure Negation Proof
            </h4>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Select Target Dravya Substrate:
            </label>
            <CustomSelect
              value={selectedEntityId}
              onChange={setSelectedEntityId}
              options={entities.map((e) => ({
                value: e.viseshaId,
                label: e.name,
                sublabel: `(${e.samanya})`,
                badge: e.viseshaId,
              }))}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
              Selected Abhāva Axiom Type:
            </label>
            <CustomSelect
              value={selectedAbhavaType}
              onChange={setSelectedAbhavaType}
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
                  sublabel: "(Posterior Absence)",
                },
              ]}
            />
          </div>

          {selectedAbhavaType !== "Anyonyābhāva" ? (
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                Property / Guṇa / Motion to Test for Absence:
              </label>
              <input
                type="text"
                value={targetProperty}
                onChange={(e) => setTargetProperty(e.target.value)}
                placeholder="e.g. Sneha (Viscosity), Rūpa, Gandha"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {[
                  {
                    name: "Sneha (Viscosity)",
                    desc: "Absent in Earth, Fire, Air",
                  },
                  { name: "Rūpa (Color)", desc: "Absent in Space, Air, Mind" },
                  {
                    name: "Gandha (Smell)",
                    desc: "Absent in Water, Fire, Air",
                  },
                  { name: "Śabda (Sound)", desc: "Inheres only in Space" },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setTargetProperty(item.name)}
                    className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition"
                  >
                    {item.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
                Compare Distinction Against Another Entity:
              </label>
              <CustomSelect
                value={comparisonEntityId}
                onChange={setComparisonEntityId}
                options={entities
                  .filter((e) => e.viseshaId !== selectedEntityId)
                  .map((e) => ({
                    value: e.viseshaId,
                    label: e.name,
                    sublabel: `(${e.samanya})`,
                  }))}
              />
            </div>
          )}

          <button
            onClick={handleTestAbhava}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-xs shadow-md shadow-rose-700/20 active:scale-[0.98] transition flex items-center justify-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>
              {loading
                ? "Evaluating Negation..."
                : "Run Abhāva Verification Proof"}
            </span>
          </button>
        </div>

        {/* Proof & Results Column */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0C0C0E] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-serif flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span>Negation Axiom Verification Output</span>
              </h4>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                Formal Truth Value
              </span>
            </div>

            {result ? (
              <div className="mt-4 space-y-4">
                {/* Status Box */}
                <div
                  className={`p-4 rounded-xl border ${
                    result.isAbsent || result.isDifferent
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200"
                  }`}
                >
                  <div className="flex items-center space-x-2 text-sm font-bold">
                    {result.isAbsent || result.isDifferent ? (
                      <CheckCircle2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <span>{result.resultStatus}</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white mt-1.5">
                    {result.verdict || result.conclusion}
                  </div>
                  <div className="text-xs text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">
                    {result.deduction}
                  </div>
                </div>

                {/* Classical Sanskrit Axiom & Syllogism */}
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    Nyāya Logic Axiom:
                  </div>
                  <div className="text-xs text-indigo-900 dark:text-indigo-200 font-serif italic">
                    {result.sanskritFormula ||
                      "त्रैकालिकसंसर्गावच्छिन्नप्रतियोगिताकोऽभावोऽत्यन्ताभावः (Traikālikasaṃsargāvacchinna-pratiyogitāko 'bhāvo 'tyantābhāvaḥ)"}
                  </div>
                  <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Atyantābhāva denotes eternal non-existence in a substratum
                    across all three times (past, present, and future).
                  </div>
                </div>

                {/* Deduction Trace */}
                {result.reasoningPath && (
                  <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-1.5 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    <div className="text-zinc-500 dark:text-zinc-400 font-bold mb-1">
                      Reasoner Step Trace:
                    </div>
                    {result.reasoningPath.map((step, idx) => (
                      <div key={idx}>{step}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 text-center text-zinc-500 dark:text-zinc-500 text-xs py-10">
                <HelpCircle className="w-8 h-8 mx-auto mb-2 text-zinc-400 dark:text-zinc-600" />
                <span>
                  Select an entity and property, then click "Run Abhāva
                  Verification Proof" to observe formal Nyāya negation logic.
                </span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-500 font-mono">
            Solves Open-World vs Closed-World Semantic Negation Challenges
          </div>
        </div>
      </div>
    </div>
  );
}
