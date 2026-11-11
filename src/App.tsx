import { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Printer,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck2,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Target
} from 'lucide-react';
import { ResumeData } from './types/resume';
import { RESUME_PRESETS } from './data/resumeLibrary';
import { ResumeDocument } from './components/ResumeDocument';
import { EditorSidebar } from './components/EditorSidebar';
import { PhraseLibraryModal } from './components/PhraseLibraryModal';
import { AIAssistantModal } from './components/AIAssistantModal';

const STORAGE_KEY = 'novacv_resume_state_v1';

export default function App() {
  // Initialize from storage or default to Senior Full-Stack Engineer preset
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved resume from localStorage', e);
    }
    return RESUME_PRESETS[0].data;
  });

  const [zoomScale, setZoomScale] = useState<number>(0.92);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPhraseVaultOpen, setIsPhraseVaultOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [targetExpIdForInsert, setTargetExpIdForInsert] = useState<string | undefined>(undefined);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Failed to persist to localStorage', e);
    }
  }, [resumeData]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  // Print to PDF
  const handlePrint = () => {
    window.print();
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Resume JSON downloaded successfully');
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported.personalInfo && imported.experiences) {
          setResumeData(imported);
          showNotification('Resume data imported successfully!');
        } else {
          showNotification('Invalid resume JSON format');
        }
      } catch {
        showNotification('Failed to parse uploaded JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default sample
  const handleResetSample = () => {
    if (confirm('Reset resume to the default Software Engineer sample? Any unsaved edits will be replaced.')) {
      setResumeData(RESUME_PRESETS[0].data);
      showNotification('Reset to default preset');
    }
  };

  // Open phrase vault
  const handleOpenPhraseVault = (targetExpId?: string) => {
    setTargetExpIdForInsert(targetExpId || resumeData.experiences[0]?.id);
    setIsPhraseVaultOpen(true);
  };

  // Insert bullet from vault
  const handleInsertBulletFromVault = (bulletText: string) => {
    if (!targetExpIdForInsert) {
      showNotification('Bullet copied to clipboard!');
      return;
    }
    setResumeData((prev) => {
      const expIndex = prev.experiences.findIndex((e) => e.id === targetExpIdForInsert);
      if (expIndex === -1) {
        if (prev.experiences.length > 0) {
          const updated = [...prev.experiences];
          updated[0] = { ...updated[0], bullets: [...updated[0].bullets, bulletText] };
          return { ...prev, experiences: updated };
        }
        return prev;
      }
      const updated = [...prev.experiences];
      updated[expIndex] = {
        ...updated[expIndex],
        bullets: [...updated[expIndex].bullets, bulletText],
      };
      return { ...prev, experiences: updated };
    });
    showNotification('Bullet inserted into active job experience!');
  };

  // Apply summary from AI
  const handleApplySummaryFromAi = (newSummary: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        summary: newSummary,
      },
    }));
    setIsAiModalOpen(false);
    showNotification('AI summary applied to resume!');
  };

  // Apply bullet from AI
  const handleApplyBulletFromAi = (newBullet: string) => {
    if (resumeData.experiences.length > 0) {
      setResumeData((prev) => {
        const updated = [...prev.experiences];
        updated[0] = { ...updated[0], bullets: [...updated[0].bullets, newBullet] };
        return { ...prev, experiences: updated };
      });
      setIsAiModalOpen(false);
      showNotification('Optimized bullet inserted into latest experience!');
    } else {
      navigator.clipboard.writeText(newBullet);
      showNotification('Bullet copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans-modern antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs shadow-2xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="no-print h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between gap-8 shrink-0">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <FileCheck2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
            Novacv Studio
          </span>
        </div>

        {/* Zone 2: Clean single-line text action links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <button
            onClick={() => handleOpenPhraseVault()}
            className="hover:text-white transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>1000+ Phrase Vault</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="hover:text-white transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Bullet Optimizer</span>
          </button>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="hover:text-white transition flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Target className="w-3.5 h-3.5 text-pink-400" />
            <span>ATS Match Scanner</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* JSON Export / Import */}
          <label
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition whitespace-nowrap"
            title="Import Resume JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition whitespace-nowrap"
            title="Export JSON Data Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>

          {/* Primary CTA: Print to PDF */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Export to PDF / Print</span>
          </button>
        </div>
      </header>

      {/* Main Workspace: Split into Left Editor (400px) & Right Live Document Canvas */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Editor Sidebar */}
        <aside
          className={`no-print transition-all duration-300 ease-in-out shrink-0 ${
            isSidebarOpen ? 'w-full md:w-[420px] lg:w-[440px]' : 'w-0'
          } overflow-hidden border-r border-slate-800 bg-slate-900 z-30`}
        >
          <div className="w-[420px] lg:w-[440px] h-full">
            <EditorSidebar
              data={resumeData}
              onChange={setResumeData}
              onOpenPhraseVault={handleOpenPhraseVault}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              onSelectPreset={(preset) => {
                setResumeData(preset);
                showNotification(`Loaded ${preset.personalInfo.headline} preset!`);
              }}
            />
          </div>
        </aside>

        {/* Sidebar Toggle Handle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="no-print absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-r-lg border border-l-0 border-slate-700 shadow-xl transition"
          style={{ left: isSidebarOpen ? '420px' : '0px' }}
          title={isSidebarOpen ? 'Collapse editor' : 'Expand editor'}
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Right Live Document Preview Canvas */}
        <main className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="no-print h-12 border-b border-slate-800 bg-slate-900/40 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
            {/* Quick Template Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-slate-500 text-[11px] font-medium hidden sm:inline">Template:</span>
              <div className="flex items-center gap-1">
                {[
                  { id: 'modern-executive', label: 'Executive' },
                  { id: 'classic-ats', label: 'Classic ATS' },
                  { id: 'tech-minimalist', label: 'Tech' },
                  { id: 'contemporary-studio', label: 'Studio' },
                  { id: 'nordic-clean', label: 'Nordic' },
                  { id: 'corporate-ivy', label: 'Ivy' },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setResumeData((p) => ({ ...p, design: { ...p.design, template: tpl.id as any } }))}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition whitespace-nowrap ${
                      resumeData.design.template === tpl.id
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Zoom & Actions */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 bg-slate-900 rounded-lg border border-slate-800 p-0.5">
                <button
                  onClick={() => setZoomScale((z) => Math.max(0.5, z - 0.1))}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] text-slate-400 px-1.5 tabular-nums">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale((z) => Math.min(1.4, z + 0.1))}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomScale(0.92)}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleResetSample}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[11px]"
                title="Reset sample"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Document Sheet Viewport */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-slate-950/90 print:p-0 print:m-0 print:bg-white">
            <div className="relative">
              <ResumeDocument data={resumeData} scale={zoomScale} />
            </div>
          </div>
        </main>
      </div>

      {/* 1000+ Pre-Written Phrase & Action Verb Vault Modal */}
      <PhraseLibraryModal
        isOpen={isPhraseVaultOpen}
        onClose={() => setIsPhraseVaultOpen(false)}
        onInsertBullet={handleInsertBulletFromVault}
      />

      {/* AI Assistant Modal (Bullet Optimizer, Summary Generator, ATS Matcher, Cover Letter) */}
      <AIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        resumeData={resumeData}
        onApplySummary={handleApplySummaryFromAi}
        onApplyBullet={handleApplyBulletFromAi}
      />
    </div>
  );
}
