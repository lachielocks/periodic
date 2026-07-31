import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a221c",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 18,
            background: "#3d7a8c",
            display: "flex",
            flexDirection: "column",
            padding: 16,
            color: "#f0f8fa",
          }}
        >
          <div style={{ fontSize: 22, fontFamily: "monospace", opacity: 0.85 }}>
            1
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            H
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
