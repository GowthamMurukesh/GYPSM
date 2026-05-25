"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import type { SiteContent } from "@/lib/types";

interface Props {
  site: SiteContent;
}

export default function AnnouncementPopup({ site }: Props) {
  const router = useRouter();
  const announcement = site?.home?.announcement;
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (announcement?.enabled && announcement?.message) {
      const t = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [announcement]);

  if (!announcement?.enabled || !announcement?.message) return null;
  if (!visible) return null;

  function dismiss(cb?: () => void) {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      cb?.();
    }, 380);
  }

  function close(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    dismiss();
  }

  function onClick() {
    dismiss(() => router.push("/contact"));
  }

  /* Split the title so the last word renders in italic orange */
  function renderTitle(title: string) {
    const words = title.split(" ");
    if (words.length === 1) {
      return (
        <em style={{ fontStyle: "italic", color: "#fb923c" }}>{title}</em>
      );
    }
    const last = words[words.length - 1];
    const rest = words.slice(0, -1).join(" ");
    return (
      <>
        <span style={{ color: "#fff" }}>{rest} </span>
        <em style={{ fontStyle: "italic", color: "#fb923c" }}>{last}</em>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Jost:wght@300;400;500;600&display=swap');

        /* ── Keyframes ── */
        @keyframes ap-backdrop-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ap-backdrop-out { from { opacity: 1; } to { opacity: 0; } }

        @keyframes ap-card-in {
          0%   { opacity: 0; transform: translateY(36px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes ap-card-out {
          0%   { opacity: 1; transform: translateY(0)    scale(1); }
          100% { opacity: 0; transform: translateY(24px) scale(0.97); }
        }
        @keyframes ap-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ap-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes ap-pulse-ring {
          0%   { box-shadow: 0 0 0 0    rgba(249,115,22,0.45); }
          100% { box-shadow: 0 0 0 10px rgba(249,115,22,0); }
        }

        /* ── Animation classes ── */
        .ap-backdrop         { animation: ap-backdrop-in  0.35s ease forwards; }
        .ap-backdrop.closing { animation: ap-backdrop-out 0.38s ease forwards; }
        .ap-card             { animation: ap-card-in  0.5s  cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .ap-card.closing     { animation: ap-card-out 0.38s cubic-bezier(0.4,0,1,1) forwards; }

        .ap-orange-line {
          display: block; height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c, #f97316);
          transform-origin: left;
          animation: ap-line-grow 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both;
        }
        .ap-accent    { animation: ap-float      7s ease-in-out infinite; }
        .ap-badge-dot { animation: ap-pulse-ring 2s ease-out   infinite; }

        /* ── Close button ── */
        .ap-close {
          display: inline-flex; align-items: center; justify-content: center;
          width: 2rem; height: 2rem;
          border: 1px solid rgba(255,255,255,0.15); border-radius: 2px;
          background: transparent; cursor: pointer;
          color: rgba(255,255,255,0.5);
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          position: absolute; top: 1.5rem; right: 1.5rem;
        }
        .ap-close:hover {
          border-color: #f97316; color: #f97316; transform: rotate(90deg);
        }

        /* ── Primary CTA ── */
        .ap-cta-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          flex: 1;
          padding: 0.8rem 1.5rem;
          background: #f97316; color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          border: none; border-radius: 2px; cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .ap-cta-btn:hover {
          background: #fff; color: #1e40af;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(249,115,22,0.25);
        }

        /* ── Dismiss ── */
        .ap-dismiss-btn {
          padding: 0.8rem 1.25rem;
          background: transparent; color: rgba(255,255,255,0.35);
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .ap-dismiss-btn:hover {
          border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.7);
        }
      `}</style>

      {/* ── Backdrop ── */}
      <div
        className={`ap-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 ${closing ? "closing" : ""}`}
        style={{ background: "rgba(15,23,42,0.75)", backdropFilter: "blur(4px)" }}
        onClick={close}
        aria-modal="true"
        role="dialog"
      >
        {/* ── Card ── */}
        <div
          className={`ap-card relative w-full max-w-md overflow-hidden ${closing ? "closing" : ""}`}
          style={{
            background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "6px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            fontFamily: "'Jost', sans-serif",
            cursor: "default",
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          {/* Diagonal stripe texture */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.025) 20px, rgba(255,255,255,0.025) 21px)",
            }}
          />

          {/* Floating decorative glyph */}
          <div
            className="ap-accent"
            aria-hidden="true"
            style={{
              position: "absolute", bottom: "1.5rem", right: "1.75rem",
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "7rem", fontWeight: 700,
              color: "rgba(249,115,22,0.07)", lineHeight: 1,
              userSelect: "none", pointerEvents: "none", zIndex: 0,
            }}
          >
            ✦
          </div>

          {/* Orange top rule */}
          <span
            aria-hidden="true"
            style={{
              display: "block", height: "3px",
              background: "linear-gradient(90deg,#f97316,#fb923c,#f97316)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, padding: "2rem" }}>

            {/* Close button */}
            <button
              type="button"
              className="ap-close"
              aria-label="Close announcement"
              onClick={close}
            >
              <X size={14} />
            </button>

            {/* Eyebrow badge */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(249,115,22,0.18)", color: "#fb923c",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: "9999px", padding: "0.35rem 0.9rem",
                fontFamily: "Jost, sans-serif",
                fontSize: "0.68rem", fontWeight: 600,
                letterSpacing: "0.22em", textTransform: "uppercase",
              }}>
                <span
                  className="ap-badge-dot"
                  style={{
                    display: "inline-block",
                    width: "6px", height: "6px",
                    borderRadius: "50%", background: "#f97316",
                  }}
                />
                Announcement
              </span>
            </div>

            {/* Company label */}
            <div style={{
              fontFamily: "Jost, sans-serif",
              fontSize: "0.68rem", fontWeight: 600,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem",
            }}>
              Royal Gypsum Plastering
            </div>

            {/* Title */}
            {announcement.title && (
              <h3 style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 700, lineHeight: 1.1,
                color: "#fff", letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}>
                {renderTitle(announcement.title)}
              </h3>
            )}

            {/* Orange rule */}
            <span
              className="ap-orange-line"
              style={{ width: "2.5rem", marginBottom: "1rem" }}
            />

            {/* Message */}
            <p style={{
              fontFamily: "Jost, sans-serif",
              fontSize: "0.92rem", fontWeight: 300,
              lineHeight: 1.8, color: "rgba(255,255,255,0.65)",
              marginBottom: "1.75rem",
            }}>
              {announcement.message}
            </p>

            {/* Divider */}
            <div style={{
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              marginBottom: "1.5rem",
            }} />

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <button type="button" className="ap-cta-btn" onClick={onClick}>
                Get in Touch <ArrowRight size={12} />
              </button>
              <button
                type="button"
                className="ap-dismiss-btn"
                onClick={close}
              >
                Dismiss
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
