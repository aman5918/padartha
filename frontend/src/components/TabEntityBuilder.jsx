import React, { useState, useMemo } from "react";
import {
  PlusCircle,
  Sparkles,
  Trash2,
  Cpu,
  Check,
  Layers,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  Eye,
  Split,
} from "lucide-react";
import CustomSelect from "./common/CustomSelect";

export default function TabEntityBuilder({
  theme,
  isDark,
  classes = {},
  gunas = [],
  entities = [],
  onCreateEntity,
  onDeleteEntity,
  onSelectForReasoner,
}) {
  const isDarkMode = isDark !== undefined ? isDark : theme === "dark";

  const [name, setName] = useState("");
  const [samanya, setSamanya] = useState("Pṛthvī");
  const [selectedGunas, setSelectedGunas] = useState([
    "Mūrtatva (Form)",
    "Gurutva (Weight)",
  ]);
  const [customGunaInput, setCustomGunaInput] = useState("");
  const [karmas, setKarmas] = useState(["Gamana (Locomotion)"]);
  const [customKarmaInput, setCustomKarmaInput] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // One-click classical preset templates
  const presetTemplates = [
    {
      id: "suvarna",
      label: "Suvarṇa (Gold)",
      samanya: "Tejas",
      gunas: [
        "Pīta-Bhāsvara (Brilliant Yellow)",
        "Gurutva (Weight)",
        "Dravatva (Fluidity)",
      ],
      karmas: ["Dhāraṇa (Adornment)", "Vilāyana (Melting)"],
      desc: "Gold classified under Tejas due to unyielding liquidity under intense heat.",
    },
    {
      id: "ghata",
      label: "Ghaṭa (Clay Pitcher)",
      samanya: "Pṛthvī",
      gunas: [
        "Rūpa (Form/Color)",
        "Sparśa (Touch)",
        "Gandha (Smell)",
        "Gurutva (Weight)",
      ],
      karmas: ["Jalāharaṇa (Water Carrying)"],
      desc: "Classical exemplar of an artificial physical substance composed of Earth atoms.",
    },
    {
      id: "ganga-jala",
      label: "Gaṅgā Jala (Ganges Water)",
      samanya: "Jala",
      gunas: [
        "Śīta-Sparśa (Cold Touch)",
        "Dravatva (Fluidity)",
        "Sneha (Viscosity)",
        "Rasa (Taste)",
      ],
      karmas: ["Syandana (Downward Flow)"],
      desc: "Natural aquatic substrate exhibiting pure intrinsic viscosity.",
    },
    {
      id: "dipa",
      label: "Dīpa (Lamp Flame)",
      samanya: "Tejas",
      gunas: ["Uṣṇa-Sparśa (Hot Touch)", "Bhāsvara-Rūpa (Luminous Form)"],
      karmas: ["Ūrdhva-Jvalana (Upward Flaming)"],
      desc: "Luminous flame exhibiting upward radiant heat.",
    },
    {
      id: "marut",
      label: "Marut (Gale / Gust)",
      samanya: "Vāyu",
      gunas: ["Aparokṣa-Sparśa (Impalpable Touch)", "Vegavatva (Velocity)"],
      karmas: ["Tiryag-Gamana (Transverse Blowing)"],
      desc: "Atmospheric wind entity moving horizontally across space.",
    },
  ];

  const handleLoadPreset = (tpl) => {
    setName(tpl.label);
    setSamanya(tpl.samanya);
    setSelectedGunas(tpl.gunas);
    setKarmas(tpl.karmas);
    setDescription(tpl.desc);
    setErrorMsg(null);
    setSuccessMsg(`Loaded preset template: ${tpl.label}`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // Live Interactive Preview: Resolve instant bifurcation (Samavāya direct vs Sāmānya inherited)
  const previewBifurcation = useMemo(() => {
    const parentMeta = classes[samanya] || {
      gunas: [],
      englishName: samanya,
      sanskritName: samanya,
    };
    const classCanonicalGunas = parentMeta.gunas || [];

    // Distinguish direct Samavāya qualities from inherited parent qualities
    const directSet = new Set(
      selectedGunas.map((g) => g.split(" ")[0].toLowerCase()),
    );
    const inheritedGunas = classCanonicalGunas.filter(
      (cg) => !directSet.has(cg.toLowerCase()),
    );

    return {
      entityTitle: name.trim() || "Untitled Entity Instance",
      parentSanskrit: parentMeta.sanskritName || samanya,
      parentEnglish: parentMeta.englishName || samanya,
      directGunas: selectedGunas,
      activeKarmas: karmas,
      inheritedGunas,
      totalCount: selectedGunas.length + inheritedGunas.length,
    };
  }, [name, samanya, selectedGunas, karmas, classes]);

  const handleAddCustomGuna = () => {
    if (
      customGunaInput.trim() &&
      !selectedGunas.includes(customGunaInput.trim())
    ) {
      setSelectedGunas([...selectedGunas, customGunaInput.trim()]);
      setCustomGunaInput("");
    }
  };

  const handleRemoveGuna = (guna) => {
    setSelectedGunas(selectedGunas.filter((g) => g !== guna));
  };

  const handleToggleCanonicalGuna = (gName) => {
    if (selectedGunas.includes(gName)) {
      setSelectedGunas(selectedGunas.filter((g) => g !== gName));
    } else {
      setSelectedGunas([...selectedGunas, gName]);
    }
  };

  const handleAddCustomKarma = () => {
    if (customKarmaInput.trim() && !karmas.includes(customKarmaInput.trim())) {
      setKarmas([...karmas, customKarmaInput.trim()]);
      setCustomKarmaInput("");
    }
  };

  const handleRemoveKarma = (karma) => {
    setKarmas(karmas.filter((k) => k !== karma));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Invalid Input: Entity Name Required");
      return;
    }
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      const res = await onCreateEntity({
        name: name.trim(),
        samanya,
        inherentGunas: selectedGunas,
        karmas,
        description: description.trim(),
      });

      setSuccessMsg(
        `Entity instantiated successfully with Viśeṣa ID: ${res.viseshaId}`,
      );
      setName("");
      setDescription("");
      setSelectedGunas(["Mūrtatva (Form)", "Gurutva (Weight)"]);
      setKarmas(["Gamana (Locomotion)"]);
    } catch (err) {
      setErrorMsg(err.message || "Failed to instantiate Dravya entity");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="bg-white dark:bg-[#0C0C0E] p-5 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-zinc-900 dark:text-white font-serif flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Custom Dravya Instantiation Studio</span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Algorithm 4.2: Dynamic Entity Construction, Viśeṣa UUID Assignment &
            Taxonomic Inherence
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-semibold">
          {entities.length} Nodes in DB
        </span>
      </div>

      {/* Preset Templates Bar */}
      <div className="bg-white dark:bg-[#0C0C0E] p-4 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] space-y-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Quick Preset Templates (Classical Exemplars):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presetTemplates.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleLoadPreset(tpl)}
              className="text-xs px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition flex items-center space-x-1.5"
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>{tpl.label}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                ({tpl.samanya})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-6 bg-white dark:bg-[#0C0C0E] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Entity Name */}
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                Entity Name (Sanskrit / English Instance):
              </label>
              <input
                type="text"
                placeholder="e.g. Parvat-Agni (Mountain Fire)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
              />
            </div>

            {/* Parent Class */}
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1.5">
                Parent Sāmānya Class (9 Fundamental Dravyas):
              </label>
              <CustomSelect
                value={samanya}
                onChange={setSamanya}
                options={Object.keys(classes).map((k) => ({
                  value: k,
                  label: classes[k].sanskritName,
                  sublabel: `— ${classes[k].englishName}`,
                  badge: k,
                }))}
              />
            </div>

            {/* Inherent Guṇas Selection */}
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                Inherent Guṇas (Direct Samavāya Qualities):
              </label>

              {/* Selected Chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedGunas.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 flex items-center space-x-1"
                  >
                    <span>{g}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGuna(g)}
                      className="hover:text-indigo-900 dark:hover:text-white font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Custom Guna */}
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Custom quality (e.g. Śyāma-Rakta, Hardness)..."
                  value={customGunaInput}
                  onChange={(e) => setCustomGunaInput(e.target.value)}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddCustomGuna}
                  className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition"
                >
                  Add
                </button>
              </div>

              {/* Quick Pick from Canonical 24 */}
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
                Quick Select Canonical 24:
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 bg-zinc-50 dark:bg-black/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
                {gunas.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => handleToggleCanonicalGuna(g.name)}
                    className={`text-[10px] px-2 py-0.5 rounded border transition ${
                      selectedGunas.includes(g.name)
                        ? "bg-indigo-600 text-white font-bold border-indigo-500 shadow-sm"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Karmas */}
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                Active Karmas (Dynamic Motions / Methods):
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {karmas.map((k) => (
                  <span
                    key={k}
                    className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 flex items-center space-x-1"
                  >
                    <span>{k}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKarma(k)}
                      className="hover:text-rose-900 dark:hover:text-white font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Custom karma (e.g. Patana, Syandana)..."
                  value={customKarmaInput}
                  onChange={(e) => setCustomKarmaInput(e.target.value)}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-rose-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddCustomKarma}
                  className="px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                Ontological Description & Notes:
              </label>
              <textarea
                rows={2}
                placeholder="Physical properties, use cases, or textual source..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-900/20 active:scale-[0.98] transition flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? "Instantiating Node..."
                  : "Instantiate Dravya Node (Algo 4.2)"}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column: Live Interactive Node Preview & Active Entities */}
        <div className="lg:col-span-6 space-y-6">
          {/* Live Interactive Node Preview (Bifurcation: Samavāya Direct vs Sāmānya Inherited) */}
          <div className="bg-white dark:bg-[#0C0C0E] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <Split className="w-4 h-4 text-indigo-500" />
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-serif">
                  Live Preview: Instant Bifurcation
                </h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                {previewBifurcation.totalCount} Total Qualities
              </span>
            </div>

            <div className="space-y-3">
              {/* Composed Entity Header */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Composed Entity Instance:
                  </div>
                  <div className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    {previewBifurcation.entityTitle}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 font-semibold">
                    {previewBifurcation.parentSanskrit} (
                    {previewBifurcation.parentEnglish})
                  </span>
                </div>
              </div>

              {/* Direct Samavāya Qualities vs Sāmānya Inherited Traits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Direct Samavāya */}
                <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20 space-y-2">
                  <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
                    <span>Direct Guṇas (Samavāya)</span>
                    <span className="text-[10px] font-mono bg-indigo-500/20 px-1.5 py-0.5 rounded">
                      {previewBifurcation.directGunas.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {previewBifurcation.directGunas.length > 0 ? (
                      previewBifurcation.directGunas.map((g, idx) => (
                        <span
                          key={idx}
                          className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-[10px] px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800"
                        >
                          {g}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-zinc-400 italic">
                        None selected
                      </span>
                    )}
                  </div>
                  {previewBifurcation.activeKarmas.length > 0 && (
                    <div className="pt-2 border-t border-indigo-500/20">
                      <div className="text-[10px] font-bold text-rose-700 dark:text-rose-400 mb-1">
                        Active Karmas:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {previewBifurcation.activeKarmas.map((k, idx) => (
                          <span
                            key={idx}
                            className="bg-white dark:bg-zinc-900 text-rose-700 dark:text-rose-300 text-[10px] px-2 py-0.5 rounded border border-rose-500/20"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sāmānya Inherited Traits */}
                <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-2">
                  <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center justify-between">
                    <span>Inherited (Sāmānya)</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      {previewBifurcation.inheritedGunas.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {previewBifurcation.inheritedGunas.length > 0 ? (
                      previewBifurcation.inheritedGunas.map((cg, idx) => (
                        <span
                          key={idx}
                          className="bg-white dark:bg-zinc-900 text-emerald-800 dark:text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20"
                        >
                          {cg}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-zinc-400 italic">
                        No class gunas
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Entities Table Column */}
          <div className="bg-white dark:bg-[#0C0C0E] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-serif flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Active Knowledge Base Entities</span>
                </h4>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 font-semibold">
                  Viśeṣa Instances
                </span>
              </div>

              <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {entities.map((e) => (
                  <div
                    key={e.viseshaId}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-zinc-900 dark:text-white">
                          {e.name}
                        </span>
                        <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 ml-2 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {e.samanya}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-semibold">
                        {e.viseshaId}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400 flex flex-wrap gap-1">
                      <span className="text-indigo-700 dark:text-indigo-300 font-medium">
                        Guṇas:
                      </span>
                      {(e.inherentGunas || []).slice(0, 3).map((g, idx) => (
                        <span
                          key={idx}
                          className="bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded text-[10px] border border-zinc-200 dark:border-zinc-700"
                        >
                          {g}
                        </span>
                      ))}
                      {(e.inherentGunas || []).length > 3 && (
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                          +{e.inherentGunas.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                      <button
                        type="button"
                        onClick={() => onSelectForReasoner(e.viseshaId)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-[11px] font-semibold flex items-center space-x-1 transition"
                      >
                        <span>Query in Reasoner</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {!e.isPredefined && (
                        <button
                          type="button"
                          onClick={() => onDeleteEntity(e.viseshaId)}
                          className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 text-[11px] flex items-center space-x-1 transition"
                          title="Delete custom entity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono flex items-center justify-between">
              <span>Viśeṣa Uniqueness Invariant</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                Database Synchronized
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
