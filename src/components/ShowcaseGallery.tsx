import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import {
  CharacterAngle,
  CharacterConfig,
  SHOWCASE_PRESETS,
  ShowcasePreset,
  getOutfitLabel,
  getPoseLabel,
} from '../types/character';
import { WhiteMaleCharacter } from './WhiteMaleCharacter';

interface ShowcaseGalleryProps {
  activeConfig: CharacterConfig;
  isDarkBackdrop: boolean;
  backdropClass: string;
  onSelectPreset: (preset: ShowcasePreset) => void;
  onOpenLightbox: (preset: ShowcasePreset) => void;
}

type FilterTab = 'all' | CharacterAngle;

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'front', label: 'Ön Görünüm' },
  { value: 'three-quarter', label: '3/4 Açı' },
  { value: 'side', label: 'Yan Profil' },
];

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({
  activeConfig,
  isDarkBackdrop,
  backdropClass,
  onSelectPreset,
  onOpenLightbox,
}) => {
  const [filter, setFilter] = useState<FilterTab>('all');

  const filteredPresets =
    filter === 'all'
      ? SHOWCASE_PRESETS
      : SHOWCASE_PRESETS.filter((item) => item.angle === filter);

  return (
    <section id="vitrin" className="pt-14 pb-12 border-t border-slate-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-medium text-slate-500 tracking-wide mb-2">
            Hazır Vektörel Koleksiyon
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Farklı Poz ve Açılardan Karakter Vitrini
          </h2>
        </div>

        {/* Interactive filter bar (segmented buttons) */}
        <div
          role="tablist"
          aria-label="Açıya göre filtrele"
          className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl self-start md:self-auto"
        >
          {FILTER_TABS.map((tab) => {
            const active = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.value)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                  active
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Clean Vector Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPresets.map((preset) => {
          const isCurrent =
            activeConfig.angle === preset.angle &&
            activeConfig.pose === preset.pose &&
            activeConfig.expression === preset.expression &&
            activeConfig.outfit === preset.outfit;

          return (
            <article
              key={preset.id}
              className={`group rounded-2xl border bg-white overflow-hidden transition-all ${
                isCurrent
                  ? 'border-blue-700 ring-1 ring-blue-700/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Visual Artwork Frame */}
              <div className={`relative ${backdropClass} h-72 flex items-center justify-center p-4 transition-colors`}>
                <button
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  aria-label={`${preset.title} çizimini ana sahneye yükle`}
                  className="w-full h-full flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 rounded-xl"
                >
                  <WhiteMaleCharacter
                    angle={preset.angle}
                    pose={preset.pose}
                    expression={preset.expression}
                    outfit={preset.outfit}
                    isDarkBackdrop={isDarkBackdrop}
                    className="h-full w-auto max-w-full transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenLightbox(preset)}
                  title="Tam ekran incele"
                  aria-label={`${preset.title} tam ekran incele`}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200/80 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Clean Unboxed Metadata */}
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {preset.subtitle} · {getPoseLabel(preset.pose)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`text-xs font-semibold whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                    isCurrent
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isCurrent ? 'Sahnede' : 'Sahneye Al'}
                </button>
              </div>
              <div className="px-4 pb-3.5 text-[11px] text-slate-400">
                {getOutfitLabel(preset.outfit)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
