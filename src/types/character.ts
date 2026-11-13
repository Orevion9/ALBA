export type CharacterAngle = 'front' | 'three-quarter' | 'side';

export type CharacterPose =
  | 'standing'
  | 'waving'
  | 'crossed-arms'
  | 'walking'
  | 'pointing'
  | 'thinking';

export type CharacterExpression =
  | 'neutral'
  | 'smiling'
  | 'focused'
  | 'surprised'
  | 'winking';

export type WhiteOutfitStyle = 'casual-white' | 'smart-white';

export type StageBackdrop = 'studio-gray' | 'dark-charcoal' | 'paper-white';

export interface CharacterConfig {
  angle: CharacterAngle;
  pose: CharacterPose;
  expression: CharacterExpression;
  outfit: WhiteOutfitStyle;
}

export interface ShowcasePreset extends CharacterConfig {
  id: string;
  title: string;
  subtitle: string;
}

export const ANGLE_OPTIONS: { value: CharacterAngle; label: string; shortLabel: string; description: string }[] = [
  {
    value: 'front',
    label: 'Ön Görünüm',
    shortLabel: 'Ön',
    description: 'Simetrik omuz hizası ve doğrudan karşıya bakan standart anatomik referans duruşu.',
  },
  {
    value: 'three-quarter',
    label: '3/4 Açı',
    shortLabel: '3/4',
    description: 'Hafifçe sağa dönük perspektif ile derinlik ve hacim hissini vurgulayan doğal görünüm.',
  },
  {
    value: 'side',
    label: 'Yan Profil',
    shortLabel: 'Yan',
    description: 'Burun, çene ve omurga eğrisini netleştiren tam yan silüet çizimi.',
  },
];

export const POSE_OPTIONS: { value: CharacterPose; label: string }[] = [
  { value: 'standing', label: 'Standart Duruş' },
  { value: 'waving', label: 'El Sallama' },
  { value: 'crossed-arms', label: 'Kollar Kavuşuk' },
  { value: 'walking', label: 'Yürüyüş' },
  { value: 'pointing', label: 'İşaret Etme' },
  { value: 'thinking', label: 'Düşünceli' },
];

export const EXPRESSION_OPTIONS: { value: CharacterExpression; label: string }[] = [
  { value: 'neutral', label: 'Nötr' },
  { value: 'smiling', label: 'Gülümseme' },
  { value: 'focused', label: 'Odaklanmış' },
  { value: 'surprised', label: 'Şaşkın' },
  { value: 'winking', label: 'Göz Kırpma' },
];

export const OUTFIT_OPTIONS: { value: WhiteOutfitStyle; label: string; detail: string }[] = [
  {
    value: 'casual-white',
    label: 'Beyaz Gündelik',
    detail: 'Beyaz bisiklet yaka tişört, beyaz pantolon ve beyaz spor ayakkabı',
  },
  {
    value: 'smart-white',
    label: 'Beyaz Klasik',
    detail: 'Beyaz gömlek, beyaz ceket ve beyaz kumaş pantolon',
  },
];

export const BACKDROP_OPTIONS: { value: StageBackdrop; label: string; bgClass: string; hex: string; isDark: boolean }[] = [
  {
    value: 'studio-gray',
    label: 'Atölye Grisi',
    bgClass: 'bg-[#E6E9EF]',
    hex: '#E6E9EF',
    isDark: false,
  },
  {
    value: 'dark-charcoal',
    label: 'Koyu Stüdyo',
    bgClass: 'bg-[#15181F]',
    hex: '#15181F',
    isDark: true,
  },
  {
    value: 'paper-white',
    label: 'Kağıt Beyazı',
    bgClass: 'bg-[#F8FAFC]',
    hex: '#F8FAFC',
    isDark: false,
  },
];

export const SHOWCASE_PRESETS: ShowcasePreset[] = [
  {
    id: 'front-standing-neutral',
    title: 'Temel Referans Duruşu',
    subtitle: 'Ön Görünüm · Nötr İfade',
    angle: 'front',
    pose: 'standing',
    expression: 'neutral',
    outfit: 'casual-white',
  },
  {
    id: 'three-quarter-smiling-waving',
    title: 'Karşılama ve Selamlama',
    subtitle: '3/4 Açı · Gülümseme',
    angle: 'three-quarter',
    pose: 'waving',
    expression: 'smiling',
    outfit: 'casual-white',
  },
  {
    id: 'front-crossed-focused',
    title: 'Özgüvenli Duruş',
    subtitle: 'Ön Görünüm · Odaklanmış',
    angle: 'front',
    pose: 'crossed-arms',
    expression: 'focused',
    outfit: 'smart-white',
  },
  {
    id: 'side-walking-neutral',
    title: 'Adım ve Hareket Akışı',
    subtitle: 'Yan Profil · Nötr İfade',
    angle: 'side',
    pose: 'walking',
    expression: 'neutral',
    outfit: 'casual-white',
  },
  {
    id: 'three-quarter-pointing-winking',
    title: 'Sunum ve Yönlendirme',
    subtitle: '3/4 Açı · Göz Kırpma',
    angle: 'three-quarter',
    pose: 'pointing',
    expression: 'winking',
    outfit: 'smart-white',
  },
  {
    id: 'front-thinking-surprised',
    title: 'Fikir ve Keşif Anı',
    subtitle: 'Ön Görünüm · Şaşkın',
    angle: 'front',
    pose: 'thinking',
    expression: 'surprised',
    outfit: 'casual-white',
  },
  {
    id: 'side-standing-focused',
    title: 'Klasik Profil İncelemesi',
    subtitle: 'Yan Profil · Odaklanmış',
    angle: 'side',
    pose: 'standing',
    expression: 'focused',
    outfit: 'smart-white',
  },
  {
    id: 'three-quarter-walking-smiling',
    title: 'Dinamik Yürüyüş',
    subtitle: '3/4 Açı · Gülümseme',
    angle: 'three-quarter',
    pose: 'walking',
    expression: 'smiling',
    outfit: 'casual-white',
  },
  {
    id: 'three-quarter-thinking-neutral',
    title: 'Analitik Düşünce',
    subtitle: '3/4 Açı · Nötr İfade',
    angle: 'three-quarter',
    pose: 'thinking',
    expression: 'neutral',
    outfit: 'smart-white',
  },
];

export function getAngleLabel(angle: CharacterAngle): string {
  return ANGLE_OPTIONS.find((item) => item.value === angle)?.label ?? angle;
}

export function getPoseLabel(pose: CharacterPose): string {
  return POSE_OPTIONS.find((item) => item.value === pose)?.label ?? pose;
}

export function getExpressionLabel(expression: CharacterExpression): string {
  return EXPRESSION_OPTIONS.find((item) => item.value === expression)?.label ?? expression;
}

export function getOutfitLabel(outfit: WhiteOutfitStyle): string {
  return OUTFIT_OPTIONS.find((item) => item.value === outfit)?.label ?? outfit;
}
