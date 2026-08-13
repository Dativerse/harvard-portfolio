"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiDownload } from "react-icons/hi";
import ResumeHTML from "@/components/resume/ResumeHTML";
import { resumes } from "@/lib/resume/data";

type ViewMode = "web" | "pdf";

const cvTypeOptions = Object.keys(resumes).map((id) => ({
  id,
  label: id === "default" ? "Main CV" : id.charAt(0).toUpperCase() + id.slice(1),
}));

function PdfFrame({ src, cvType }: { src: string; cvType: string }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-mono animate-pulse">generating_pdf({cvType})...</p>
        </div>
      )}
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
        className="w-full h-full border-none"
        title="Resume Preview"
        onLoad={() => setLoading(false)}
      />
    </>
  );
}

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cvTypeParam = searchParams.get("cvType")?.toLowerCase();
  const cvType = cvTypeParam && resumes[cvTypeParam] ? cvTypeParam : "default";
  const [viewMode, setViewMode] = useState<ViewMode>("web");

  const currentData = resumes[cvType];
  // Static export pre-renders one PDF per known `cvType` (see
  // app/api/resume/pdf/[cvType]/route.tsx) — no query-driven server logic.
  const pdfSrc = `/api/resume/pdf/${encodeURIComponent(cvType)}`;
  const downloadFilename = `Resume_${cvType}_${currentData.personal.name.replace(/\s+/g, "_")}.pdf`;

  const handleTypeChange = (typeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cvType", typeId);
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Resume Navigation Bar */}
      <nav className="z-10 bg-gray-800 border-b border-gray-700 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-mono text-sm hidden sm:block">
            <span className="text-blue-400">./</span>resume_preview
          </h1>

          {cvTypeOptions.length > 1 && (
            <div className="flex items-center bg-gray-900/50 p-1 rounded-lg border border-gray-700">
              {cvTypeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleTypeChange(option.id)}
                  className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
                    cvType === option.id
                      ? "bg-blue-600 text-white font-bold"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center bg-gray-900/50 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setViewMode("web")}
              className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
                viewMode === "web" ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Web Preview
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
                viewMode === "pdf" ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              PDF View
            </button>
          </div>
        </div>

        <a
          href={pdfSrc}
          download={downloadFilename}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-mono text-sm"
        >
          <HiDownload className="w-4 h-4" />
          <span>download_pdf()</span>
        </a>
      </nav>

      {/* Preview Area */}
      <div className="flex-1 relative bg-gray-900 overflow-hidden">
        {viewMode === "web" ? (
          <div className="w-full h-full overflow-y-auto p-4 sm:p-6 bg-gray-900">
            <ResumeHTML data={currentData} />
          </div>
        ) : (
          <PdfFrame key={cvType} src={pdfSrc} cvType={cvType} />
        )}
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-900">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ResumeContent />
    </Suspense>
  );
}
