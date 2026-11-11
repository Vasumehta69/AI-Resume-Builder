import { useState, useMemo } from 'react';
import { Search, X, Check, Copy, Plus, BookOpen, Sparkles, Filter } from 'lucide-react';
import { PHRASE_CATEGORIES, ACTION_VERBS } from '../data/resumeLibrary';

interface PhraseLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertBullet: (bulletText: string) => void;
}

export function PhraseLibraryModal({ isOpen, onClose, onInsertBullet }: PhraseLibraryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'bullets' | 'verbs'>('bullets');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [insertedText, setInsertedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1800);
  };

  const handleInsert = (text: string) => {
    onInsertBullet(text);
    setInsertedText(text);
    setTimeout(() => setInsertedText(null), 1800);
  };

  // Filter bullets based on category and search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PHRASE_CATEGORIES.map((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }
      const filteredSubs = cat.subcategories.map((sub) => {
        const filteredBullets = sub.bullets.filter(
          (b) => !q || b.toLowerCase().includes(q) || sub.name.toLowerCase().includes(q)
        );
        return { ...sub, bullets: filteredBullets };
      }).filter((sub) => sub.bullets.length > 0);

      if (filteredSubs.length === 0) return null;
      return { ...cat, subcategories: filteredSubs };
    }).filter(Boolean) as typeof PHRASE_CATEGORIES;
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                1000+ Pre-Written Industry Phrases &amp; Action Verbs
              </h2>
              <p className="text-xs text-slate-400">
                Curated high-impact, quantified bullet points across major industries
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls & Search Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('bullets')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === 'bullets' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bullet Point Vault
            </button>
            <button
              onClick={() => setActiveTab('verbs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                activeTab === 'verbs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              200+ Power Verbs
            </button>
          </div>

          {activeTab === 'bullets' && (
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search bullets (e.g. latency, revenue, agile, python)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 shrink-0"
              >
                <option value="all">All Industries</option>
                {PHRASE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'bullets' ? (
            filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <h3 className="text-sm font-bold text-indigo-300 border-b border-slate-800 pb-1 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{cat.name}</span>
                  </h3>

                  <div className="space-y-4">
                    {cat.subcategories.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {sub.name}
                        </h4>
                        <div className="space-y-2">
                          {sub.bullets.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition flex items-start justify-between gap-3 group"
                            >
                              <p className="text-xs text-slate-300 leading-relaxed flex-1">
                                {bullet}
                              </p>
                              <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition">
                                <button
                                  onClick={() => handleCopy(bullet)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                  title="Copy text"
                                >
                                  {copiedText === bullet ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleInsert(bullet)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                                  title="Insert into active experience"
                                >
                                  {insertedText === bullet ? (
                                    <>
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Inserted!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Insert</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center space-y-2 text-slate-500">
                <Filter className="w-8 h-8 mx-auto text-slate-700" />
                <p className="text-sm">No phrases match "{searchQuery}"</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )
          ) : (
            /* Action Verbs Tab */
            <div className="space-y-6">
              <p className="text-xs text-slate-400 leading-relaxed">
                Resume scanners and hiring managers prioritize strong action verbs that establish ownership and results. Click any verb to copy it instantly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(ACTION_VERBS).map(([category, verbs]) => (
                  <div key={category} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span>{category} Verbs</span>
                      <span className="text-[11px] font-mono text-indigo-400 font-normal">{verbs.length} verbs</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {verbs.map((verb) => (
                        <button
                          key={verb}
                          onClick={() => handleCopy(verb)}
                          className="px-2 py-1 rounded-md bg-slate-900 hover:bg-indigo-600/30 hover:border-indigo-500/40 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition"
                        >
                          {copiedText === verb ? '✓ Copied' : verb}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span>Tip: Click "Insert" to attach a bullet directly into your active job experience</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
}
