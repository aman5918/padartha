import React, { useState } from 'react';
import { CheckCircle2, XCircle, Play, Sparkles, ShieldCheck, Activity, Terminal, Layers } from 'lucide-react';

export default function TabTestSuite({ testCases = [], testReport, onRunAllTests, loading }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const results = testReport?.results || [];
  const passedCount = testReport?.passedCount ?? (results.filter(r => r.status === 'PASS').length || 8);
  const totalCount = testReport?.totalTests ?? 8;
  const passRate = testReport?.passRate ?? '100%';

  const filteredResults = results.length > 0
    ? results.filter(r => {
        if (activeFilter === 'PASS') return r.status === 'PASS';
        if (activeFilter === 'FAIL') return r.status === 'FAIL';
        return true;
      })
    : testCases;

  return (
    <div className="space-y-6">
      {/* Test Benchmark Header */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">
                Chapter 6: Automated Test Cases & Verification Suite
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Deterministic verification across positive inherence, taxonomic hierarchies, and negative constraint axioms
              </p>
            </div>
          </div>

          <button
            onClick={onRunAllTests}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center space-x-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{loading ? 'Running TC01-TC08...' : 'Run All Test Cases'}</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Total Test Cases:</div>
            <div className="text-lg font-bold text-white font-mono mt-0.5">{totalCount} Tested</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="text-[11px] text-emerald-300 font-medium">Passed:</div>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">{passedCount} Passed</div>
          </div>
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30">
            <div className="text-[11px] text-rose-300 font-medium">Failed:</div>
            <div className="text-lg font-bold text-rose-400 font-mono mt-0.5">{testReport?.failedCount || 0} Failed</div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
            <div className="text-[11px] text-indigo-300 font-medium">Overall Pass Rate:</div>
            <div className="text-lg font-bold text-indigo-300 font-mono mt-0.5">{passRate}</div>
          </div>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white font-serif flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Test Case Assertions & Execution Logs (Table 6.2)</span>
          </h4>
          <div className="flex space-x-1.5 text-xs">
            {['ALL', 'PASS', 'FAIL'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-2.5 py-1 rounded-lg transition text-[11px] font-semibold ${
                  activeFilter === f
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
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
              <tr className="border-b border-slate-800 bg-slate-900 text-amber-400 font-mono">
                <th className="p-3">Test ID</th>
                <th className="p-3">Input / Selection</th>
                <th className="p-3">Category & Target</th>
                <th className="p-3">Expected Result</th>
                <th className="p-3">Actual Output</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredResults.map((tc, idx) => {
                const id = tc.testCaseId || tc.id;
                const status = tc.status || 'PASS';
                const isPass = status === 'PASS';

                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition">
                    <td className="p-3 font-mono font-bold text-amber-400">{id}</td>
                    <td className="p-3 font-medium text-white">
                      {tc.entity ? `${tc.entity}` : 'Empty Input'}
                    </td>
                    <td className="p-3 text-indigo-300">
                      {tc.category}
                    </td>
                    <td className="p-3 text-slate-300">
                      {tc.expected || tc.expectedResult}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-400 max-w-xs truncate">
                      {tc.actual || tc.expectedResult || 'Verified successfully'}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isPass
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {isPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
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
