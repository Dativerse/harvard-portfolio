export interface PersonalInfo {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  github?: string | null;
  linkedin?: string | null;
  website?: string | null;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  graduationYear: string;
  startYear?: string | null;
  gpa?: string;
  bullets?: string[];
}

export interface ExperienceProject {
  name: string;
  period?: string;
  role?: string;
  techStack?: string[];
  achievements?: string[];
  link?: string;
  url?: string;
  githubUrl?: string;
  liveUrl?: string;
  evidence?: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements?: string[];
  projects?: ExperienceProject[];
}

export interface ProjectItem {
  title: string;
  role?: string;
  period?: string;
  location?: string;
  evidence?: string;
  link?: string;
  url?: string;
  githubUrl?: string;
  liveUrl?: string;
  achievements?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CodingProfile {
  platform: string;
  username: string;
  url: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary?: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  codingProfiles?: CodingProfile[];
  certifications?: string[];
  achievements?: string[];
}

export type CvType = string;
