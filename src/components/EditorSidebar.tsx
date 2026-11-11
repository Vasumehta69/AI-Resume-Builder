import { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderKanban,
  Award,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Palette,
  LayoutTemplate,
  Sliders,
  RotateCcw
} from 'lucide-react';
import {
  ResumeData,
  WorkExperience,
  Education,
  SkillGroup,
  ProjectItem,
  CertificationItem,
  TemplateId,
  AccentColor,
  FontChoice,
  SpacingChoice
} from '../types/resume';
import { RESUME_PRESETS } from '../data/resumeLibrary';

interface EditorSidebarProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  onOpenPhraseVault: (targetExpId?: string) => void;
  onOpenAiAssistant: () => void;
  onSelectPreset: (presetData: ResumeData) => void;
}

export function EditorSidebar({
  data,
  onChange,
  onOpenPhraseVault,
  onOpenAiAssistant,
  onSelectPreset,
}: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'presets'>('content');
  const [contentSection, setContentSection] = useState<
    'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications'
  >('personal');

  const [expandedExpId, setExpandedExpId] = useState<string | null>(data.experiences[0]?.id || null);

  // Update personal info
  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Update design
  const updateDesign = (field: keyof typeof data.design, value: any) => {
    onChange({
      ...data,
      design: {
        ...data.design,
        [field]: value,
      },
    });
  };

  // Experiences CRUD
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: 'Senior Specialist',
      company: 'Acme Corporation',
      location: 'City, Country',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      bullets: ['Spearheaded strategic initiatives delivering measurable operational gains.'],
    };
    onChange({ ...data, experiences: [newExp, ...data.experiences] });
    setExpandedExpId(newExp.id);
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experiences: data.experiences.filter((e) => e.id !== id) });
  };

  const updateExperience = (id: string, updates: Partial<WorkExperience>) => {
    onChange({
      ...data,
      experiences: data.experiences.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const addExpBullet = (expId: string) => {
    const exp = data.experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      bullets: [...exp.bullets, 'Engineered high-impact process improvements optimizing team delivery.'],
    });
  };

  const updateExpBullet = (expId: string, index: number, text: string) => {
    const exp = data.experiences.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bullets];
    newBullets[index] = text;
    updateExperience(expId, { bullets: newBullets });
  };

  const removeExpBullet = (expId: string, index: number) => {
    const exp = data.experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      bullets: exp.bullets.filter((_, i) => i !== index),
    });
  };

  // Education CRUD
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: 'B.S. in Computer Science',
      school: 'State University',
      location: 'City, State',
      startDate: '2016',
      endDate: '2020',
      gpaOrHonors: 'Cum Laude',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    onChange({
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };

  // Skills CRUD
  const addSkillGroup = () => {
    const newGroup: SkillGroup = {
      id: `sk-${Date.now()}`,
      category: 'New Competency',
      items: ['Skill 1', 'Skill 2', 'Tool 3'],
    };
    onChange({ ...data, skillGroups: [...data.skillGroups, newGroup] });
  };

  const updateSkillCategory = (id: string, category: string) => {
    onChange({
      ...data,
      skillGroups: data.skillGroups.map((g) => (g.id === id ? { ...g, category } : g)),
    });
  };

  const updateSkillItems = (id: string, itemsStr: string) => {
    const items = itemsStr.split(',').map((s) => s.trim()).filter(Boolean);
    onChange({
      ...data,
      skillGroups: data.skillGroups.map((g) => (g.id === id ? { ...g, items } : g)),
    });
  };

  const removeSkillGroup = (id: string) => {
    onChange({ ...data, skillGroups: data.skillGroups.filter((g) => g.id !== id) });
  };

  // Projects CRUD
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: 'Open Source Initiative',
      role: 'Creator & Maintainer',
      link: 'https://github.com/project',
      tools: ['TypeScript', 'Node.js'],
      bullets: ['Developed high-performance utility library used by 5,000+ developers.'],
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  // Certifications CRUD
  const addCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'Professional Certification',
      issuer: 'Accredited Institute',
      date: '2024',
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const removeCert = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter((c) => c.id !== id) });
  };

  const updateCert = (id: string, updates: Partial<CertificationItem>) => {
    onChange({
      ...data,
      certifications: data.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  // Templates list
  const templates: { id: TemplateId; name: string; tag: string; desc: string }[] = [
    { id: 'modern-executive', name: 'Modern Executive', tag: 'Top Pick', desc: 'Balanced 2-column sidebar with sleek contact hierarchy' },
    { id: 'classic-ats', name: 'Classic Harvard ATS', tag: 'ATS Safe', desc: 'Single-column academic serif layout for traditional corporate roles' },
    { id: 'tech-minimalist', name: 'Tech Minimalist', tag: 'Devs & Data', desc: 'High-density developer layout with monospace timestamps and tag badges' },
    { id: 'contemporary-studio', name: 'Contemporary Studio', tag: 'Design', desc: 'Rich accent banner with Playfair display editorial headings' },
    { id: 'nordic-clean', name: 'Nordic Clean', tag: 'Minimal', desc: 'Understated Scandinavian elegance with ample whitespace' },
    { id: 'corporate-ivy', name: 'Corporate Ivy', tag: 'Finance/Law', desc: 'Centered header with double hairline rules for executive prestige' },
  ];

  // Palette list
  const accentColors: { id: AccentColor; name: string; hex: string }[] = [
    { id: 'navy', name: 'Deep Navy', hex: '#1e3a8a' },
    { id: 'charcoal', name: 'Charcoal', hex: '#1e293b' },
    { id: 'emerald', name: 'Forest Emerald', hex: '#065f46' },
    { id: 'burgundy', name: 'Deep Burgundy', hex: '#831843' },
    { id: 'indigo', name: 'Royal Indigo', hex: '#3730a3' },
    { id: 'teal', name: 'Modern Teal', hex: '#115e59' },
    { id: 'bronze', name: 'Warm Bronze', hex: '#78350f' },
    { id: 'obsidian', name: 'Obsidian Black', hex: '#09090b' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* Top Sidebar Tab Navigation */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'content' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Content</span>
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'design' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Design</span>
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'presets' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* TAB 1: CONTENT EDITOR */}
        {activeTab === 'content' && (
          <div className="space-y-5">
            {/* Horizontal Sub-Navigation for Content Sections */}
            <div className="flex flex-wrap gap-1 border-b border-slate-800 pb-3">
              {[
                { id: 'personal', label: 'Personal', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'skills', label: 'Skills', icon: Wrench },
                { id: 'projects', label: 'Projects', icon: FolderKanban },
                { id: 'certifications', label: 'Certs', icon: Award },
              ].map((sec) => {
                const Icon = sec.icon;
                const isActive = contentSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setContentSection(sec.id as any)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                      isActive
                        ? 'bg-slate-800 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 1. PERSONAL INFO SECTION */}
            {contentSection === 'personal' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Candidate Profile &amp; Contact
                  </h3>
                  <button
                    onClick={onOpenAiAssistant}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Assistant</span>
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-400 font-medium block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={data.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="e.g. Alexander Vance"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-medium block mb-1">Target Professional Headline</label>
                    <input
                      type="text"
                      value={data.personalInfo.headline}
                      onChange={(e) => updatePersonalInfo('headline', e.target.value)}
                      placeholder="e.g. Staff Full-Stack Engineer"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">Email</label>
                      <input
                        type="email"
                        value={data.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        placeholder="alex@domain.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">Phone</label>
                      <input
                        type="text"
                        value={data.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">Location</label>
                      <input
                        type="text"
                        value={data.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">Portfolio / Website</label>
                      <input
                        type="text"
                        value={data.personalInfo.website}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        placeholder="https://yoursite.dev"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">LinkedIn Profile</label>
                      <input
                        type="text"
                        value={data.personalInfo.linkedin}
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/alex"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-medium block mb-1">GitHub / Gitlab</label>
                      <input
                        type="text"
                        value={data.personalInfo.github}
                        onChange={(e) => updatePersonalInfo('github', e.target.value)}
                        placeholder="github.com/alex"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-400 font-medium">Professional Summary</label>
                      <button
                        onClick={onOpenAiAssistant}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Generate with AI</span>
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      value={data.personalInfo.summary}
                      onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                      placeholder="Concise 2-3 sentence overview of your career trajectory, core domain strengths, and measurable impact."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. EXPERIENCE SECTION */}
            {contentSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Work History ({data.experiences.length})
                  </h3>
                  <button
                    onClick={addExperience}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.experiences.map((exp, index) => {
                    const isExpanded = expandedExpId === exp.id;
                    return (
                      <div
                        key={exp.id}
                        className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden"
                      >
                        {/* Header bar */}
                        <div
                          onClick={() => setExpandedExpId(isExpanded ? null : exp.id)}
                          className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition"
                        >
                          <div className="flex items-center gap-2">
                            {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                            <div>
                              <span className="text-xs font-bold text-white block">
                                {exp.jobTitle || 'Role Title'}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {exp.company || 'Company'} · {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeExperience(exp.id);
                            }}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                            title="Delete role"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Collapsible form */}
                        {isExpanded && (
                          <div className="p-3 border-t border-slate-800 space-y-3 text-xs bg-slate-900/40">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-slate-400 font-medium block mb-1">Job Title</label>
                                <input
                                  type="text"
                                  value={exp.jobTitle}
                                  onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                                />
                              </div>
                              <div>
                                <label className="text-slate-400 font-medium block mb-1">Company</label>
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-slate-400 font-medium block mb-1">Location</label>
                                <input
                                  type="text"
                                  value={exp.location}
                                  onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                                />
                              </div>
                              <div>
                                <label className="text-slate-400 font-medium block mb-1">Start Date</label>
                                <input
                                  type="text"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                  placeholder="YYYY-MM"
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                                />
                              </div>
                              <div>
                                <label className="text-slate-400 font-medium block mb-1">End Date</label>
                                <input
                                  type="text"
                                  disabled={exp.current}
                                  value={exp.current ? 'Present' : exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                  placeholder="YYYY-MM"
                                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 disabled:opacity-50"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`curr-${exp.id}`}
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                                className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
                              />
                              <label htmlFor={`curr-${exp.id}`} className="text-slate-300 text-xs">
                                I currently work here
                              </label>
                            </div>

                            {/* Bullets List */}
                            <div className="space-y-2 pt-2 border-t border-slate-800/80">
                              <div className="flex items-center justify-between">
                                <label className="text-slate-300 font-semibold text-[11px] uppercase tracking-wider">
                                  Accomplishment Bullets ({exp.bullets.length})
                                </label>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => onOpenPhraseVault(exp.id)}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    <span>Library Vault</span>
                                  </button>
                                  <button
                                    onClick={onOpenAiAssistant}
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-400 hover:text-purple-300"
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    <span>AI Optimize</span>
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {exp.bullets.map((b, bIdx) => (
                                  <div key={bIdx} className="flex items-start gap-2">
                                    <textarea
                                      rows={2}
                                      value={b}
                                      onChange={(e) => updateExpBullet(exp.id, bIdx, e.target.value)}
                                      className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed focus:border-indigo-500"
                                    />
                                    <button
                                      onClick={() => removeExpBullet(exp.id, bIdx)}
                                      className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                                      title="Remove bullet"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              <button
                                onClick={() => addExpBullet(exp.id)}
                                className="w-full py-1.5 border border-dashed border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white text-xs transition flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Add Bullet Point</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. EDUCATION SECTION */}
            {contentSection === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Education Degrees ({data.education.length})
                  </h3>
                  <button
                    onClick={addEducation}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{edu.school || 'University'}</span>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-slate-400 text-[11px] block mb-1">Degree Title</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-[11px] block mb-1">Institution</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-slate-400 text-[11px] block mb-1">Start Date</label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-[11px] block mb-1">End Date</label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 text-[11px] block mb-1">GPA / Honors</label>
                          <input
                            type="text"
                            value={edu.gpaOrHonors || ''}
                            onChange={(e) => updateEducation(edu.id, { gpaOrHonors: e.target.value })}
                            placeholder="e.g. 3.9 GPA"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SKILLS SECTION */}
            {contentSection === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Competencies &amp; Skills ({data.skillGroups.length})
                  </h3>
                  <button
                    onClick={addSkillGroup}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.skillGroups.map((group) => (
                    <div key={group.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={group.category}
                          onChange={(e) => updateSkillCategory(group.id, e.target.value)}
                          className="font-bold text-white bg-transparent border-b border-slate-700 pb-0.5 focus:border-indigo-400 focus:outline-none"
                        />
                        <button
                          onClick={() => removeSkillGroup(group.id)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="text-slate-400 text-[11px] block mb-1">
                          Skills List (Comma separated)
                        </label>
                        <input
                          type="text"
                          value={group.items.join(', ')}
                          onChange={(e) => updateSkillItems(group.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. PROJECTS SECTION */}
            {contentSection === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Key Projects ({data.projects.length})
                  </h3>
                  <button
                    onClick={addProject}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                          className="font-bold text-white bg-transparent border-b border-slate-700 pb-0.5 focus:border-indigo-400 focus:outline-none"
                        />
                        <button
                          onClick={() => removeProject(proj.id)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={proj.link || ''}
                          onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                          placeholder="Project URL (e.g. github.com/...)"
                          className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                        />
                        <input
                          type="text"
                          value={proj.tools?.join(', ') || ''}
                          onChange={(e) => updateProject(proj.id, { tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                          placeholder="Tools used (e.g. React, Go, Kafka)"
                          className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={proj.bullets[0] || ''}
                        onChange={(e) => updateProject(proj.id, { bullets: [e.target.value] })}
                        placeholder="Key project accomplishment or outcome..."
                        className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. CERTIFICATIONS SECTION */}
            {contentSection === 'certifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Certifications &amp; Awards ({data.certifications.length})
                  </h3>
                  <button
                    onClick={addCert}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="p-3 rounded-xl border border-slate-800 bg-slate-950/70 flex items-center gap-2 text-xs">
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => updateCert(cert.id, { name: e.target.value })}
                          placeholder="Cert name"
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200 col-span-2"
                        />
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) => updateCert(cert.id, { issuer: e.target.value })}
                          placeholder="Issuer"
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200"
                        />
                      </div>
                      <button
                        onClick={() => removeCert(cert.id)}
                        className="p-1 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DESIGN & TEMPLATES */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Template Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <LayoutTemplate className="w-3.5 h-3.5 text-indigo-400" />
                <span>Resume Templates (6 Curated Styles)</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {templates.map((tpl) => {
                  const isSelected = data.design.template === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => updateDesign('template', tpl.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-start justify-between ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{tpl.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {tpl.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{tpl.desc}</p>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Palette */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>Accent Color Palette</span>
              </h3>

              <div className="grid grid-cols-4 gap-2">
                {accentColors.map((color) => {
                  const isSelected = data.design.accentColor === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => updateDesign('accentColor', color.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                        isSelected ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] font-medium text-slate-300 truncate w-full text-center">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography Pairing */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Font Hierarchy</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'sans-modern', name: 'Plus Jakarta Sans', sub: 'Modern Geometric' },
                  { id: 'serif-clean', name: 'Merriweather', sub: 'ATS Standard Serif' },
                  { id: 'serif-display', name: 'Playfair Display', sub: 'Executive Editorial' },
                  { id: 'mono-hybrid', name: 'JetBrains Hybrid', sub: 'Technical Monospace' },
                ].map((f) => {
                  const isSelected = data.design.font === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => updateDesign('font', f.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        isSelected ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold text-white block text-xs">{f.name}</span>
                      <span className="text-[10px] text-slate-400 block">{f.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spacing & Density */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Document Spacing &amp; Density
              </h3>

              <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                {(['compact', 'balanced', 'spacious'] as SpacingChoice[]).map((sp) => (
                  <button
                    key={sp}
                    onClick={() => updateDesign('spacing', sp)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                      data.design.spacing === sp ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Toggles */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Formatting Switches
              </h3>

              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <span className="text-slate-300">Section Divider Lines</span>
                  <input
                    type="checkbox"
                    checked={data.design.showDividers}
                    onChange={(e) => updateDesign('showDividers', e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <span className="text-slate-300">Uppercase Section Headers</span>
                  <input
                    type="checkbox"
                    checked={data.design.uppercaseHeaders}
                    onChange={(e) => updateDesign('uppercaseHeaders', e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer">
                  <span className="text-slate-300">Display Profile Avatar Photo</span>
                  <input
                    type="checkbox"
                    checked={data.design.showPhoto}
                    onChange={(e) => updateDesign('showPhoto', e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPLETE ROLE PRESETS */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                1-Click Role Presets
              </h3>
              <p className="text-xs text-slate-400">
                Load ready-to-use, metric-rich resumes tailored for specific professions.
              </p>
            </div>

            <div className="space-y-3">
              {RESUME_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-white block">{preset.name}</span>
                      <span className="text-[10px] font-mono text-indigo-400">{preset.role}</span>
                    </div>

                    <button
                      onClick={() => onSelectPreset(preset.data)}
                      className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
                    >
                      Load Preset
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {preset.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
