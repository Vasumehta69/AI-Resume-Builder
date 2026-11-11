import { ResumeData, AccentColor } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumeDocumentProps {
  data: ResumeData;
  scale?: number;
}

export function ResumeDocument({ data, scale = 1 }: ResumeDocumentProps) {
  const { personalInfo, experiences, education, skillGroups, projects, certifications, design } = data;
  const { template, font, spacing, accentColor, showPhoto, showDividers, uppercaseHeaders } = design;

  // Accent color map
  const colorMap: Record<AccentColor, { primary: string; secondary: string; border: string; bgSoft: string }> = {
    navy: { primary: '#1e3a8a', secondary: '#2563eb', border: '#bfdbfe', bgSoft: '#eff6ff' },
    charcoal: { primary: '#1e293b', secondary: '#475569', border: '#cbd5e1', bgSoft: '#f8fafc' },
    emerald: { primary: '#065f46', secondary: '#059669', border: '#a7f3d0', bgSoft: '#ecfdf5' },
    burgundy: { primary: '#831843', secondary: '#be123c', border: '#fbcfe8', bgSoft: '#fff1f2' },
    indigo: { primary: '#3730a3', secondary: '#4f46e5', border: '#c7d2fe', bgSoft: '#eef2ff' },
    teal: { primary: '#115e59', secondary: '#0d9488', border: '#99f6e4', bgSoft: '#f0fdfa' },
    bronze: { primary: '#78350f', secondary: '#b45309', border: '#fde68a', bgSoft: '#fffbeb' },
    obsidian: { primary: '#09090b', secondary: '#27272a', border: '#e4e4e7', bgSoft: '#fafafa' },
  };

  const colors = colorMap[accentColor] || colorMap.navy;

  const fontClass =
    font === 'serif-clean'
      ? 'font-serif-clean'
      : font === 'serif-display'
      ? 'font-serif-display'
      : font === 'mono-hybrid'
      ? 'font-sans-modern'
      : 'font-sans-modern';

  const spacingClass =
    spacing === 'compact'
      ? 'leading-snug space-y-3.5 text-[13px]'
      : spacing === 'spacious'
      ? 'leading-relaxed space-y-6 text-[14px]'
      : 'leading-normal space-y-5 text-[13.5px]';

  const headerCaseClass = uppercaseHeaders ? 'uppercase tracking-wider font-bold' : 'font-semibold tracking-tight';

  // Section Header Component
  const SectionTitle = ({ title }: { title: string }) => (
    <div className="mb-2.5">
      <h3
        className={`text-xs ${headerCaseClass} flex items-center justify-between pb-1`}
        style={{ color: colors.primary }}
      >
        <span>{title}</span>
      </h3>
      {showDividers && <div className="h-[1.5px] w-full" style={{ backgroundColor: colors.border }} />}
    </div>
  );

  return (
    <div
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
      }}
      className="transition-transform duration-200"
    >
      <div
        id="resume-sheet"
        className={`w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl mx-auto print:shadow-none print:w-full print:m-0 select-text ${fontClass}`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {/* TEMPLATE 1: MODERN EXECUTIVE (2-Column Balanced) */}
        {template === 'modern-executive' && (
          <div className="p-8 sm:p-10 min-h-[297mm] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="border-b pb-5 mb-6" style={{ borderColor: colors.border }}>
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: colors.primary }}>
                      {personalInfo.fullName || 'Your Full Name'}
                    </h1>
                    <p className="text-sm font-medium text-slate-600 tracking-wide">
                      {personalInfo.headline || 'Your Target Job Title / Specialization'}
                    </p>
                  </div>
                  {showPhoto && personalInfo.photoUrl && (
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 shrink-0"
                      style={{ borderColor: colors.secondary }}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Contact Bar */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-3">
                  {personalInfo.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{personalInfo.email}</span>
                    </span>
                  )}
                  {personalInfo.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{personalInfo.phone}</span>
                    </span>
                  )}
                  {personalInfo.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{personalInfo.location}</span>
                    </span>
                  )}
                  {personalInfo.website && (
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-600">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                    </span>
                  )}
                  {personalInfo.linkedin && (
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </span>
                  )}
                  {personalInfo.github && (
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-400" />
                      <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div className="mb-6">
                  <SectionTitle title="Executive Summary" />
                  <p className="text-xs text-slate-700 leading-relaxed text-justify">
                    {personalInfo.summary}
                  </p>
                </div>
              )}

              {/* 2-Column Split: Main Experience (70%) vs Sidebar (30%) */}
              <div className="grid grid-cols-12 gap-7">
                {/* Main Content (Experiences & Projects) */}
                <div className="col-span-8 space-y-6">
                  {/* Experience */}
                  {experiences.length > 0 && (
                    <div>
                      <SectionTitle title="Professional Experience" />
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp.id} className="space-y-1.5">
                            <div className="flex items-baseline justify-between gap-2">
                              <div>
                                <span className="font-bold text-xs text-slate-900">{exp.jobTitle}</span>
                                <span className="text-xs text-slate-600 font-medium"> · {exp.company}</span>
                              </div>
                              <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            {exp.location && (
                              <div className="text-[11px] text-slate-400 italic">{exp.location}</div>
                            )}
                            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                              {exp.bullets.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {projects.length > 0 && (
                    <div>
                      <SectionTitle title="Key Projects &amp; Initiatives" />
                      <div className="space-y-3">
                        {projects.map((proj) => (
                          <div key={proj.id} className="space-y-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                              {proj.link && (
                                <span className="text-[11px] text-indigo-600 font-mono">
                                  {proj.link.replace(/^https?:\/\//, '')}
                                </span>
                              )}
                            </div>
                            {proj.tools && proj.tools.length > 0 && (
                              <div className="text-[11px] font-mono text-slate-500">
                                Technologies: {proj.tools.join(', ')}
                              </div>
                            )}
                            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 leading-relaxed">
                              {proj.bullets.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar (Skills, Education, Certifications) */}
                <div className="col-span-4 space-y-6 border-l pl-6" style={{ borderColor: colors.border }}>
                  {/* Skills */}
                  {skillGroups.length > 0 && (
                    <div>
                      <SectionTitle title="Core Competencies" />
                      <div className="space-y-3">
                        {skillGroups.map((group) => (
                          <div key={group.id} className="space-y-1">
                            <span className="text-[11px] font-semibold text-slate-900 block">
                              {group.category}
                            </span>
                            <div className="flex flex-wrap gap-1 text-xs text-slate-700">
                              {group.items.join(' · ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {education.length > 0 && (
                    <div>
                      <SectionTitle title="Education" />
                      <div className="space-y-3">
                        {education.map((edu) => (
                          <div key={edu.id} className="space-y-0.5">
                            <span className="font-bold text-xs text-slate-900 block">{edu.degree}</span>
                            <span className="text-xs text-slate-700 block">{edu.school}</span>
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                              <span>{edu.startDate} – {edu.endDate}</span>
                              {edu.location && <span>{edu.location}</span>}
                            </div>
                            {edu.gpaOrHonors && (
                              <span className="text-[11px] text-emerald-700 font-medium block">
                                {edu.gpaOrHonors}
                              </span>
                            )}
                            {edu.details && (
                              <span className="text-[11px] text-slate-500 block leading-tight">
                                {edu.details}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {certifications.length > 0 && (
                    <div>
                      <SectionTitle title="Certifications" />
                      <div className="space-y-2">
                        {certifications.map((cert) => (
                          <div key={cert.id} className="text-xs space-y-0.5">
                            <span className="font-semibold text-slate-900 block">{cert.name}</span>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                              <span>{cert.issuer}</span>
                              <span>{cert.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE 2: CLASSIC HARVARD / ATS STANDARD (Single Column Pure Linear) */}
        {template === 'classic-ats' && (
          <div className="p-10 min-h-[297mm] flex flex-col justify-between">
            <div className={spacingClass}>
              {/* Centered Academic Header */}
              <div className="text-center border-b pb-4 mb-4" style={{ borderColor: colors.primary }}>
                <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-950 font-serif-clean">
                  {personalInfo.fullName || 'Full Name'}
                </h1>
                <p className="text-xs font-medium text-slate-600 mt-1">
                  {personalInfo.headline}
                </p>
                <div className="flex items-center justify-center flex-wrap gap-2 text-[11px] text-slate-600 mt-2">
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.location && personalInfo.phone && <span>·</span>}
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  {personalInfo.phone && personalInfo.email && <span>·</span>}
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.linkedin && (
                    <>
                      <span>·</span>
                      <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </>
                  )}
                  {personalInfo.github && (
                    <>
                      <span>·</span>
                      <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div>
                  <SectionTitle title="Professional Summary" />
                  <p className="text-xs text-slate-800 leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div>
                  <SectionTitle title="Experience" />
                  <div className="space-y-3.5">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-bold text-slate-950">{exp.company}</span>
                          <span className="text-slate-600 font-mono text-[11px]">{exp.location}</span>
                        </div>
                        <div className="flex items-baseline justify-between text-xs italic text-slate-700">
                          <span>{exp.jobTitle}</span>
                          <span className="font-mono text-[11px] not-italic text-slate-500">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <SectionTitle title="Education" />
                  <div className="space-y-2.5">
                    {education.map((edu) => (
                      <div key={edu.id} className="space-y-0.5 text-xs">
                        <div className="flex items-baseline justify-between">
                          <span className="font-bold text-slate-950">{edu.school}</span>
                          <span className="text-slate-600 font-mono text-[11px]">{edu.location}</span>
                        </div>
                        <div className="flex items-baseline justify-between text-slate-800 italic">
                          <span>{edu.degree}</span>
                          <span className="font-mono text-[11px] not-italic text-slate-500">
                            {edu.startDate} – {edu.endDate}
                          </span>
                        </div>
                        {edu.gpaOrHonors && (
                          <div className="text-[11px] text-slate-600 font-sans not-italic">
                            Honors: {edu.gpaOrHonors}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skillGroups.length > 0 && (
                <div>
                  <SectionTitle title="Technical Skills" />
                  <div className="space-y-1 text-xs text-slate-800">
                    {skillGroups.map((group) => (
                      <div key={group.id} className="flex items-baseline gap-2">
                        <span className="font-bold min-w-[120px] text-slate-900">{group.category}:</span>
                        <span className="text-slate-700">{group.items.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {certifications.length > 0 && (
                <div>
                  <SectionTitle title="Certifications &amp; Awards" />
                  <div className="space-y-1 text-xs text-slate-800">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex items-baseline justify-between">
                        <span><strong>{cert.name}</strong> — {cert.issuer}</span>
                        <span className="font-mono text-[11px] text-slate-500">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TEMPLATE 3: TECH MINIMALIST (Clean developer format with badges) */}
        {template === 'tech-minimalist' && (
          <div className="p-8 sm:p-10 min-h-[297mm] flex flex-col justify-between">
            <div className={spacingClass}>
              {/* Header */}
              <div className="border-b-2 pb-4 mb-4" style={{ borderColor: colors.primary }}>
                <div className="flex items-baseline justify-between">
                  <h1 className="text-2xl font-mono font-bold tracking-tight text-slate-950">
                    {personalInfo.fullName}
                  </h1>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {personalInfo.location}
                  </span>
                </div>
                <p className="text-xs font-mono font-medium text-slate-600 mt-1">
                  $ role --title "{personalInfo.headline}"
                </p>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-500 mt-2">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>· {personalInfo.phone}</span>}
                  {personalInfo.github && <span>· {personalInfo.github}</span>}
                  {personalInfo.website && <span>· {personalInfo.website}</span>}
                </div>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-700 leading-relaxed">
                  {personalInfo.summary}
                </div>
              )}

              {/* Skills as Inline Badges */}
              {skillGroups.length > 0 && (
                <div>
                  <SectionTitle title="Technologies &amp; Frameworks" />
                  <div className="space-y-2">
                    {skillGroups.map((group) => (
                      <div key={group.id} className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold text-slate-900 w-32 shrink-0">
                          {group.category}:
                        </span>
                        <div className="flex flex-wrap gap-1 font-mono text-[11px]">
                          {group.items.map((item, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div>
                  <SectionTitle title="Work History" />
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1.5">
                        <div className="flex items-baseline justify-between font-mono">
                          <span className="text-xs font-bold text-slate-950">
                            {exp.jobTitle} <span className="text-slate-500 font-normal">@ {exp.company}</span>
                          </span>
                          <span className="text-[11px] text-slate-500">
                            [{exp.startDate} :: {exp.current ? 'NOW' : exp.endDate}]
                          </span>
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <div>
                  <SectionTitle title="Projects &amp; Open Source" />
                  <div className="space-y-2.5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="space-y-1">
                        <div className="flex items-baseline justify-between font-mono text-xs">
                          <span className="font-bold text-slate-900">{proj.name}</span>
                          {proj.link && <span className="text-indigo-600 text-[11px]">{proj.link}</span>}
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-700">
                          {proj.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <SectionTitle title="Academic Credentials" />
                  <div className="space-y-2">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex items-baseline justify-between text-xs font-mono">
                        <div>
                          <span className="font-bold text-slate-900">{edu.degree}</span>
                          <span className="text-slate-600"> · {edu.school}</span>
                        </div>
                        <span className="text-slate-500 text-[11px]">{edu.startDate} – {edu.endDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TEMPLATE 4: CONTEMPORARY STUDIO (Editorial Header with Rich Accent) */}
        {template === 'contemporary-studio' && (
          <div className="min-h-[297mm] flex flex-col justify-between">
            <div>
              {/* Rich Accent Header Block */}
              <div
                className="p-8 sm:p-10 text-white"
                style={{ backgroundColor: colors.primary }}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <h1 className="text-3xl font-serif-display font-bold tracking-tight text-white">
                      {personalInfo.fullName}
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-slate-200 font-medium">
                      {personalInfo.headline}
                    </p>
                  </div>
                  {showPhoto && personalInfo.photoUrl && (
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.fullName}
                      className="w-16 h-16 rounded-lg object-cover border-2 border-white/40 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-200 pt-4 border-t border-white/20 mt-4">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>· {personalInfo.phone}</span>}
                  {personalInfo.location && <span>· {personalInfo.location}</span>}
                  {personalInfo.website && <span>· {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 sm:p-10 space-y-6">
                {personalInfo.summary && (
                  <div>
                    <h3 className="text-xs font-serif-display font-bold uppercase tracking-wider text-slate-900 mb-2">
                      Profile
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-serif-clean">
                      {personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {experiences.length > 0 && (
                  <div>
                    <h3 className="text-xs font-serif-display font-bold uppercase tracking-wider text-slate-900 mb-3 border-b pb-1" style={{ borderColor: colors.border }}>
                      Selected Experience
                    </h3>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex items-baseline justify-between text-xs">
                            <span className="font-bold text-slate-950 font-serif-display text-sm">{exp.jobTitle}</span>
                            <span className="font-mono text-[11px] text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                          </div>
                          <div className="text-xs font-medium text-slate-600 italic">{exp.company} — {exp.location}</div>
                          <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-700 pt-1">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills & Education Row */}
                <div className="grid grid-cols-2 gap-8 pt-2">
                  {skillGroups.length > 0 && (
                    <div>
                      <h3 className="text-xs font-serif-display font-bold uppercase tracking-wider text-slate-900 mb-2 border-b pb-1" style={{ borderColor: colors.border }}>
                        Expertise
                      </h3>
                      <div className="space-y-2 text-xs">
                        {skillGroups.map((group) => (
                          <div key={group.id}>
                            <span className="font-bold text-slate-900 block">{group.category}</span>
                            <span className="text-slate-600">{group.items.join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {education.length > 0 && (
                    <div>
                      <h3 className="text-xs font-serif-display font-bold uppercase tracking-wider text-slate-900 mb-2 border-b pb-1" style={{ borderColor: colors.border }}>
                        Education
                      </h3>
                      <div className="space-y-2 text-xs">
                        {education.map((edu) => (
                          <div key={edu.id}>
                            <span className="font-bold text-slate-900 block">{edu.degree}</span>
                            <span className="text-slate-600 block">{edu.school}</span>
                            <span className="text-slate-400 font-mono text-[11px]">{edu.startDate} – {edu.endDate}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE 5: NORDIC CLEAN (Minimalist, spacious Scandinavian layout) */}
        {template === 'nordic-clean' && (
          <div className="p-10 min-h-[297mm] flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Curriculum Vitae</div>
                <h1 className="text-3xl font-light tracking-tight text-slate-900">
                  {personalInfo.fullName}
                </h1>
                <p className="text-xs tracking-wider text-slate-600 font-medium">
                  {personalInfo.headline}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>{personalInfo.email}</span>
                  <span>{personalInfo.phone}</span>
                  <span>{personalInfo.location}</span>
                  {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div className="border-l-2 pl-4 py-1" style={{ borderColor: colors.primary }}>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Work Experience</div>
                  <div className="space-y-5">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-[11px] font-mono text-slate-400">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </div>
                        <div className="col-span-9 space-y-1.5">
                          <div className="text-xs font-semibold text-slate-900">
                            {exp.jobTitle} <span className="font-normal text-slate-500">at {exp.company}</span>
                          </div>
                          <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-600">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Skills Grid */}
              <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                {education.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Education</div>
                    {education.map((edu) => (
                      <div key={edu.id} className="text-xs space-y-0.5">
                        <div className="font-medium text-slate-900">{edu.degree}</div>
                        <div className="text-slate-500">{edu.school} ({edu.startDate} – {edu.endDate})</div>
                      </div>
                    ))}
                  </div>
                )}

                {skillGroups.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Skills</div>
                    {skillGroups.map((group) => (
                      <div key={group.id} className="text-xs">
                        <span className="font-medium text-slate-900">{group.category}: </span>
                        <span className="text-slate-600">{group.items.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATE 6: CORPORATE IVY (Centered prestige with double rules) */}
        {template === 'corporate-ivy' && (
          <div className="p-10 min-h-[297mm] flex flex-col justify-between font-serif-clean">
            <div className={spacingClass}>
              {/* Header */}
              <div className="text-center space-y-1 mb-5">
                <h1 className="text-2xl font-bold tracking-normal text-slate-900">
                  {personalInfo.fullName}
                </h1>
                <p className="text-xs italic text-slate-600">{personalInfo.headline}</p>
                <div className="h-[1px] bg-slate-800 my-2" />
                <div className="h-[0.5px] bg-slate-400 mb-2" />
                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-600">
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  <span>·</span>
                  {personalInfo.phone && <span>{personalInfo.phone}</span>}
                  <span>·</span>
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                </div>
              </div>

              {personalInfo.summary && (
                <div>
                  <SectionTitle title="Summary of Qualifications" />
                  <p className="text-xs text-slate-800 leading-relaxed text-justify">
                    {personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {experiences.length > 0 && (
                <div>
                  <SectionTitle title="Professional History" />
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex items-baseline justify-between text-xs font-bold text-slate-900">
                          <span>{exp.company}</span>
                          <span className="font-normal font-sans text-[11px] text-slate-600">{exp.location}</span>
                        </div>
                        <div className="flex items-baseline justify-between text-xs italic text-slate-700">
                          <span>{exp.jobTitle}</span>
                          <span className="font-sans text-[11px] not-italic text-slate-500">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-800">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <SectionTitle title="Education" />
                  <div className="space-y-2 text-xs">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex items-baseline justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{edu.school}</span>
                          <span className="italic text-slate-700"> — {edu.degree}</span>
                        </div>
                        <span className="font-sans text-[11px] text-slate-500">{edu.startDate} – {edu.endDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skillGroups.length > 0 && (
                <div>
                  <SectionTitle title="Areas of Expertise" />
                  <div className="space-y-1 text-xs text-slate-800">
                    {skillGroups.map((group) => (
                      <div key={group.id} className="flex gap-2">
                        <span className="font-bold min-w-[120px] text-slate-900">{group.category}:</span>
                        <span className="text-slate-700">{group.items.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
