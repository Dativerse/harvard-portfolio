# harvard-portfolio

A standalone Next.js (App Router) implementation of the resume-display
feature.

## What's here

- **`/` (`app/page.tsx`)** — the resume viewer: a "Web Preview" /
  "PDF View" toggle plus a download button.
- **`components/resume/ResumeHTML.tsx`** — the web-rendered resume
  (plain React + Tailwind, no PDF dependency).
- **`components/resume/ResumePDF.tsx`** — the same resume laid out with
  [`@react-pdf/renderer`](https://react-pdf.org/) primitives.
- **`app/api/resume/pdf/route.tsx`** — a Route Handler that renders the
  PDF **on the server** (`renderToBuffer`, Node runtime) and streams it
  back as `application/pdf`. This is the fullstack difference from the
  original React Router version, which generated the PDF blob in the
  browser: the "PDF View" tab is just an `<iframe>` pointed at this
  endpoint, and the download button links to it with `?download=1`
  (sets `Content-Disposition: attachment`).
- **`lib/resume/data.ts`** — resume content. `resumes` is a
  `Record<cvType, ResumeData>`; add more keys to get more CV variants
  switchable via `?cvType=` and the top-nav tabs.
- **`lib/resume/types.ts`** — the shared `ResumeData` shape.

## Before you ship this

`lib/resume/data.ts` is filled with placeholder content ("Your Name",
`you@example.com`, etc.) — replace it with your real resume data.

## Develop

```bash
npm install
npm run dev
```

## Notes

- `next.config.ts` stubs out `canvas` (an optional native dependency of
  `@react-pdf/renderer` this app doesn't need) for both Webpack and
  Turbopack builds.
- The PDF route runs on the Node.js runtime (`export const runtime =
  "nodejs"`) since `@react-pdf/renderer` needs Node APIs unavailable on
  Edge.
