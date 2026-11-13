import React from 'react';
import { RotateCcw, Shuffle, Download } from 'lucide-react';
import {
  ANGLE_OPTIONS,
  CharacterConfig,
  EXPRESSION_OPTIONS,
  OUTFIT_OPTIONS,
  POSE_OPTIONS,
} from '../types/character';

interface ControlPanelProps {
  config: CharacterConfig;
  onChange: (next: CharacterConfig) => void;
  onReset: () => void;
  onRandomize: () => void;
  onDownloadPng: () => void;
  onDownloadSvg: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onChange,
  onReset,
  onRandomize,
  onDownloadPng,
  onDownloadSvg,
}) => {
  return (
    <aside
      aria-label="Karakter kontrolleri"
      className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Karakter Kontrolleri
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Açı, poz ve yüz ifadesini anlık değiştirin
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onRandomize}
            title="Rastgele kombinasyon"
            aria-label="Rastgele kombinasyon"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <Shuffle className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Varsayılana dön"
            aria-label="Varsayılana dön"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Açı (Angle) */}
      <div className="space-y-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Görünüm Açısı
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            3 açı
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          {ANGLE_OPTIONS.map((opt) => {
            const active = config.angle === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...config, angle: opt.value })}
                aria-pressed={active}
                className={`px-2.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Poz (Pose) */}
      <div className="space-y-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Vücut Pozu
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            6 poz
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {POSE_OPTIONS.map((opt) => {
            const active = config.pose === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...config, pose: opt.value })}
                aria-pressed={active}
                className={`px-3 py-2.5 text-xs font-medium rounded-xl border text-left transition-all whitespace-nowrap truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Yüz İfadesi (Expression) */}
      <div className="space-y-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Yüz İfadesi
          </span>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            5 ifade
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
          {EXPRESSION_OPTIONS.map((opt) => {
            const active = config.expression === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...config, expression: opt.value })}
                aria-pressed={active}
                className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all whitespace-nowrap truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Beyaz Kıyafet Stili */}
      <div className="space-y-2.5">
        <span className="block text-xs font-semibold text-slate-700">
          Beyaz Kıyafet Seçeneği
        </span>
        <div className="grid grid-cols-2 gap-2">
          {OUTFIT_OPTIONS.map((opt) => {
            const active = config.outfit === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ ...config, outfit: opt.value })}
                aria-pressed={active}
                className={`px-3 py-2.5 text-xs font-medium rounded-xl border text-left transition-all whitespace-nowrap truncate cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={onDownloadSvg}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>SVG Kaydet</span>
        </button>
        <button
          type="button"
          onClick={onDownloadPng}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>PNG Kaydet</span>
        </button>
      </div>
    </aside>
  );
};
