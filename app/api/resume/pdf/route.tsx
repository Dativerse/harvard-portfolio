import { renderToBuffer } from "@react-pdf/renderer";
import ResumePDF from "@/components/resume/ResumePDF";
import { resumes } from "@/lib/resume/data";

// @react-pdf/renderer needs Node APIs (fs, streams) to render — not available on Edge.
export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cvType = (url.searchParams.get("cvType") || "default").toLowerCase();
  const download = url.searchParams.get("download") === "1";

  const data = resumes[cvType] ?? resumes.default;
  if (!data) {
    return new Response("Resume data not found", { status: 404 });
  }

  const buffer = await renderToBuffer(
    <ResumePDF data={data} type={cvType} origin={url.origin} />
  );

  const filename = `Resume_${cvType}_${data.personal.name.replace(/\s+/g, "_")}.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
