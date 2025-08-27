import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container-fluid px-4">
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <small>© {new Date().getFullYear()} My Store — All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
