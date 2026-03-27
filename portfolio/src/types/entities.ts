export interface ProjectLanguage {
  name: string;
  percentage: number;
  color: string;
  icon: string; // devicon class suffix e.g. "php", "javascript"
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "AI" | "Cloud" | "DevOps" | "Automation" | "Open Source";
  thumbnailUrl: string;
  liveDemoUrl?: string;
  repoUrl?: string;
  detailedContent: string;
  technologies: string;
  languages: ProjectLanguage[];
  createdAt: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  type: "work" | "certification" | "achievement";
  startDate: string;
  endDate?: string;
  description: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  message: string;
}
