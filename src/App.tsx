import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid3X3, X, Download } from 'lucide-react';
import {
  ANGLE_OPTIONS,
  BACKDROP_OPTIONS,
  CharacterAngle,
  CharacterConfig,
  EXPRESSION_OPTIONS,
  OUTFIT_OPTIONS,
  POSE_OPTIONS,
  ShowcasePreset,
  StageBackdrop,
  getAngleLabel,
  getExpressionLabel,
  getOutfitLabel,
  getPoseLabel,
} from './types/character';
import { WhiteMaleCharacter } from './components/WhiteMaleCharacter';
import { TopBar } from './components/TopBar';
import { ControlPanel } from './components/ControlPanel';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { ProportionGuide } from './components/ProportionGuide';
import { downloadPngFromElement, downloadSvgFromElement } from './utils/exportCharacter';

const DEFAULT_CONFIG: CharacterConfig = {
  angle: 'front',
  pose: 'standing',
  expression: 'neutral',
  outfit: 'casual-white',
};

type ZoomLevel = 0.75 | 1 | 1.25;

export default function App() {
  const [config, setConfig] = useState<CharacterConfig>(DEFAULT_CONFIG);
  const [backdrop, setBackdrop] = useState<StageBackdrop>('studio-gray');
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [zoom, setZoom] = useState<ZoomLevel>(1);
  const [lightboxPreset, setLightboxPreset] = useState<ShowcasePreset | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mainSvgRef = useRef<SVGSVGElement | null>(null);
  const lightboxSvgRef = useRef<SVGSVGElement | null>(null);

  const currentBackdrop =
    BACKDROP_OPTIONS.find((b) => b.value === backdrop) ?? BACKDROP_OPTIONS[0];

  const notify = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (!lightboxPreset) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPreset(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPreset]);

  const buildFilename = useCallback((cfg: CharacterConfig) => {
    return `alba-figur-${cfg.angle}-${cfg.pose}-${cfg.expression}`;
  }, []);

  const handleDownloadSvg = useCallback(() => {
    if (!mainSvgRef.current) return;
    downloadSvgFromElement(mainSvgRef.current, buildFilename(config));
    notify('SVG dosyası indirildi.');
  }, [buildFilename, config, notify]);

  const handleDownloadPng = useCallback(async () => {
    if (!mainSvgRef.current) return;
    try {
      await downloadPngFromElement(
        mainSvgRef.current,
        buildFilename(config),
        currentBackdrop.hex
      );
      notify('PNG görseli indirildi.');
    } catch {
      notify('PNG dışa aktarma sırasında bir sorun oluştu.');
    }
  }, [buildFilename, config, currentBackdrop.hex, notify]);

  const handleDownloadLightboxSvg = useCallback(() => {
    if (!lightboxSvgRef.current || !lightboxPreset) return;
    downloadSvgFromElement(lightboxSvgRef.current, buildFilename(lightboxPreset));
    notify('Vitrin çizimi SVG olarak indirildi.');
  }, [buildFilename, lightboxPreset, notify]);

  const handleRandomize = useCallback(() => {
    const randomPick = <T,>(arr: T[]): T =>
      arr[Math.floor(Math.random() * arr.length)];
    setConfig({
      angle: randomPick(ANGLE_OPTIONS).value,
      pose: randomPick(POSE_OPTIONS).value,
      expression: randomPick(EXPRESSION_OPTIONS).value,
      outfit: randomPick(OUTFIT_OPTIONS).value,
    });
  }, []);

  const handleSelectPreset = useCallback((preset: ShowcasePreset) => {
    setConfig({
      angle: preset.angle,
      pose: preset.pose,
      expression: preset.expression,
      outfit: preset.outfit,
    });
    const stageEl = document.getElementById('sahne');
    stageEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectAngleFromGuide = useCallback((angle: CharacterAngle) => {
    setConfig((prev) => ({ ...prev, angle }));
    const stageEl = document.getElementById('sahne');
    stageEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-slate-900">
      <TopBar onDownloadSvg={handleDownloadSvg} />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8 md:py-10">
        {/* Intro Header */}
        <section id="sahne" className="scroll-mt-20">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-medium text-slate-500 tracking-wide mb-2">
              Standart Vektörel Erkek Karakter
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance">
              Beyaz Tenli ve Beyaz Kıyafetli Karakter Stüdyosu
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2.5 leading-relaxed">
              Temiz vektörel çizgi diline sahip standart erkek figürünü ön, 3/4 ve yan profilden inceleyin; poz ve yüz ifadelerini değiştirip SVG veya PNG olarak indirin.
            </p>
          </div>

          {/* Primary Stage + Control Panel Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left/Center Main Visual Stage (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {/* Stage Toolbar */}
              <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
                {/* Backdrop Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                    Zemin:
                  </span>
                  <div className="inline-flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
                    {BACKDROP_OPTIONS.map((opt) => {
                      const active = backdrop === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBackdrop(opt.value)}
                          aria-pressed={active}
                          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
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

                {/* Guide & Zoom */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGrid((prev) => !prev)}
                    aria-pressed={showGrid}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                      showGrid
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Grid3X3 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Oran Kılavuzu</span>
                  </button>

                  <div className="inline-flex items-center gap-0.5 p-0.5 bg-slate-100 rounded-lg">
                    {([0.75, 1, 1.25] as ZoomLevel[]).map((level) => {
                      const active = zoom === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setZoom(level)}
                          aria-pressed={active}
                          className={`px-2 py-1 font-mono text-[11px] tabular-nums rounded-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700 ${
                            active
                              ? 'bg-white text-slate-900 shadow-xs font-medium'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          %{Math.round(level * 100)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Character Canvas Viewport */}
              <div
                className={`${currentBackdrop.bgClass} relative h-[520px] md:h-[580px] flex items-center justify-center overflow-hidden transition-colors duration-200`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${config.angle}-${config.pose}-${config.expression}-${config.outfit}`}
                    initial={{ opacity: 0.65, scale: zoom * 0.97 }}
                    animate={{ opacity: 1, scale: zoom }}
                    exit={{ opacity: 0.65 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex items-center justify-center p-6"
                  >
                    <WhiteMaleCharacter
                      svgRef={mainSvgRef}
                      angle={config.angle}
                      pose={config.pose}
                      expression={config.expression}
                      outfit={config.outfit}
                      showGrid={showGrid}
                      isDarkBackdrop={currentBackdrop.isDark}
                      className="h-full w-auto max-h-[520px]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Clean Unboxed Active Metadata Footer */}
              <div className="px-5 py-3.5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900">Aktif Görünüm:</span>
                  <span>{getAngleLabel(config.angle)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{getPoseLabel(config.pose)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{getExpressionLabel(config.expression)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{getOutfitLabel(config.outfit)}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                  360 × 620 viewBox
                </span>
              </div>
            </div>

            {/* Right Control Panel (4 cols) */}
            <div className="lg:col-span-4">
              <ControlPanel
                config={config}
                onChange={setConfig}
                onReset={() => setConfig(DEFAULT_CONFIG)}
                onRandomize={handleRandomize}
                onDownloadPng={handleDownloadPng}
                onDownloadSvg={handleDownloadSvg}
              />
            </div>
          </div>
        </section>

        {/* Preset Showcase Gallery */}
        <ShowcaseGallery
          activeConfig={config}
          isDarkBackdrop={currentBackdrop.isDark}
          backdropClass={currentBackdrop.bgClass}
          onSelectPreset={handleSelectPreset}
          onOpenLightbox={setLightboxPreset}
        />

        {/* Three-Angle Turnaround & Proportion Specs */}
        <ProportionGuide
          activeConfig={config}
          onSelectAngle={handleSelectAngleFromGuide}
        />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Alba Figür · Standart Beyaz Erkek Karakter Vitrini</span>
          <span>Temiz Vektörel Çizim · Ön, 3/4 ve Yan Profil</span>
        </div>
      </footer>

      {/* Lightbox Modal for Fullscreen Inspection */}
      {lightboxPreset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPreset.title}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxPreset(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {lightboxPreset.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lightboxPreset.subtitle} · {getPoseLabel(lightboxPreset.pose)} ·{' '}
                  {getOutfitLabel(lightboxPreset.outfit)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPreset(null)}
                aria-label="Önizlemeyi kapat"
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className={`${currentBackdrop.bgClass} h-[440px] md:h-[500px] flex items-center justify-center p-6`}>
              <WhiteMaleCharacter
                svgRef={lightboxSvgRef}
                angle={lightboxPreset.angle}
                pose={lightboxPreset.pose}
                expression={lightboxPreset.expression}
                outfit={lightboxPreset.outfit}
                isDarkBackdrop={currentBackdrop.isDark}
                className="h-full w-auto"
              />
            </div>

            <div className="px-5 py-4 border-t border-slate-200 bg-white flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleDownloadLightboxSvg}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>SVG İndir</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSelectPreset(lightboxPreset);
                  setLightboxPreset(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-700"
              >
                Ana Sahneye Yükle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiet Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
