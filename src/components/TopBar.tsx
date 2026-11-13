import React from 'react';
import { Download } from 'lucide-react';

interface TopBarProps {
  onDownloadSvg: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onDownloadSvg }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#sahne"
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          Alba Figür
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Ana gezinme"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="#sahne"
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            Ana Sahne
          </a>
          <a
            href="#vitrin"
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            Poz Vitrini
          </a>
          <a
            href="#acilar"
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            Açı Rehberi
          </a>
          <a
            href="#oranlar"
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            Oranlar
          </a>
        </nav>

        {/* Zone 3: 1 primary CTA button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onDownloadSvg}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>SVG İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
