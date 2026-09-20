import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// Shared by src/app/opengraph-image.tsx and src/app/twitter-image.tsx —
// both are required Next.js file-convention names, so the render logic
// lives here once instead of being duplicated in each.
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "#02080E",
        }}
      >
        <div
          style={{ display: "flex", width: 72, height: 10, background: "#B7E401", marginBottom: 40 }}
        />
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#ffffff" }}>
          Ayush Meshram
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: "#B7E401" }}>
          Associate Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 20,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 880,
          }}
        >
          Building systems that hold up.
        </div>
      </div>
    ),
    ogImageSize
  );
}
