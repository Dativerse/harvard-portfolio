import { HiExternalLink, HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { ResumeData } from "@/lib/resume/types";

interface ResumeHTMLProps {
  data: ResumeData;
  /** Origin to prefix relative project links with (e.g. "https://example.com"). Leave empty for relative links. */
  origin?: string;
}

const formatUrl = (url?: string | null, origin = ""): string | null => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
    return url;
  }
  return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function ResumeHTML({ data, origin = "" }: ResumeHTMLProps) {
  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-gray-900 shadow-2xl rounded-sm p-6 sm:p-10 font-sans leading-relaxed text-sm my-6 border border-gray-200">
      {/* Header Section */}
      <header className="text-center mb-5 pb-3 border-b border-gray-300">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
          {data.personal.name}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-700">
          {data.personal.location && (
            <div className="flex items-center gap-1">
              <HiLocationMarker className="w-3.5 h-3.5 text-gray-500" />
              <span>{data.personal.location}</span>
            </div>
          )}

          {data.personal.email && (
            <>
              {data.personal.location && <span className="text-gray-400">|</span>}
              <div className="flex items-center gap-1">
                <HiMail className="w-3.5 h-3.5 text-gray-500" />
                <a
                  href={`mailto:${data.personal.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {data.personal.email}
                </a>
              </div>
            </>
          )}

          {data.personal.phone && (
            <>
              <span className="text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <HiPhone className="w-3.5 h-3.5 text-gray-500" />
                <a
                  href={`tel:${data.personal.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {data.personal.phone}
                </a>
              </div>
            </>
          )}

          {data.personal.github && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                title={`GitHub: ${data.personal.github.replace(/^https?:\/\//, "")}`}
                aria-label="GitHub profile (opens in a new tab)"
                className="group flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
            </>
          )}

          {data.personal.linkedin && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title={`LinkedIn: ${data.personal.linkedin.replace(/^https?:\/\//, "")}`}
                aria-label="LinkedIn profile (opens in a new tab)"
                className="group flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-white text-blue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:shadow-md"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
            </>
          )}

          {data.personal.website && (
            <>
              <span className="text-gray-400">|</span>
              <a
                href={data.personal.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                {data.personal.website.replace(/^https?:\/\//, "")}
              </a>
            </>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {data.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
            Summary
          </h2>
          <p className="text-xs text-gray-800 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Education Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
          Education
        </h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-gray-900 text-sm">{edu.institution}</span>
              <span className="text-xs italic text-gray-600">
                {edu.startYear ? `${edu.startYear} – ` : ""}
                {edu.graduationYear} | {edu.location}
              </span>
            </div>
            <div className="text-xs italic text-gray-700">
              {edu.degree}
              {edu.gpa ? `. GPA: ${edu.gpa}` : ""}
            </div>
            {edu.bullets && edu.bullets.length > 0 && (
              <ul className="list-disc list-inside ml-2 text-xs text-gray-800 space-y-0.5 mt-1">
                {edu.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
          Experience
        </h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-gray-900 text-sm">{exp.company}</span>
              <span className="text-xs text-gray-600">
                {exp.startDate} – {exp.endDate} | {exp.location}
              </span>
            </div>
            <div className="text-xs italic text-gray-700 mb-1">{exp.position}</div>

            {exp.achievements && (
              <ul className="list-disc list-inside ml-2 text-xs text-gray-800 space-y-0.5">
                {exp.achievements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}

            {exp.projects &&
              exp.projects.map((project, pIdx) => {
                const projectUrl = formatUrl(
                  project.link || project.url || project.githubUrl || project.liveUrl || project.evidence,
                  origin
                );

                return (
                  <div key={pIdx} className="mt-2 ml-2 pl-2 border-l-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      {projectUrl ? (
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1 text-xs"
                        >
                          <span>{project.name}</span>
                          <HiExternalLink className="w-3 h-3 inline-block" />
                        </a>
                      ) : (
                        <span className="font-bold text-gray-900 text-xs">{project.name}</span>
                      )}
                      {project.period && <span className="text-[11px] text-gray-500">{project.period}</span>}
                    </div>
                    {project.role && (
                      <div className="text-[11px] text-blue-600 mb-0.5">
                        {project.role} {project.techStack?.length ? `| Tech: ${project.techStack.join(", ")}` : ""}
                      </div>
                    )}
                    {project.achievements && (
                      <ul className="list-disc list-inside ml-2 text-xs text-gray-800 space-y-0.5">
                        {project.achievements.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        ))}
      </section>

      {/* Projects Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
          Projects
        </h2>
        {data.projects.map((project, index) => {
          const rawUrl = project.evidence || project.link || project.url || project.githubUrl || project.liveUrl;
          const projectUrl = formatUrl(rawUrl, origin);

          return (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-baseline">
                <div className="flex items-center gap-1.5">
                  {projectUrl ? (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-gray-900 hover:text-blue-600 hover:underline flex items-center gap-1 text-sm"
                    >
                      <span>{project.title}</span>
                      <HiExternalLink className="w-3.5 h-3.5 text-blue-600 inline-block" />
                    </a>
                  ) : (
                    <span className="font-bold text-gray-900 text-sm">{project.title}</span>
                  )}
                </div>
                <span className="text-xs text-gray-600">
                  {project.period}
                  {project.location ? ` | ${project.location}` : ""}
                </span>
              </div>
              {project.role && <div className="text-xs italic text-gray-700 mb-1">{project.role}</div>}

              {project.achievements && (
                <ul className="list-disc list-inside ml-2 text-xs text-gray-800 space-y-0.5">
                  {project.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>

      {/* Technical Skills Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
          Skills
        </h2>
        <div className="space-y-1 text-xs">
          {data.skills.map((skillCat, index) => (
            <div key={index}>
              <span className="font-bold text-gray-900">{skillCat.category}: </span>
              <span className="text-gray-800">{skillCat.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Coding Profiles Section */}
      {data.codingProfiles && data.codingProfiles.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
            Coding Profiles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {data.codingProfiles.map((profile, index) => (
              <div key={index} className="flex items-center gap-1">
                <span>• {profile.platform} - </span>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {profile.username}
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {data.achievements && data.achievements.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
            Achievements
          </h2>
          <ul className="list-disc list-inside ml-2 text-xs text-gray-800 space-y-0.5">
            {data.achievements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside ml-2 text-xs text-gray-800 space-y-0.5">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
