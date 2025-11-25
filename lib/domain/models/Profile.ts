// Domain Model - Profile Entity
export interface Profile {
  name: string;
  title: string;
  image: string;
  about: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: number;
}

export enum SkillCategory {
  FRONTEND = "frontend",
  REACT_ECOSYSTEM = "react_ecosystem",
  TANSTACK = "tanstack",
  UI_LIBRARIES = "ui_libraries",
  BACKEND = "backend",
  API = "api",
  DATABASE = "database",
  DEVOPS = "devops",
  TOOLS = "tools",
  TESTING = "testing",
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description?: string;
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "main" | "mini";
  technologies?: string[];
}

export interface Social {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  major: string;
  status: string;
}

export interface Contact {
  telegram: string;
  phone: string;
}

export interface CVData {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  socials: Social[];
  education: Education[];
  contact: Contact;
}
