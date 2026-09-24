import React from 'react';
import { Network, Sparkles, Database, CheckCircle2, RotateCcw, Download, FileText, Sun, Moon, UserCheck } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  stats, 
  onRunTests, 
  onResetDB, 
  onExport,
  theme,
  onToggleTheme,
  loading 
}) {
  const navCategories = [
    { id: 'overview', label: 'Overview & Studio' },
    { id: 'reasoner', label: 'Padārtha Reasoner' },
    { id: 'graph', label: 'Knowledge Graph' },
    { id: 'guide', label: '7 Padārthas Guide' },
    { id: 'builder', label: 'Custom Dravya Builder' },
    { id: 'abhava', label: 'Abhāva Lab' },
    { id: 'tests', label: 'Test Suite (TC01-08)' }
  ];



  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-[#090d16]/90 border-slate-800/80 backdrop-blur-md text-slate-100' 
        : 'bg-[#fbf9f5]/95 border-[#ede7dd] shadow-sm text-[#1c1917]'
    }`}>
      {/* Top Utility / Announcement Bar */}
      <div className={`border-b py-1.5 px-4 sm:px-8 text-[11px] flex items-center justify-between transition-colors ${
        isDark 
          ? 'bg-[#0f172a]/60 border-slate-800 text-slate-400' 
          : 'bg-[#f5f0ea] border-[#ede7dd] text-[#6b5c4b]'
      }`}>
        <div className="flex items-center space-x-2">
          <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-[#b55b32]'}`}>
            ☸️ Indian Knowledge Systems (IKS)
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">Department of Computer Science • Rizvi College of Arts, Science and Commerce</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Aman Yadav (68) & Tanish Gupta (17)</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[10px] text-emerald-500 font-semibold">Backend Live (Port 5000)</span>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="cursor-pointer group flex items-center space-x-3"
          >
            <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-white flex items-center justify-center font-serif font-bold text-xl shadow-md ${
              isDark ? 'bg-amber-600' : 'bg-[#b55b32]'
            }`}>
              P
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
                Padārtha <span className={`font-normal italic ${isDark ? 'text-amber-400' : 'text-[#b55b32]'}`}>Ontology</span>
              </div>
              <p className={`text-[10px] tracking-wider uppercase font-semibold ${
                isDark ? 'text-slate-400' : 'text-[#8c7a65]'
              }`}>
                Knowledge Representation Engine (Nyāya)
              </p>
            </div>
          </div>

          {/* Action Buttons & Theme Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition flex items-center justify-center ${
                isDark 
                  ? 'border-slate-700 bg-slate-800 text-amber-300 hover:bg-slate-700' 
                  : 'border-[#ede7dd] bg-white text-[#b55b32] hover:bg-[#f5f0ea]'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Run Tests Button */}
            <button
              onClick={onRunTests}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full forest-button text-xs font-semibold shadow-sm"
              title="Run Chapter 6 Test Cases (TC01-TC08)"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Run Tests</span>
            </button>



            {/* Export RDF */}
            <button
              onClick={onExport}
              className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition ${
                isDark 
                  ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' 
                  : 'border-[#ede7dd] bg-white text-[#1c1917] hover:bg-[#f5f0ea]'
              }`}
              title="Export Ontology (JSON / RDF / Turtle)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RDF</span>
            </button>

            {/* Reset DB */}
            <button
              onClick={onResetDB}
              className={`p-2 rounded-full border transition ${
                isDark 
                  ? 'border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200' 
                  : 'border-[#ede7dd] bg-white text-[#8c7a65] hover:text-[#1c1917]'
              }`}
              title="Reset knowledge base to canonical default entities"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clean Category Navigation Bar */}
        <nav className={`mt-2.5 pt-2 border-t flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none text-xs sm:text-[13px] ${
          isDark ? 'border-slate-800/80' : 'border-[#ede7dd]'
        }`}>
          {navCategories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? isDark 
                      ? 'text-amber-400 font-bold bg-amber-500/15'
                      : 'text-[#b55b32] font-bold bg-[#b55b32]/10'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'text-[#6b5c4b] hover:text-[#1c1917] hover:bg-[#f5f0ea]'
                }`}
              >
                {isActive && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-amber-400' : 'bg-[#b55b32]'}`}></span>
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
