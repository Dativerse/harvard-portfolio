// Placeholder resume content — replace every field below with your own details.
// The `resumes` map lets you keep multiple CV variants (e.g. "default", "backend")
// and switch between them via the `cvType` query param on the resume page.
import type { ResumeData } from "./types";

const defaultResume: ResumeData = {
  personal: {
    name: "Your Name",
    title: "Software Engineer",
    email: "you@example.com",
    phone: "+1 (555) 000-0000",
    location: "City, Country",
    github: "https://github.com/your-handle",
    linkedin: "https://linkedin.com/in/your-handle",
    website: null,
  },
  summary:
    "Short summary of who you are, what you build, and what you're looking for. Two to three sentences.",
  education: [
    {
      institution: "Your University",
      degree: "B.S. in Computer Science",
      location: "City, Country",
      graduationYear: "Expected 2027",
      startYear: null,
      gpa: "3.8/4.0",
      bullets: ["AWS Certified Solutions Architect – Associate (2025)."],
    },
  ],
  experience: [
    {
      company: "Company Name",
      position: "Software Engineer Intern",
      location: "City, Country",
      startDate: "June 2025",
      endDate: "August 2025",
      achievements: [
        "Describe an impact-focused achievement with a measurable outcome.",
        "Describe another achievement, tools/technologies used, and the result.",
      ],
    },
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python"] },
    { category: "Frameworks", items: ["Next.js", "React", "Node.js"] },
    { category: "Tools", items: ["Git", "Docker", "PostgreSQL"] },
  ],
  projects: [
    {
      title: "Project Name",
      role: "Full-stack Developer",
      location: "City, Country",
      period: "Jan 2025 – Mar 2025",
      githubUrl: "https://github.com/your-handle/project",
      // `url` takes priority over `githubUrl` in the resume's link resolution,
      // so this routes to the scaffold detail page below instead of GitHub.
      // Remove `url` if you'd rather link straight to the repo.
      url: "/projects/project-name",
      achievements: [
        "Summarize the problem, your approach, and the outcome in one line.",
        "Call out a technical decision worth highlighting.",
      ],
    },
  ],
  codingProfiles: [],
  certifications: [
    "AWS Certified Solutions Architect – Associate (2025)",
    "Meta Front-End Developer Professional Certificate (2024)",
  ],
  achievements: [],
};

export const resumes: Record<string, ResumeData> = {
  default: defaultResume,
};

export const resumeData = resumes.default;

/** Finds a top-level project (e.g. "Project Name") by title. */
export function findProject(title: string) {
  return resumeData.projects.find((p) => p.title === title) ?? null;
}
