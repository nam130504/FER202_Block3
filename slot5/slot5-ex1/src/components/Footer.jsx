import React from "react";

const box = {
  marginTop: 40,
  borderTop: "1px solid #e5e7eb",
  background: "#f8faf9",
};
const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "22px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#475569"
};
const right = { display: "flex", gap: 14, fontSize: 18 };

export default function Footer() {
  return (
    <footer style={box}>
      <div style={container}>
        <span>Made with ❤️ and 🥑</span>
        <div style={right}>
          <a href="#ig" aria-label="Instagram">📸</a>
          <a href="#x" aria-label="X">🦋</a>
          <a href="#tt" aria-label="TikTok">🎵</a>
        </div>
      </div>
    </footer>
  );
}
