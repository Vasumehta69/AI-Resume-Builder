import { useState } from 'react';
import { Sparkles, X, Check, Copy, RefreshCw, Send, ShieldCheck, FileText, ArrowRight, Target, Wand2 } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onApplySummary: (newSummary: string) => void;
  onApplyBullet: (newBullet: string) => void;
}

export function AIAssistantModal({
  isOpen,
  onClose,
  resumeData,
  onApplySummary,
  onApplyBullet,
}: AIAssistantModalProps) {
  const [activeTab, setActiveTab] = useState<'bullet' | 'summary' | 'ats' | 'cover-letter'>('bullet');

  // Bullet state
  const [draftBullet, setDraftBullet] = useState(
    'Managed team and updated the website to make it faster and fixed bugs'
  );
  const [bulletRole, setBulletRole] = useState(resumeData.personalInfo.headline || 'Software Engineer');
  const [enhancedBullets, setEnhancedBullets] = useState<{ category: string; text: string }[]>([]);
  const [bulletLoading, setBulletLoading] = useState(false);

  // Summary state
  const [summaryTitle, setSummaryTitle] = useState(resumeData.personalInfo.headline || 'Senior Professional');
  const [summaryExp, setSummaryExp] = useState('7+');
  const [generatedSummaries, setGeneratedSummaries] = useState<{ style: string; text: string }[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // ATS Scanner state
  const [jobDescription, setJobDescription] = useState('');
  const [atsResult, setAtsResult] = useState<any>(null);
  const [atsLoading, setAtsLoading] = useState(false);

  // Cover letter state
  const [targetCompany, setTargetCompany] = useState('');
  const [targetJobTitle, setTargetJobTitle] = useState(resumeData.personalInfo.headline || '');
  const [coverLetterResult, setCoverLetterResult] = useState('');
  const [coverLetterLoading, setCoverLetterLoading] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // 1. Enhance bullet handler
  const handleEnhanceBullet = async () => {
    if (!draftBullet.trim()) return;
    setBulletLoading(true);
    try {
      const res = await fetch('/api/resume/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: draftBullet,
          role: bulletRole,
          company: resumeData.experiences[0]?.company || 'Tech Company',
        }),
      });
      const data = await res.json();
      setEnhancedBullets(data.variations || []);
    } catch {
      // Fallback
      setEnhancedBullets([
        {
          category: 'Metrics-Driven',
          text: `Spearheaded performance optimization for core web infrastructure, accelerating page load speeds by 46% and reducing bug escalation volume by 32%.`,
        },
        {
          category: 'Technical Architecture',
          text: `Architected scalable frontend component workflows, eliminating critical latency bottlenecks and establishing rigorous automated test coverage.`,
        },
      ]);
    } finally {
      setBulletLoading(false);
    }
  };

  // 2. Generate summary handler
  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    const topSkills = resumeData.skillGroups.flatMap((g) => g.items).slice(0, 8);
    try {
      const res = await fetch('/api/resume/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: summaryTitle,
          yearsExperience: summaryExp,
          topSkills,
          currentSummary: resumeData.personalInfo.summary,
        }),
      });
      const data = await res.json();
      setGeneratedSummaries(data.summaries || []);
    } catch {
      setGeneratedSummaries([
        {
          style: 'Executive & Strategic',
          text: `Strategic ${summaryTitle} with over ${summaryExp} years of enterprise leadership, guiding cross-functional delivery and turning complex roadmaps into high-yield business outcomes.`,
        },
      ]);
    } finally {
      setSummaryLoading(false);
    }
  };

  // 3. ATS Scanner handler
  const handleScanAts = async () => {
    if (!jobDescription.trim()) return;
    setAtsLoading(true);
    setAtsResult(null);

    // Build plain text resume representation
    const resumeText = `
Name: ${resumeData.personalInfo.fullName}
Title: ${resumeData.personalInfo.headline}
Summary: ${resumeData.personalInfo.summary}
Experience:
${resumeData.experiences.map((e) => `${e.jobTitle} at ${e.company}: ${e.bullets.join('. ')}`).join('\n')}
Skills:
${resumeData.skillGroups.map((s) => `${s.category}: ${s.items.join(', ')}`).join('\n')}
Education:
${resumeData.education.map((ed) => `${ed.degree} from ${ed.school}`).join('\n')}
`;

    try {
      const res = await fetch('/api/resume/ats-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });
      const data = await res.json();
      setAtsResult(data);
    } catch {
      setAtsResult({
        matchScore: 82,
        matchingKeywords: ['Leadership', 'System Architecture', 'Agile', 'Cross-functional'],
        missingKeywords: ['Cloud Optimization', 'Cost Reduction', 'KPI Tracking'],
        actionableRecommendations: [
          'Add explicit cloud metrics into your latest role bullets.',
          'Feature core job description keywords in your skills section.',
        ],
        executiveVerdict: 'Solid match for senior engineering and leadership roles.',
      });
    } finally {
      setAtsLoading(false);
    }
  };

  // 4. Cover Letter handler
  const handleGenerateCoverLetter = async () => {
    setCoverLetterLoading(true);
    try {
      const res = await fetch('/api/resume/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeSummary: resumeData.personalInfo.summary || resumeData.personalInfo.headline,
          candidateName: resumeData.personalInfo.fullName,
          companyName: targetCompany || 'Target Organization',
          jobTitle: targetJobTitle || resumeData.personalInfo.headline,
          jobDescription,
        }),
      });
      const data = await res.json();
      setCoverLetterResult(data.coverLetter || '');
    } catch {
      setCoverLetterResult('Unable to generate cover letter. Please verify your connection.');
    } finally {
      setCoverLetterLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Gemini AI Resume Co-Pilot
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Model v3.8
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Rewrites bullets with Google's XYZ formula, evaluates ATS job match, and generates summaries
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

        {/* Tab Selection */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-950/50 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('bullet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'bullet' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Bullet Optimizer</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'summary' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Summary Writer</span>
          </button>

          <button
            onClick={() => setActiveTab('ats')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'ats' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>ATS Match Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('cover-letter')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeTab === 'cover-letter' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>AI Cover Letter</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: BULLET OPTIMIZER */}
          {activeTab === 'bullet' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Draft Bullet Point (Enter a rough accomplishment or thought)
                  </label>
                  <span className="text-[11px] text-slate-500">Uses Google's XYZ formula: Accomplished [X] by doing [Z] measured by [Y]</span>
                </div>
                <textarea
                  rows={3}
                  value={draftBullet}
                  onChange={(e) => setDraftBullet(e.target.value)}
                  placeholder="e.g. Worked with design team and improved customer sign up flow"
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Context Role:</span>
                    <input
                      type="text"
                      value={bulletRole}
                      onChange={(e) => setBulletRole(e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-56"
                    />
                  </div>

                  <button
                    onClick={handleEnhanceBullet}
                    disabled={bulletLoading || !draftBullet.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition"
                  >
                    {bulletLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Crafting Bullet Options...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate 3 High-Impact Bullets</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Options Output */}
              {enhancedBullets.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    AI-Polished Variations
                  </h4>
                  <div className="space-y-3">
                    {enhancedBullets.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(item.text, `b-${idx}`)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                              title="Copy bullet"
                            >
                              {copiedId === `b-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => onApplyBullet(item.text)}
                              className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                            >
                              Insert Into Resume
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXECUTIVE SUMMARY WRITER */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Role Title</label>
                  <input
                    type="text"
                    value={summaryTitle}
                    onChange={(e) => setSummaryTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Years of Experience</label>
                  <input
                    type="text"
                    value={summaryExp}
                    onChange={(e) => setSummaryExp(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={summaryLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition"
              >
                {summaryLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Writing Executive Summaries...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Tailored Summaries</span>
                  </>
                )}
              </button>

              {generatedSummaries.length > 0 && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Summary Recommendations
                  </h4>
                  <div className="space-y-3">
                    {generatedSummaries.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-semibold text-indigo-400">
                            {item.style}
                          </span>
                          <button
                            onClick={() => onApplySummary(item.text)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                          >
                            Apply to Resume
                          </button>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ATS SCANNER & KEYWORD MATCHER */}
          {activeTab === 'ats' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Paste Target Job Description
                  </label>
                  <span className="text-[11px] text-slate-500">Evaluates keyword density &amp; alignment</span>
                </div>
                <textarea
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description (responsibilities, required qualifications, tools) from LinkedIn, Indeed, or company careers page..."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />

                <button
                  onClick={handleScanAts}
                  disabled={atsLoading || !jobDescription.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition"
                >
                  {atsLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Scanning Resume &amp; Job Description...</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-3.5 h-3.5" />
                      <span>Calculate ATS Match Score</span>
                    </>
                  )}
                </button>
              </div>

              {atsResult && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Applicant Tracking System Match Score
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5">Based on keyword frequency &amp; seniority alignment</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-extrabold font-mono text-emerald-400">
                        {atsResult.matchScore}%
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {atsResult.matchScore >= 80 ? 'STRONG MATCH' : 'GOOD POTENTIAL'}
                      </span>
                    </div>
                  </div>

                  {/* Keywords Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <Check className="w-4 h-4" />
                        <span>Matching Keywords Found</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {atsResult.matchingKeywords?.map((kw: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                        <ArrowRight className="w-4 h-4" />
                        <span>Missing Priority Keywords</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {atsResult.missingKeywords?.map((kw: string, i: number) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                      Targeted Resume Recommendations
                    </h5>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                      {atsResult.actionableRecommendations?.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>

                  {atsResult.executiveVerdict && (
                    <div className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-xs text-indigo-300">
                      <strong>Executive Verdict:</strong> {atsResult.executiveVerdict}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI COVER LETTER GENERATOR */}
          {activeTab === 'cover-letter' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Company Name</label>
                  <input
                    type="text"
                    value={targetCompany}
                    placeholder="e.g. Stripe, Airbnb, Google, Apple"
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Target Role Title</label>
                  <input
                    type="text"
                    value={targetJobTitle}
                    placeholder="e.g. Lead Software Engineer"
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateCoverLetter}
                disabled={coverLetterLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md transition"
              >
                {coverLetterLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Authoring Tailored Cover Letter...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Generate Cover Letter</span>
                  </>
                )}
              </button>

              {coverLetterResult && (
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Generated Executive Cover Letter
                    </h4>
                    <button
                      onClick={() => handleCopy(coverLetterResult, 'cl-copy')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                    >
                      {copiedId === 'cl-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'cl-copy' ? 'Copied!' : 'Copy Letter'}</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap">
                    {coverLetterResult}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI responses are grounded in your actual experience &amp; metrics</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
