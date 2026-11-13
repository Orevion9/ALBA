import React from 'react';
import { ANGLE_OPTIONS, CharacterAngle, CharacterConfig } from '../types/character';
import { WhiteMaleCharacter } from './WhiteMaleCharacter';

interface ProportionGuideProps {
  activeConfig: CharacterConfig;
  onSelectAngle: (angle: CharacterAngle) => void;
}

const PROPORTION_SPECS = [
  { metric: '1 : 7.5', label: 'Standart Erkek Kafa Oranı' },
  { metric: '3 Açı', label: 'Ön, 3/4 ve Yan Profil Çizimi' },
  { metric: '6 × 5', label: 'Poz ve Yüz İfadesi Kombinasyonu' },
  { metric: '#FFFFFF', label: 'Saf Beyaz Kıyafet ve Açık Ten' },
];

export const ProportionGuide: React.FC<ProportionGuideProps> = ({
  activeConfig,
  onSelectAngle,
}) => {
  return (
    <>
      {/* 3-Angle Reference Section */}
      <section id="acilar" className="py-12 border-t border-slate-200">
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-500 tracking-wide mb-2">
            Üç Açılı Model Sayfası
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Karakter Dönüş Rehberi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ANGLE_OPTIONS.map((item) => {
            const isSelected = activeConfig.angle === item.value;
            return (
              <div
                key={item.value}
                className={`rounded-2xl border bg-white p-5 flex flex-col gap-4 transition-colors ${
                  isSelected ? 'border-blue-700' : 'border-slate-200'
                }`}
              >
                <div className="bg-[#E6E9EF] rounded-xl h-72 flex items-center justify-center p-3">
                  <WhiteMaleCharacter
                    angle={item.value}
                    pose={activeConfig.pose}
                    expression={activeConfig.expression}
                    outfit={activeConfig.outfit}
                    showGrid
                    className="h-full w-auto"
                  />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectAngle(item.value)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
                  >
                    Seç
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Anatomical Specifications Strip */}
      <section id="oranlar" className="py-10 border-t border-slate-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-slate-200 rounded-2xl p-6">
          {PROPORTION_SPECS.map((spec) => (
            <div key={spec.label} className="space-y-1">
              <div className="font-mono text-xl md:text-2xl font-medium text-slate-900 tabular-nums">
                {spec.metric}
              </div>
              <div className="text-xs text-slate-500">{spec.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
