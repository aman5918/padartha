import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabOverview from './components/TabOverview';
import TabReasoner from './components/TabReasoner';
import TabKnowledgeGraph from './components/TabKnowledgeGraph';
import TabOntologyGuide from './components/TabOntologyGuide';
import TabEntityBuilder from './components/TabEntityBuilder';
import TabAbhavaLab from './components/TabAbhavaLab';
import TabTestSuite from './components/TabTestSuite';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('padartha-theme') || 'light';
  });
  
  const [overview, setOverview] = useState(null);
  const [classes, setClasses] = useState({});
  const [gunas, setGunas] = useState([]);
  const [karmas, setKarmas] = useState([]);
  const [abhavas, setAbhavas] = useState([]);
  const [entities, setEntities] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [testReport, setTestReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedEntityForReasoner, setSelectedEntityForReasoner] = useState('dravya-01');

  const API_BASE = '/api';

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('padartha-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [ovRes, clsRes, gunasRes, karmasRes, abhavasRes, entRes, graphRes, testsRes] = await Promise.all([
        fetch(`${API_BASE}/ontology/overview`).then(r => r.json()),
        fetch(`${API_BASE}/ontology/classes`).then(r => r.json()),
        fetch(`${API_BASE}/ontology/gunas`).then(r => r.json()),
        fetch(`${API_BASE}/ontology/karmas`).then(r => r.json()),
        fetch(`${API_BASE}/ontology/abhavas`).then(r => r.json()),
        fetch(`${API_BASE}/ontology/entities`).then(r => r.json()),
        fetch(`${API_BASE}/graph`).then(r => r.json()),
        fetch(`${API_BASE}/tests/definitions`).then(r => r.json())
      ]);

      if (ovRes.success) setOverview(ovRes);
      if (clsRes.success) setClasses(clsRes.classes);
      if (gunasRes.success) setGunas(gunasRes.gunas);
      if (karmasRes.success) setKarmas(karmasRes.karmas);
      if (abhavasRes.success) setAbhavas(abhavasRes.abhavas);
      if (entRes.success) setEntities(entRes.entities);
      if (graphRes.success) setGraphData(graphRes);
      if (testsRes.success) setTestCases(testsRes.testCases);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleExecuteReasonerQuery = async (params) => {
    const res = await fetch(`${API_BASE}/reasoner/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  };

  const handleExecuteAbhava = async (params) => {
    const res = await fetch(`${API_BASE}/reasoner/abhava`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  };

  const handleCreateEntity = async (entityData) => {
    const res = await fetch(`${API_BASE}/ontology/entities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entityData)
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Error creating entity');
    }
    showToast(`Entity '${entityData.name}' created with ID ${data.viseshaId}!`, 'success');
    await fetchAllData();
    return data;
  };

  const handleDeleteEntity = async (viseshaId) => {
    const res = await fetch(`${API_BASE}/ontology/entities/${viseshaId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      showToast(`Entity removed.`, 'info');
      await fetchAllData();
    }
  };

  const handleResetDB = async () => {
    if (!window.confirm('Reset knowledge base to canonical default entities?')) return;
    const res = await fetch(`${API_BASE}/ontology/entities/reset`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      showToast('Restored default canonical knowledge entities!', 'success');
      await fetchAllData();
    }
  };

  const handleRunAllTests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/tests/run`);
      const report = await res.json();
      if (report.success) {
        setTestReport(report);
        setActiveTab('tests');
        showToast(`Test Suite Executed: ${report.passedCount}/${report.totalTests} Passed!`, 'success');
      }
    } catch (err) {
      showToast('Failed to run test suite', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportRDF = () => {
    window.open(`${API_BASE}/export/turtle`, '_blank');
  };

  const handleSelectForReasoner = (viseshaId) => {
    setSelectedEntityForReasoner(viseshaId);
    setActiveTab('reasoner');
  };

  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold flex items-center space-x-2 transition-all duration-300 animate-bounce ${
          toast.type === 'error'
            ? 'bg-rose-900 border-rose-500 text-rose-100'
            : toast.type === 'success'
            ? 'bg-emerald-900 border-emerald-500 text-emerald-100'
            : 'bg-[#18181b] border-[#b55b32] text-[#fbf9f5]'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={overview?.stats}
        onRunTests={handleRunAllTests}
        onResetDB={handleResetDB}
        onExport={handleExportRDF}
        theme={theme}
        onToggleTheme={toggleTheme}
        loading={loading}
      />

      {/* Main Working Tool Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'overview' && (
          <TabOverview
            entities={entities}
            classes={classes}
            onNavigateTab={setActiveTab}
            onExecuteQuery={handleExecuteReasonerQuery}
            onRunTests={handleRunAllTests}
            theme={theme}
          />
        )}

        {activeTab === 'reasoner' && (
          <TabReasoner
            entities={entities}
            classes={classes}
            onExecuteQuery={handleExecuteReasonerQuery}
            theme={theme}
          />
        )}

        {activeTab === 'graph' && (
          <TabKnowledgeGraph
            graphData={graphData}
            selectedEntityId={selectedEntityForReasoner}
            onNodeSelect={(node) => {
              if (node.id.startsWith('entity-')) {
                const vId = node.id.replace('entity-', '');
                setSelectedEntityForReasoner(vId);
              }
            }}
            theme={theme}
          />
        )}

        {activeTab === 'guide' && (
          <TabOntologyGuide
            classes={classes}
            gunas={gunas}
            karmas={karmas}
            abhavas={abhavas}
            theme={theme}
          />
        )}

        {activeTab === 'builder' && (
          <TabEntityBuilder
            classes={classes}
            gunas={gunas}
            entities={entities}
            onCreateEntity={handleCreateEntity}
            onDeleteEntity={handleDeleteEntity}
            onSelectForReasoner={handleSelectForReasoner}
            theme={theme}
          />
        )}

        {activeTab === 'abhava' && (
          <TabAbhavaLab
            entities={entities}
            abhavas={abhavas}
            onExecuteAbhava={handleExecuteAbhava}
            theme={theme}
          />
        )}

        {activeTab === 'tests' && (
          <TabTestSuite
            testCases={testCases}
            testReport={testReport}
            onRunAllTests={handleRunAllTests}
            loading={loading}
            theme={theme}
          />
        )}
      </main>

      {/* Clean Academic Editorial Footer */}
      <footer className={`border-t mt-14 py-8 text-xs transition-colors ${
        isDark 
          ? 'bg-[#0f172a]/60 border-slate-800 text-slate-400' 
          : 'bg-[#f5f0ea] border-[#ede7dd] text-[#8c7a65]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className={`font-serif font-bold text-sm ${isDark ? 'text-slate-100' : 'text-[#1c1917]'}`}>
              Padārtha Ontology
            </span>
            <span>•</span>
            <span>Nyāya-Vaiśeṣika Knowledge Representation Engine</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Aman Yadav (68) & Tanish Gupta (17)</span>
            <span>•</span>
            <span>Guide: Prof. Javed Pathan</span>
            <span>•</span>
            <span>Rizvi College (Univ of Mumbai)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
