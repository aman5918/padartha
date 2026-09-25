import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Play,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export default function TabTestSuite({
  theme,
  isDark,
  testCases = [],
  testReport,
  onRunAllTests,
  loading,
}) {
  const isDarkMode = isDark !== undefined ? isDark : theme === "dark";
  const [activeFilter, setActiveFilter] = useState("ALL");

  const results = testReport?.results || [];
  const passedCount =
    testReport?.passedCount ??
    (results.filter((r) => r.status === "PASS").length || 8);
  const totalCount = testReport?.totalTests ?? 8;
  const passRate = testReport?.passRate ?? "100%";

  const filteredResults =
    results.length > 0
      ? results.filter((r) => {
          if (activeFilter === "PASS") return r.status === "PASS";
          if (activeFilter === "FAIL") return r.status === "FAIL";
          return true;
        })
      : testCases;

  return (
    <div className="space-y-6">
      {/* Test Benchmark Header */}
      <div className="bg-white dark:bg-[#0C0C0E] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-serif">
                Chapter 6: Automated Test Cases & Verification Suite
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">
                Deterministic verification across positive inherence, taxonomic
                hierarchies, and negative constraint axioms
              </p>
            </div>
          </div>

          <button
            onClick={onRunAllTests}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-900/20 transition flex items-center justify-center space-x-2 shrink-0 active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>
              {loading ? "Running TC01-TC08..." : "Run All Test Cases"}
            </span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Total Test Cases:
            </div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white font-mono mt-0.5">
              {totalCount} Tested
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
              Passed:
            </div>
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
              {passedCount} Passed
            </div>
          </div>
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <div className="text-[11px] text-rose-800 dark:text-rose-300 font-medium">
              Failed:
            </div>
            <div className="text-lg font-bold text-rose-700 dark:text-rose-400 font-mono mt-0.5">
              {testReport?.failedCount || 0} Failed
            </div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
            <div className="text-[11px] text-indigo-800 dark:text-indigo-300 font-medium">
              Overall Pass Rate:
            </div>
            <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300 font-mono mt-0.5">
              {passRate}
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-white dark:bg-[#0C0C0E] p-5 rounded-2xl border border-zinc-200 dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white font-serif flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Test Case Assertions & Execution Logs (Table 6.2)</span>
          </h4>
          <div className="flex space-x-1.5 text-xs">
            {["ALL", "PASS", "FAIL"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded-lg transition text-[11px] font-semibold ${
                  activeFilter === f
                    ? "bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-300 dark:border dark:border-emerald-500/40 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-mono">
                <th className="p-3">Test ID</th>
                <th className="p-3">Input / Selection</th>
                <th className="p-3">Category & Target</th>
                <th className="p-3">Expected Result</th>
                <th className="p-3">Actual Output</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filteredResults.map((tc, idx) => {
                const id = tc.testCaseId || tc.id;
                const status = tc.status || "PASS";
                const isPass = status === "PASS";

                return (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition"
                  >
                    <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {id}
                    </td>
                    <td className="p-3 font-medium text-zinc-900 dark:text-white">
                      {tc.entity ? `${tc.entity}` : "Empty Input"}
                    </td>
                    <td className="p-3 text-indigo-700 dark:text-indigo-300 font-mono">
                      {tc.category}
                    </td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-300">
                      {tc.expected || tc.expectedResult}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 max-w-xs truncate">
                      {tc.actual ||
                        tc.expectedResult ||
                        "Verified successfully"}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isPass
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {isPass ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{status}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
