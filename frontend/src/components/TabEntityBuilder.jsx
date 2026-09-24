import React, { useState } from 'react';
import { PlusCircle, Sparkles, Trash2, Cpu, Check, Layers, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TabEntityBuilder({ 
  classes = {}, 
  gunas = [], 
  entities = [], 
  onCreateEntity, 
  onDeleteEntity,
  onSelectForReasoner 
}) {
  const [name, setName] = useState('');
  const [samanya, setSamanya] = useState('Pṛthvī');
  const [selectedGunas, setSelectedGunas] = useState(['Mūrtatva (Form)', 'Gurutva (Weight)']);
  const [customGunaInput, setCustomGunaInput] = useState('');
  const [karmas, setKarmas] = useState(['Gamana (Locomotion)']);
  const [customKarmaInput, setCustomKarmaInput] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleAddCustomGuna = () => {
    if (customGunaInput.trim() && !selectedGunas.includes(customGunaInput.trim())) {
      setSelectedGunas([...selectedGunas, customGunaInput.trim()]);
      setCustomGunaInput('');
    }
  };

  const handleRemoveGuna = (guna) => {
    setSelectedGunas(selectedGunas.filter(g => g !== guna));
  };

  const handleToggleCanonicalGuna = (gName) => {
    if (selectedGunas.includes(gName)) {
      setSelectedGunas(selectedGunas.filter(g => g !== gName));
    } else {
      setSelectedGunas([...selectedGunas, gName]);
    }
  };

  const handleAddCustomKarma = () => {
    if (customKarmaInput.trim() && !karmas.includes(customKarmaInput.trim())) {
      setKarmas([...karmas, customKarmaInput.trim()]);
      setCustomKarmaInput('');
    }
  };

  const handleRemoveKarma = (karma) => {
    setKarmas(karmas.filter(k => k !== karma));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Invalid Input: Entity Name Required');
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
        description: description.trim()
      });

      setSuccessMsg(`Entity instantiated successfully with Viśeṣa ID: ${res.viseshaId}`);
      setName('');
      setDescription('');
      setSelectedGunas(['Mūrtatva (Form)', 'Gurutva (Weight)']);
      setKarmas(['Gamana (Locomotion)']);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to instantiate Dravya entity');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white font-serif flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <span>2. Custom Dravya Instantiation Studio</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithm 4.2: Dynamic Entity Construction, Viśeṣa UUID Assignment & Taxonomic Inherence
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20">
          {entities.length} Nodes in DB
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-6 glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Entity Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Entity Name (Sanskrit / English Instance):
              </label>
              <input
                type="text"
                placeholder="e.g. Parvat-Agni (Mountain Fire)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Parent Class */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Parent Sāmānya Class (9 Fundamental Dravyas):
              </label>
              <select
                value={samanya}
                onChange={(e) => setSamanya(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              >
                {Object.keys(classes).map(k => (
                  <option key={k} value={k}>
                    {classes[k].sanskritName} — {classes[k].englishName}
                  </option>
                ))}
              </select>
            </div>

            {/* Inherent Guṇas Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Inherent Guṇas (Direct Samavāya Qualities):
              </label>
              
              {/* Selected Chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedGunas.map(g => (
                  <span key={g} className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center space-x-1">
                    <span>{g}</span>
                    <button type="button" onClick={() => handleRemoveGuna(g)} className="hover:text-white font-bold ml-1">×</button>
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
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomGuna}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                >
                  Add
                </button>
              </div>

              {/* Quick Pick from Canonical 24 */}
              <div className="text-[11px] text-slate-400 mb-1">Quick Select Canonical 24:</div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                {gunas.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => handleToggleCanonicalGuna(g.name)}
                    className={`text-[10px] px-2 py-0.5 rounded border transition ${
                      selectedGunas.includes(g.name)
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Karmas */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Active Karmas (Dynamic Motions / Methods):
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {karmas.map(k => (
                  <span key={k} className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center space-x-1">
                    <span>{k}</span>
                    <button type="button" onClick={() => handleRemoveKarma(k)} className="hover:text-white font-bold ml-1">×</button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Custom karma (e.g. Patana, Syandana)..."
                  value={customKarmaInput}
                  onChange={(e) => setCustomKarmaInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomKarma}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Ontological Description & Notes:
              </label>
              <textarea
                rows={2}
                placeholder="Physical properties, use cases, or textual source..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 transition flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Instantiating Node...' : 'Instantiate Dravya Node (Algo 4.2)'}</span>
            </button>
          </form>
        </div>

        {/* Entities Table Column */}
        <div className="lg:col-span-6 glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white font-serif flex items-center space-x-2">
                <Layers className="w-4 h-4 text-teal-400" />
                <span>4. Active Knowledge Base Entities</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Viśeṣa Instances</span>
            </div>

            <div className="mt-4 space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
              {entities.map(e => (
                <div key={e.viseshaId} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-white">{e.name}</span>
                      <span className="text-[11px] font-mono text-indigo-400 ml-2 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {e.samanya}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                      {e.viseshaId}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex flex-wrap gap-1">
                    <span className="text-amber-300 font-medium">Guṇas:</span>
                    {(e.inherentGunas || []).slice(0, 3).map((g, idx) => (
                      <span key={idx} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">
                        {g}
                      </span>
                    ))}
                    {(e.inherentGunas || []).length > 3 && (
                      <span className="text-[10px] text-slate-500">+{e.inherentGunas.length - 3} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                    <button
                      onClick={() => onSelectForReasoner(e.viseshaId)}
                      className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold flex items-center space-x-1"
                    >
                      <span>Query in Reasoner</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {!e.isPredefined && (
                      <button
                        onClick={() => onDeleteEntity(e.viseshaId)}
                        className="text-rose-400 hover:text-rose-300 text-[11px] flex items-center space-x-1"
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

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span>Viśeṣa Uniqueness Invariant</span>
            <span className="text-emerald-400 font-semibold">MongoDB Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
}
