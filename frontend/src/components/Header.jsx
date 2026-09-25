import React from "react";
import {
  Sparkles,
  Cpu,
  Network,
  BookOpen,
  Layers,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  RotateCcw,
  Sun,
  Moon,
  UserCheck,
} from "lucide-react";

export default function Header({
  activeTab,
  setActiveTab,
  stats,
  onRunTests,
  onResetDB,
  onExport,
  theme,
  onToggleTheme,
  loading,
}) {
  const navCategories = [
    { id: "overview", label: "Overview & Studio", icon: Sparkles },
    { id: "reasoner", label: "Padārtha Reasoner", icon: Cpu },
    { id: "graph", label: "Knowledge Graph", icon: Network },
    { id: "guide", label: "7 Padārthas Guide", icon: BookOpen },
    { id: "builder", label: "Custom Dravya Builder", icon: Layers },
    { id: "abhava", label: "Abhāva Lab", icon: ShieldCheck },
    { id: "tests", label: "Test Suite (TC01–08)", icon: CheckCircle2 },
    { id: "report", label: "Academic Report", icon: FileText },
  ];

  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        isDark
          ? "bg-black/95 border-b border-white/[0.07] backdrop-blur-xl text-zinc-100"
          : "bg-white/95 border-b border-zinc-200 shadow-sm backdrop-blur-xl text-zinc-900"
      }`}
    >
      {/* ── Top Utility / Announcement Bar ────────────────────── */}
      <div
        className={`border-b py-1 px-4 sm:px-6 lg:px-8 xl:px-12 text-[11px] flex items-center justify-between ${
          isDark
            ? "bg-[#0a0a0a] border-white/[0.05] text-zinc-500"
            : "bg-zinc-50 border-zinc-200 text-zinc-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold tracking-wide ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
          >
            ☸️ Indian Knowledge Systems (IKS)
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">
            Department of Computer Science • Rizvi College of Arts, Science and
            Commerce
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 font-medium text-zinc-500">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Aman Yadav (68) &amp; Tanish Gupta (17)</span>
          </div>
          <span className="hidden sm:inline">•</span>

          {/* Dynamic DB Connection Status */}
          <div className="flex items-center">
            {stats?.mongoConnected === true ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-500 font-mono text-[10px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>MongoDB Live (27017)</span>
              </div>
            ) : stats ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 font-mono text-[10px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>Smart Memory Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 font-mono text-[10px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
                <span>Connecting...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Brand & Actions ──────────────────────────────── */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between py-3 sm:py-3.5">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab("overview")}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-lg shadow-indigo-900/30 group-hover:bg-indigo-500 transition-colors">
              P
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                Padārtha{" "}
                <span
                  className={`font-light italic ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
                >
                  Ontology
                </span>
              </div>
              <p
                className={`text-[10px] tracking-widest uppercase font-medium ${
                  isDark ? "text-zinc-600" : "text-zinc-400"
                }`}
              >
                Knowledge Representation Engine (Nyāya)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all ${
                isDark
                  ? "border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                  : "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Run Tests */}
            <button
              onClick={onRunTests}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shadow-indigo-900/20 transition-all active:scale-[0.98] disabled:opacity-60"
              title="Run Chapter 6 Test Cases (TC01–TC08)"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {loading ? "Running…" : "Run Tests"}
              </span>
            </button>

            {/* Export RDF */}
            <button
              onClick={onExport}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isDark
                  ? "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                  : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
              title="Export Ontology (JSON / RDF / Turtle)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RDF</span>
            </button>

            {/* Reset DB */}
            <button
              onClick={onResetDB}
              className={`p-2 rounded-xl border transition-all ${
                isDark
                  ? "border-zinc-800 bg-zinc-900/80 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                  : "border-zinc-200 bg-white text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
              }`}
              title="Reset knowledge base to canonical default entities"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Navigation — Premium Underline Tab Style ─────────── */}
        <nav
          className={`flex overflow-x-auto scrollbar-none border-t ${
            isDark ? "border-zinc-900" : "border-zinc-100"
          }`}
        >
          {navCategories.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-1.5 px-3.5 py-2.5 text-[12.5px] font-medium
                  whitespace-nowrap transition-all duration-150 border-b-2 -mb-px
                  ${
                    isActive
                      ? isDark
                        ? "border-indigo-400 text-zinc-100 font-semibold"
                        : "border-indigo-600 text-indigo-700 font-semibold"
                      : isDark
                        ? "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                        : "border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300"
                  }
                `}
              >
                <Icon
                  className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "opacity-100" : "opacity-50"}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
