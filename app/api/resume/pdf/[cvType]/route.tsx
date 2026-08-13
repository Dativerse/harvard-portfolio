import { renderToBuffer } from "@react-pdf/renderer";
import ResumePDF from "@/components/resume/ResumePDF";
import { resumes } from "@/lib/resume/data";

// @react-pdf/renderer needs Node APIs (fs, streams) to render — not available on Edge.
// This still only runs at `next build` time: static export has no server runtime.
export const runtime = "nodejs";

// Static export requires every dynamic segment to be enumerated at build time —
// no on-demand rendering for unknown `cvType` values.
export const dynamicParams = false;

// `next export` copies only the response body into `out/`, not the headers
// (Content-Type/Content-Disposition) captured in the build metadata — static
// file servers have no way to know these are PDFs unless the filename says
// so. Baking `.pdf` into the exported segment lets any host infer the MIME
// type from the extension alone.
export function generateStaticParams() {
  return Object.keys(resumes).map((cvType) => ({ cvType: `${cvType}.pdf` }));
}

// Absolute origin used to resolve relative links (e.g. project pages) inside
// the PDF, since a downloaded file has no browser location to resolve against.
// Set NEXT_PUBLIC_SITE_URL at build time to your deployed domain.
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

export async function GET(_request: Request, { params }: { params: Promise<{ cvType: string }> }) {
  const { cvType: cvTypeParam } = await params;
  const cvType = cvTypeParam.replace(/\.pdf$/, "");
  const data = resumes[cvType] ?? resumes.default;
  if (!data) {
    return new Response("Resume data not found", { status: 404 });
  }

  const buffer = await renderToBuffer(
    <ResumePDF data={data} type={cvType} origin={SITE_ORIGIN} />
  );

  const filename = `Resume_${cvType}_${data.personal.name.replace(/\s+/g, "_")}.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
