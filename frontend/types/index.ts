// Shared Types and Interfaces

export interface SystemData {
  name: string;
  contact: {
    email: string;
    portfolio: string;
    links: SocialLink[];
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  achievements: Achievement[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"; size?: number | string }>;
}

export interface WorkExperience {
  title: string;
  company: string;
  place: string;
  date: string;
  description: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  date: string;
  details: string;
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
  points: string[];
  url: string;
  image?: string;
}

export interface Skills {
  programming: string[];
  ai_ml: string[];
  data: string[];
  misc: string[];
  soft: string[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  points: string[];
}
