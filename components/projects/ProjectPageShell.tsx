import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface MetaItem {
  label: string;
  value: string;
}

interface ActionLink {
  label: string;
  href: string;
  icon?: "github" | "external";
}

interface ProjectPageShellProps {
  /** Small pill above the title, e.g. "Internal Tool" or "Personal Project". */
  eyebrow: string;
  title: string;
  description: string;
  meta?: MetaItem[];
  actions?: ActionLink[];
  techStack?: string[];
  /** One card per bullet — reuses the resume's `achievements` list. */
  highlights?: string[];
  footerNote: string;
}

export default function ProjectPageShell({
  eyebrow,
  title,
  description,
  meta = [],
  actions = [],
  techStack = [],
  highlights = [],
  footerNote,
}: ProjectPageShellProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
      <header className="max-w-5xl w-full mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-mono"
        >
          <HiArrowLeft className="w-4 h-4" />
          <span>back_to_resume()</span>
        </Link>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-10">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950/40 p-8 sm:p-10 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-4 max-w-3xl relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-mono">
              <span>{eyebrow}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">{title}</h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{description}</p>

            {meta.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-xs font-mono text-gray-400">
                {meta.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-4">
                    {index > 0 && <span className="text-gray-600">•</span>}
                    <span>
                      {item.label}: <span className="text-gray-200 font-semibold">{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {actions.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 pt-6">
                {actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-lg transition-all border border-gray-700 hover:border-gray-600 active:scale-95"
                  >
                    {action.icon === "github" ? (
                      <FaGithub className="w-5 h-5" />
                    ) : (
                      <FaExternalLinkAlt className="w-4 h-4" />
                    )}
                    <span>{action.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs text-gray-300 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Highlights</h2>
            <ul className="space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 bg-gray-900/60 p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <span className="text-blue-400 mt-0.5" aria-hidden>
                    ▹
                  </span>
                  <span className="text-sm text-gray-300 leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="border-t border-gray-900 py-6 text-center text-xs text-gray-500">
        <span>{footerNote}</span>
      </footer>
    </div>
  );
}
