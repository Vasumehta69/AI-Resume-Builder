export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl?: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpaOrHonors?: string;
  details?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  link?: string;
  tools?: string[];
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export type TemplateId =
  | 'modern-executive'
  | 'classic-ats'
  | 'tech-minimalist'
  | 'contemporary-studio'
  | 'nordic-clean'
  | 'corporate-ivy';

export type FontChoice = 'sans-modern' | 'serif-clean' | 'serif-display' | 'mono-hybrid';
export type SpacingChoice = 'compact' | 'balanced' | 'spacious';
export type AccentColor =
  | 'navy'
  | 'charcoal'
  | 'emerald'
  | 'burgundy'
  | 'indigo'
  | 'teal'
  | 'bronze'
  | 'obsidian';

export interface ResumeDesign {
  template: TemplateId;
  font: FontChoice;
  spacing: SpacingChoice;
  accentColor: AccentColor;
  showPhoto: boolean;
  showDividers: boolean;
  uppercaseHeaders: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: WorkExperience[];
  education: Education[];
  skillGroups: SkillGroup[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  design: ResumeDesign;
}
