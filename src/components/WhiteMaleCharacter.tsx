import React from 'react';
import {
  CharacterAngle,
  CharacterExpression,
  CharacterPose,
  WhiteOutfitStyle,
} from '../types/character';

interface WhiteMaleCharacterProps {
  angle: CharacterAngle;
  pose: CharacterPose;
  expression: CharacterExpression;
  outfit: WhiteOutfitStyle;
  showGrid?: boolean;
  isDarkBackdrop?: boolean;
  svgRef?: React.Ref<SVGSVGElement>;
  className?: string;
}

const PALETTE = {
  ink: '#1E293B',
  inkSoft: '#475569',
  skin: '#FDF1E8',
  skinShade: '#F2DCCB',
  cloth: '#FFFFFF',
  clothShade: '#E8EDF4',
  clothDeep: '#D6DFEB',
  seam: '#94A3B8',
  hair: '#282E38',
  hairHighlight: '#3E4654',
  eye: '#1E293B',
  mouth: '#9A6B5C',
};

const STROKE_MAIN = 2.2;
const STROKE_DETAIL = 1.6;

interface LimbPathProps {
  d: string;
  fill: string;
  strokeWidth?: number;
}

function CleanPath({ d, fill, strokeWidth = STROKE_MAIN }: LimbPathProps) {
  return (
    <path
      d={d}
      fill={fill}
      stroke={PALETTE.ink}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function AnatomicalGuideOverlay({ isDark }: { isDark: boolean }) {
  const lineColor = isDark ? 'rgba(148, 163, 184, 0.35)' : 'rgba(30, 41, 59, 0.22)';
  const centerColor = isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(29, 78, 216, 0.28)';
  const textColor = isDark ? 'rgba(203, 213, 225, 0.78)' : 'rgba(51, 65, 85, 0.72)';

  const markers = [
    { y: 48, label: '0.0  Tepe' },
    { y: 118, label: '1.0  Çene' },
    { y: 188, label: '2.0  Göğüs' },
    { y: 258, label: '3.0  Bel' },
    { y: 328, label: '4.0  Kalça' },
    { y: 398, label: '5.0  Uyluk' },
    { y: 468, label: '6.0  Diz Altı' },
    { y: 538, label: '7.0  Bilek' },
    { y: 576, label: '7.5  Taban' },
  ];

  return (
    <g data-guide-layer="true" pointerEvents="none">
      <line
        x1="180"
        y1="26"
        x2="180"
        y2="596"
        stroke={centerColor}
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      {markers.map((m) => (
        <g key={m.label}>
          <line
            x1="28"
            y1={m.y}
            x2="332"
            y2={m.y}
            stroke={lineColor}
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text
            x="28"
            y={m.y - 4}
            fill={textColor}
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="500"
          >
            {m.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function FacialFeatures({
  angle,
  expression,
}: {
  angle: CharacterAngle;
  expression: CharacterExpression;
}) {
  if (angle === 'side') {
    // Profile faces right (+x)
    const eyeX = 197;
    const eyeY = 82;
    const browY = expression === 'surprised' ? 73 : expression === 'focused' ? 77 : 75;

    return (
      <g>
        {/* Eyebrow */}
        {expression === 'focused' ? (
          <path
            d={`M ${eyeX - 6} ${browY - 1} L ${eyeX + 6} ${browY + 2}`}
            fill="none"
            stroke={PALETTE.hair}
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        ) : (
          <path
            d={`M ${eyeX - 6} ${browY + 1} Q ${eyeX} ${browY - 2} ${eyeX + 6} ${browY}`}
            fill="none"
            stroke={PALETTE.hair}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        )}

        {/* Eye */}
        {expression === 'winking' ? (
          <path
            d={`M ${eyeX - 4} ${eyeY + 1} Q ${eyeX + 1} ${eyeY - 2} ${eyeX + 5} ${eyeY + 1}`}
            fill="none"
            stroke={PALETTE.eye}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <ellipse
            cx={eyeX}
            cy={eyeY}
            rx={expression === 'surprised' ? 3.2 : 2.6}
            ry={expression === 'surprised' ? 4.1 : 3.2}
            fill={PALETTE.eye}
          />
        )}

        {/* Mouth in profile */}
        {expression === 'neutral' && (
          <path
            d="M 201 102 Q 205 102 208 101"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}
        {expression === 'smiling' && (
          <path
            d="M 199 102 Q 204 105 208 100"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        )}
        {expression === 'focused' && (
          <path
            d="M 200 102 L 208 102"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        )}
        {expression === 'surprised' && (
          <ellipse
            cx="205"
            cy="103"
            rx="2.8"
            ry="3.6"
            fill={PALETTE.mouth}
            stroke={PALETTE.ink}
            strokeWidth="1.6"
          />
        )}
        {expression === 'winking' && (
          <path
            d="M 199 102 Q 204 104 208 99.5"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        )}
      </g>
    );
  }

  // Front or 3/4 view
  const shiftX = angle === 'three-quarter' ? 7 : 0;
  const leftEyeX = angle === 'three-quarter' ? 168 + shiftX : 168;
  const rightEyeX = angle === 'three-quarter' ? 191 + shiftX : 192;
  const eyeY = 83;
  const noseX = angle === 'three-quarter' ? 182 + shiftX : 180;
  const mouthCenterX = angle === 'three-quarter' ? 180 + shiftX : 180;

  const browOffset =
    expression === 'surprised' ? -3 : expression === 'focused' ? 2 : 0;

  return (
    <g>
      {/* Left Eyebrow */}
      {expression === 'focused' ? (
        <path
          d={`M ${leftEyeX - 7} ${74 + browOffset - 1} L ${leftEyeX + 6} ${74 + browOffset + 2}`}
          fill="none"
          stroke={PALETTE.hair}
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M ${leftEyeX - 7} ${75 + browOffset} Q ${leftEyeX} ${72 + browOffset} ${leftEyeX + 6} ${74 + browOffset}`}
          fill="none"
          stroke={PALETTE.hair}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}

      {/* Right Eyebrow */}
      {expression === 'focused' ? (
        <path
          d={`M ${rightEyeX - 6} ${74 + browOffset + 2} L ${rightEyeX + 7} ${74 + browOffset - 1}`}
          fill="none"
          stroke={PALETTE.hair}
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M ${rightEyeX - 6} ${74 + browOffset} Q ${rightEyeX} ${72 + browOffset} ${rightEyeX + 7} ${75 + browOffset}`}
          fill="none"
          stroke={PALETTE.hair}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}

      {/* Left Eye */}
      <ellipse
        cx={leftEyeX}
        cy={eyeY}
        rx={expression === 'surprised' ? 3.5 : 3}
        ry={expression === 'surprised' ? 4.4 : 3.4}
        fill={PALETTE.eye}
      />
      {expression === 'smiling' && (
        <circle cx={leftEyeX - 0.8} cy={eyeY - 1} r="0.9" fill="#FFFFFF" />
      )}

      {/* Right Eye */}
      {expression === 'winking' ? (
        <path
          d={`M ${rightEyeX - 4.5} ${eyeY + 1} Q ${rightEyeX} ${eyeY - 2.5} ${rightEyeX + 4.5} ${eyeY + 1}`}
          fill="none"
          stroke={PALETTE.eye}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <ellipse
            cx={rightEyeX}
            cy={eyeY}
            rx={angle === 'three-quarter' ? 2.5 : expression === 'surprised' ? 3.5 : 3}
            ry={expression === 'surprised' ? 4.4 : 3.4}
            fill={PALETTE.eye}
          />
          {expression === 'smiling' && (
            <circle cx={rightEyeX - 0.7} cy={eyeY - 1} r="0.9" fill="#FFFFFF" />
          )}
        </>
      )}

      {/* Nose */}
      {angle === 'front' ? (
        <path
          d={`M ${noseX} 83 L ${noseX} 92 Q ${noseX} 94 ${noseX + 2.5} 94`}
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d={`M ${noseX} 82 L ${noseX + 5} 91.5 Q ${noseX + 5.5} 94 ${noseX + 1} 94.5`}
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Mouth */}
      {expression === 'neutral' && (
        <path
          d={`M ${mouthCenterX - 6} 103 Q ${mouthCenterX} 104 ${mouthCenterX + 6} 103`}
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
      {expression === 'smiling' && (
        <path
          d={`M ${mouthCenterX - 8} 101 Q ${mouthCenterX} 108 ${mouthCenterX + 8} 101`}
          fill="#FFFFFF"
          stroke={PALETTE.ink}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {expression === 'focused' && (
        <path
          d={`M ${mouthCenterX - 6} 103.5 L ${mouthCenterX + 6} 103`}
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      )}
      {expression === 'surprised' && (
        <ellipse
          cx={mouthCenterX}
          cy="104"
          rx="3.8"
          ry="4.8"
          fill={PALETTE.mouth}
          stroke={PALETTE.ink}
          strokeWidth="1.7"
        />
      )}
      {expression === 'winking' && (
        <path
          d={`M ${mouthCenterX - 6} 103 Q ${mouthCenterX + 1} 106 ${mouthCenterX + 8} 100.5`}
          fill="none"
          stroke={PALETTE.ink}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

function HeadAndNeck({
  angle,
  expression,
  outfit,
}: {
  angle: CharacterAngle;
  expression: CharacterExpression;
  outfit: WhiteOutfitStyle;
}) {
  if (angle === 'side') {
    return (
      <g>
        {/* Neck */}
        <path
          d="M 167 110 L 167 142 Q 180 146 190 141 L 190 116 Z"
          fill={PALETTE.skin}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />
        {/* Subtle chin shadow on neck */}
        <path
          d="M 176 115 Q 184 120 190 120 L 190 116 Z"
          fill={PALETTE.skinShade}
        />

        {/* Head Profile */}
        <path
          d="M 160 76
             C 158 58, 174 52, 190 54
             C 202 56, 206 66, 206 76
             L 206 81
             L 212 91
             C 213 93, 211 95, 207 95
             L 207 99
             L 208 103
             L 206 106
             C 206 112, 203 116, 195 117
             C 186 118, 176 114, 172 108
             C 162 103, 159 90, 160 76 Z"
          fill={PALETTE.skin}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />

        {/* Hair (Side Profile) */}
        <path
          d="M 157 86
             C 154 66, 164 47, 187 47
             C 201 47, 209 55, 209 64
             C 203 63, 195 64, 187 67
             C 181 69, 176 74, 175 82
             L 172 91
             L 168 91
             L 167 84
             C 163 85, 160 88, 158 94
             C 157 91, 157 88, 157 86 Z"
          fill={PALETTE.hair}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />
        <path
          d="M 168 55 Q 184 49 199 54"
          fill="none"
          stroke={PALETTE.hairHighlight}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Side Ear */}
        <path
          d="M 171 84 C 165 83, 164 96, 171 97 C 174 97, 175 93, 175 89"
          fill={PALETTE.skin}
          stroke={PALETTE.ink}
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        <path
          d="M 169 88 C 167 89, 168 93, 170 93"
          fill="none"
          stroke={PALETTE.skinShade}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <FacialFeatures angle={angle} expression={expression} />

        {/* Collar hint for smart-white */}
        {outfit === 'smart-white' && (
          <path
            d="M 165 136 Q 178 144 193 137"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth="1.8"
          />
        )}
      </g>
    );
  }

  if (angle === 'three-quarter') {
    return (
      <g>
        {/* Neck */}
        <path
          d="M 167 110 L 167 142 Q 180 147 192 141 L 191 112 Z"
          fill={PALETTE.skin}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />
        <path
          d="M 168 113 Q 179 122 191 115 L 191 119 Q 179 126 168 119 Z"
          fill={PALETTE.skinShade}
        />

        {/* Far Ear (tiny peek on right or left - since turned right, left ear is visible) */}
        <path
          d="M 157 83 C 151 83, 151 96, 158 96"
          fill={PALETTE.skin}
          stroke={PALETTE.ink}
          strokeWidth="1.9"
          strokeLinecap="round"
        />

        {/* Head 3/4 */}
        <path
          d="M 157 76
             C 157 56, 170 50, 184 51
             C 199 52, 206 63, 206 78
             C 206 91, 203 102, 197 109
             C 192 115, 185 118, 179 117
             C 167 116, 157 104, 157 76 Z"
          fill={PALETTE.skin}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />

        {/* Hair 3/4 */}
        <path
          d="M 155 83
             C 152 64, 161 46, 183 46
             C 200 46, 209 56, 207 71
             C 203 65, 194 62, 182 63
             C 172 64, 164 69, 161 78
             L 159 85 Z"
          fill={PALETTE.hair}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />
        <path
          d="M 166 54 Q 183 49 197 55"
          fill="none"
          stroke={PALETTE.hairHighlight}
          strokeWidth="2"
          strokeLinecap="round"
        />

        <FacialFeatures angle={angle} expression={expression} />
      </g>
    );
  }

  // Front view
  return (
    <g>
      {/* Neck */}
      <path
        d="M 168 111 L 167 142 Q 180 148 193 142 L 192 111 Z"
        fill={PALETTE.skin}
        stroke={PALETTE.ink}
        strokeWidth={STROKE_MAIN}
        strokeLinejoin="round"
      />
      <path
        d="M 169 114 Q 180 123 191 114 L 191 120 Q 180 128 169 120 Z"
        fill={PALETTE.skinShade}
      />

      {/* Ears */}
      <path
        d="M 156 83 C 150 83, 150 96, 157 96"
        fill={PALETTE.skin}
        stroke={PALETTE.ink}
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M 204 83 C 210 83, 210 96, 203 96"
        fill={PALETTE.skin}
        stroke={PALETTE.ink}
        strokeWidth="1.9"
        strokeLinecap="round"
      />

      {/* Head Front */}
      <path
        d="M 156 76
           C 156 56, 167 51, 180 51
           C 193 51, 204 56, 204 76
           C 204 94, 200 105, 192 112
           C 186 117, 183 118, 180 118
           C 177 118, 174 117, 168 112
           C 160 105, 156 94, 156 76 Z"
        fill={PALETTE.skin}
        stroke={PALETTE.ink}
        strokeWidth={STROKE_MAIN}
        strokeLinejoin="round"
      />

      {/* Hair Front */}
      <path
        d="M 155 81
           C 153 60, 163 46, 180 46
           C 197 46, 207 60, 205 81
           C 202 70, 196 63, 180 63
           C 164 63, 158 70, 155 81 Z"
        fill={PALETTE.hair}
        stroke={PALETTE.ink}
        strokeWidth={STROKE_MAIN}
        strokeLinejoin="round"
      />
      <path
        d="M 166 54 Q 180 49 194 54"
        fill="none"
        stroke={PALETTE.hairHighlight}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <FacialFeatures angle={angle} expression={expression} />
    </g>
  );
}

function Torso({
  angle,
  outfit,
}: {
  angle: CharacterAngle;
  outfit: WhiteOutfitStyle;
}) {
  if (angle === 'side') {
    return (
      <g>
        {/* Main white top silhouette in profile */}
        <path
          d="M 162 140
             Q 178 135 193 141
             C 202 152, 205 178, 202 206
             L 200 264
             Q 180 268 160 264
             L 158 202
             C 156 176, 157 154, 162 140 Z"
          fill={PALETTE.cloth}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />
        {/* Subtle side seam */}
        <path
          d="M 178 190 L 178 263"
          fill="none"
          stroke={PALETTE.clothDeep}
          strokeWidth="1.5"
        />
        {outfit === 'smart-white' ? (
          <>
            {/* Blazer lapel & collar */}
            <path
              d="M 184 139 L 195 144 L 198 188 L 186 172 Z"
              fill={PALETTE.clothShade}
              stroke={PALETTE.ink}
              strokeWidth={STROKE_DETAIL}
              strokeLinejoin="round"
            />
            <path
              d="M 160 250 L 200 250 L 201 278 Q 180 282 159 278 Z"
              fill={PALETTE.cloth}
              stroke={PALETTE.ink}
              strokeWidth={STROKE_MAIN}
              strokeLinejoin="round"
            />
          </>
        ) : (
          /* T-shirt crew collar */
          <path
            d="M 164 140 Q 178 148 192 141"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth="1.8"
          />
        )}
      </g>
    );
  }

  if (angle === 'three-quarter') {
    return (
      <g>
        {/* Torso 3/4 */}
        <path
          d="M 142 144
             Q 162 138 180 138
             Q 198 138 214 144
             C 220 156, 217 190, 211 215
             L 209 266
             Q 181 271 151 266
             L 148 214
             C 142 188, 138 156, 142 144 Z"
          fill={PALETTE.cloth}
          stroke={PALETTE.ink}
          strokeWidth={STROKE_MAIN}
          strokeLinejoin="round"
        />
        {/* Soft left shadow fold */}
        <path
          d="M 144 152 C 149 182, 152 225, 153 265 L 151 266 L 148 214 C 142 188, 139 162, 144 152 Z"
          fill={PALETTE.clothShade}
        />

        {outfit === 'smart-white' ? (
          <>
            {/* Shirt V-neck inside blazer */}
            <path
              d="M 167 139 L 184 176 L 195 140"
              fill={PALETTE.clothShade}
              stroke={PALETTE.ink}
              strokeWidth={STROKE_DETAIL}
              strokeLinejoin="round"
            />
            {/* Tie / Shirt collar */}
            <path
              d="M 167 139 L 177 151 L 184 146 L 195 140"
              fill={PALETTE.cloth}
              stroke={PALETTE.ink}
              strokeWidth={STROKE_DETAIL}
              strokeLinejoin="round"
            />
            {/* Lapels */}
            <path
              d="M 162 140 L 170 165 L 184 176"
              fill="none"
              stroke={PALETTE.ink}
              strokeWidth={STROKE_DETAIL}
              strokeLinecap="round"
            />
            <path
              d="M 200 141 L 194 166 L 184 176"
              fill="none"
              stroke={PALETTE.ink}
              strokeWidth={STROKE_DETAIL}
              strokeLinecap="round"
            />
            {/* Center button line + jacket lower hem */}
            <line
              x1="184"
              y1="176"
              x2="184"
              y2="278"
              stroke={PALETTE.ink}
              strokeWidth={STROKE_DETAIL}
            />
            <circle cx="187" cy="212" r="2" fill={PALETTE.clothDeep} stroke={PALETTE.ink} strokeWidth="1" />
            <circle cx="187" cy="236" r="2" fill={PALETTE.clothDeep} stroke={PALETTE.ink} strokeWidth="1" />
            {/* Blazer bottom */}
            <path
              d="M 151 258 L 209 258 L 211 280 Q 182 284 149 278 Z"
              fill={PALETTE.cloth}
              stroke={PALETTE.ink}
              strokeWidth={STROKE_MAIN}
              strokeLinejoin="round"
            />
            <line x1="184" y1="258" x2="184" y2="281" stroke={PALETTE.ink} strokeWidth={STROKE_DETAIL} />
          </>
        ) : (
          <>
            {/* Casual Crew Neck */}
            <path
              d="M 165 139 Q 182 152 196 140"
              fill={PALETTE.skin}
              stroke={PALETTE.ink}
              strokeWidth={STROKE_MAIN}
            />
            <path
              d="M 162 141 Q 182 157 199 141"
              fill="none"
              stroke={PALETTE.clothDeep}
              strokeWidth="2"
            />
            {/* Subtle hem fold */}
            <path
              d="M 154 257 Q 181 262 206 257"
              fill="none"
              stroke={PALETTE.clothDeep}
              strokeWidth="1.5"
            />
          </>
        )}
      </g>
    );
  }

  // Front view torso
  return (
    <g>
      <path
        d="M 136 145
           Q 158 138 180 138
           Q 202 138 224 145
           C 226 162, 220 194, 213 218
           L 211 266
           Q 180 271 149 266
           L 147 218
           C 140 194, 134 162, 136 145 Z"
        fill={PALETTE.cloth}
        stroke={PALETTE.ink}
        strokeWidth={STROKE_MAIN}
        strokeLinejoin="round"
      />

      {outfit === 'smart-white' ? (
        <>
          <path
            d="M 164 139 L 180 178 L 196 139"
            fill={PALETTE.clothShade}
            stroke={PALETTE.ink}
            strokeWidth={STROKE_DETAIL}
            strokeLinejoin="round"
          />
          <path
            d="M 165 139 L 175 151 L 180 147 L 185 151 L 195 139"
            fill={PALETTE.cloth}
            stroke={PALETTE.ink}
            strokeWidth={STROKE_DETAIL}
            strokeLinejoin="round"
          />
          <path
            d="M 156 140 L 166 168 L 180 178 L 194 168 L 204 140"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth={STROKE_DETAIL}
            strokeLinejoin="round"
          />
          <path
            d="M 149 258 L 211 258 L 213 280 Q 180 284 147 280 Z"
            fill={PALETTE.cloth}
            stroke={PALETTE.ink}
            strokeWidth={STROKE_MAIN}
            strokeLinejoin="round"
          />
          <line x1="180" y1="178" x2="180" y2="281" stroke={PALETTE.ink} strokeWidth={STROKE_DETAIL} />
          <circle cx="184" cy="214" r="2" fill={PALETTE.clothDeep} stroke={PALETTE.ink} strokeWidth="1" />
          <circle cx="184" cy="238" r="2" fill={PALETTE.clothDeep} stroke={PALETTE.ink} strokeWidth="1" />
        </>
      ) : (
        <>
          <path
            d="M 162 139 Q 180 153 198 139"
            fill={PALETTE.skin}
            stroke={PALETTE.ink}
            strokeWidth={STROKE_MAIN}
          />
          <path
            d="M 159 141 Q 180 158 201 141"
            fill="none"
            stroke={PALETTE.clothDeep}
            strokeWidth="2"
          />
          <path
            d="M 152 257 Q 180 262 208 257"
            fill="none"
            stroke={PALETTE.clothDeep}
            strokeWidth="1.5"
          />
        </>
      )}
    </g>
  );
}

function LegsAndShoes({
  angle,
  pose,
  outfit,
}: {
  angle: CharacterAngle;
  pose: CharacterPose;
  outfit: WhiteOutfitStyle;
}) {
  const isWalking = pose === 'walking';
  const shoeTone = outfit === 'smart-white' ? PALETTE.clothShade : PALETTE.cloth;

  if (angle === 'side') {
    if (isWalking) {
      return (
        <g>
          {/* Back Leg (stepping behind) */}
          <CleanPath
            d="M 166 264 L 188 264 L 166 408 L 138 552 L 154 555 L 188 414 L 194 264 Z"
            fill={PALETTE.clothShade}
          />
          {/* Back Shoe */}
          <CleanPath
            d="M 136 551 L 156 554 L 164 568 L 132 568 C 127 568, 127 557, 136 551 Z"
            fill={PALETTE.clothShade}
          />
          {/* Front Leg (stepping forward) */}
          <CleanPath
            d="M 162 264 L 198 264 L 210 404 L 222 552 L 204 554 L 186 410 L 164 282 Z"
            fill={PALETTE.cloth}
          />
          {/* Front Shoe */}
          <CleanPath
            d="M 202 552 L 223 551 L 244 565 C 246 571, 240 574, 232 574 L 198 574 Z"
            fill={shoeTone}
          />
          <path d="M 199 570 L 243 570" stroke={PALETTE.clothDeep} strokeWidth="2" />
        </g>
      );
    }

    // Side standing
    return (
      <g>
        {/* Slight back leg shadow */}
        <CleanPath
          d="M 172 264 L 198 264 L 198 412 L 194 554 L 176 554 L 174 412 Z"
          fill={PALETTE.clothShade}
        />
        <CleanPath
          d="M 176 554 L 196 554 L 216 566 C 218 572, 212 574, 204 574 L 173 574 Z"
          fill={PALETTE.clothShade}
        />
        {/* Near leg */}
        <CleanPath
          d="M 161 264 L 197 264 L 194 414 L 188 554 L 169 554 L 164 414 Z"
          fill={PALETTE.cloth}
        />
        {/* Near shoe */}
        <CleanPath
          d="M 167 553 L 189 553 L 212 566 C 214 572, 208 575, 200 575 L 165 575 Z"
          fill={shoeTone}
        />
        <path d="M 166 570 L 211 570" stroke={PALETTE.clothDeep} strokeWidth="2" />
      </g>
    );
  }

  if (angle === 'three-quarter') {
    if (isWalking) {
      return (
        <g>
          {/* Back Leg (left/far) */}
          <CleanPath
            d="M 151 265 L 182 265 L 166 410 L 146 552 L 164 554 L 186 410 L 186 265 Z"
            fill={PALETTE.clothShade}
          />
          <CleanPath
            d="M 145 552 L 166 553 L 172 569 C 172 574, 165 575, 156 575 L 138 575 C 134 575, 136 564, 145 552 Z"
            fill={PALETTE.clothShade}
          />

          {/* Front Leg (right/near) */}
          <CleanPath
            d="M 178 265 L 209 265 L 216 408 L 222 553 L 202 554 L 190 412 L 178 292 Z"
            fill={PALETTE.cloth}
          />
          <CleanPath
            d="M 200 553 L 223 552 L 240 567 C 242 572, 236 575, 228 575 L 198 575 Z"
            fill={shoeTone}
          />
          <path d="M 199 570 L 239 570" stroke={PALETTE.clothDeep} strokeWidth="2" />
        </g>
      );
    }

    // 3/4 Standing
    return (
      <g>
        {/* Pelvis + Both legs cleanly joined */}
        <CleanPath
          d="M 151 265
             L 209 265
             L 208 410
             L 202 554
             L 184 554
             L 184 410
             L 179 324
             L 174 410
             L 168 552
             L 150 552
             L 149 410 Z"
          fill={PALETTE.cloth}
        />
        {/* Far leg inner shadow */}
        <path
          d="M 183 324 L 188 410 L 188 553 L 184 553 L 184 410 L 179 324 Z"
          fill={PALETTE.clothShade}
        />
        {/* Left Shoe */}
        <CleanPath
          d="M 149 551 L 170 551 L 176 567 C 177 572, 171 575, 163 575 L 143 575 C 139 575, 141 562, 149 551 Z"
          fill={shoeTone}
        />
        <path d="M 143 570 L 174 570" stroke={PALETTE.clothDeep} strokeWidth="2" />

        {/* Right Shoe */}
        <CleanPath
          d="M 184 553 L 204 553 L 220 566 C 222 572, 216 575, 208 575 L 182 575 Z"
          fill={shoeTone}
        />
        <path d="M 183 570 L 219 570" stroke={PALETTE.clothDeep} strokeWidth="2" />
      </g>
    );
  }

  // Front view
  if (isWalking) {
    return (
      <g>
        {/* Back step leg */}
        <CleanPath
          d="M 180 265 L 211 265 L 214 406 L 218 546 L 198 548 L 190 408 L 180 318 Z"
          fill={PALETTE.clothShade}
        />
        <CleanPath
          d="M 197 547 L 219 545 L 225 562 C 226 567, 220 569, 212 569 L 194 569 Z"
          fill={PALETTE.clothShade}
        />

        {/* Forward step leg */}
        <CleanPath
          d="M 149 265 L 182 265 L 174 410 L 166 554 L 146 554 L 148 408 Z"
          fill={PALETTE.cloth}
        />
        <CleanPath
          d="M 145 553 L 167 553 L 170 571 C 170 575, 164 576, 155 576 C 145 576, 141 573, 142 568 Z"
          fill={shoeTone}
        />
        <path d="M 143 571 L 169 571" stroke={PALETTE.clothDeep} strokeWidth="2" />
      </g>
    );
  }

  // Front standard stance
  return (
    <g>
      <CleanPath
        d="M 149 265
           L 211 265
           L 210 412
           L 204 554
           L 186 554
           L 184 412
           L 180 326
           L 176 412
           L 174 554
           L 156 554
           L 150 412 Z"
        fill={PALETTE.cloth}
      />
      {/* Subtle trouser center fly & crease lines */}
      <path d="M 180 272 L 180 318" stroke={PALETTE.clothDeep} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 164 380 L 164 460" stroke={PALETTE.clothShade} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 196 380 L 196 460" stroke={PALETTE.clothShade} strokeWidth="1.5" strokeLinecap="round" />

      {/* Left Shoe */}
      <CleanPath
        d="M 155 553 L 175 553 L 176 568 C 176 574, 169 576, 160 576 C 151 576, 145 574, 147 567 Z"
        fill={shoeTone}
      />
      <path d="M 147 571 L 175 571" stroke={PALETTE.clothDeep} strokeWidth="2" />

      {/* Right Shoe */}
      <CleanPath
        d="M 185 553 L 205 553 L 213 567 C 215 574, 209 576, 200 576 C 191 576, 184 574, 184 568 Z"
        fill={shoeTone}
      />
      <path d="M 185 571 L 213 571" stroke={PALETTE.clothDeep} strokeWidth="2" />
    </g>
  );
}

function ArmSleeveAndLimbs({
  angle,
  pose,
  outfit,
  layer,
}: {
  angle: CharacterAngle;
  pose: CharacterPose;
  outfit: WhiteOutfitStyle;
  layer: 'back' | 'front';
}) {
  const isSmart = outfit === 'smart-white';
  const sleeveFill = PALETTE.cloth;
  const backSleeveFill = PALETTE.clothShade;

  // Helper for rendering an arm with shoulder -> elbow -> wrist + hand
  // In casual-white, sleeve stops around mid-upper-arm; in smart-white, full sleeve to wrist.
  if (angle === 'side') {
    if (layer === 'back') {
      // Far arm behind torso when walking or pointing
      if (pose === 'walking') {
        return (
          <g>
            {/* Far arm swinging forward slightly */}
            <CleanPath
              d="M 182 150 L 198 205 L 212 248 L 199 253 L 182 210 L 170 156 Z"
              fill={isSmart ? backSleeveFill : PALETTE.skinShade}
            />
            <CleanPath
              d="M 199 252 C 201 264, 209 266, 213 262 C 216 258, 214 251, 211 247 Z"
              fill={PALETTE.skinShade}
            />
          </g>
        );
      }
      if (pose === 'pointing') {
        return (
          <g>
            {/* Far arm relaxed */}
            <CleanPath
              d="M 180 152 L 184 218 L 186 270 L 173 270 L 170 218 L 166 155 Z"
              fill={isSmart ? backSleeveFill : PALETTE.skinShade}
            />
          </g>
        );
      }
      return null;
    }

    // Side view Front (near) arm
    if (pose === 'standing') {
      return (
        <g>
          {/* Upper + Forearm */}
          <CleanPath
            d="M 168 152 C 168 144, 184 144, 186 156 L 188 214 L 186 274 L 171 274 L 170 214 Z"
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {/* Short sleeve over upper arm if casual */}
          {!isSmart && (
            <CleanPath
              d="M 167 152 C 168 141, 186 142, 187 156 L 189 194 Q 178 197 167 194 Z"
              fill={sleeveFill}
            />
          )}
          {/* Hand */}
          <CleanPath
            d="M 171 274 L 186 274 L 188 290 C 188 296, 182 298, 177 296 C 172 294, 170 286, 171 274 Z"
            fill={PALETTE.skin}
          />
        </g>
      );
    }

    if (pose === 'waving') {
      return (
        <g>
          <CleanPath
            d="M 168 154 C 168 144, 184 145, 186 156 L 204 192 L 228 134 L 241 140 L 214 206 C 210 214, 200 214, 195 206 L 171 168 Z"
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d="M 167 154 C 168 142, 185 144, 187 158 L 198 182 Q 189 188 179 186 Z"
              fill={sleeveFill}
            />
          )}
          {/* Waving Hand */}
          <CleanPath
            d="M 227 134 L 232 114 C 233 110, 237 110, 237 115 L 236 123 L 241 112 C 243 108, 247 110, 245 115 L 241 126 L 246 119 C 248 116, 251 118, 249 123 L 242 138 Z"
            fill={PALETTE.skin}
          />
        </g>
      );
    }

    if (pose === 'crossed-arms') {
      return (
        <g>
          <CleanPath
            d="M 166 154 C 168 143, 184 144, 186 156 L 186 202 L 218 206 L 217 222 L 176 218 C 169 217, 166 211, 166 203 Z"
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d="M 166 154 C 168 142, 184 143, 186 156 L 187 192 Q 176 195 166 192 Z"
              fill={sleeveFill}
            />
          )}
          <CleanPath
            d="M 216 207 C 223 207, 227 212, 226 217 C 225 222, 220 223, 215 222 Z"
            fill={PALETTE.skin}
          />
        </g>
      );
    }

    if (pose === 'walking') {
      return (
        <g>
          {/* Near arm swinging backward */}
          <CleanPath
            d="M 168 153 C 170 144, 184 145, 185 156 L 166 214 L 146 262 L 133 257 L 152 208 Z"
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d="M 167 153 C 170 142, 185 144, 186 158 L 176 190 Q 165 188 157 183 Z"
              fill={sleeveFill}
            />
          )}
          <CleanPath
            d="M 134 256 L 147 261 L 142 276 C 139 281, 132 280, 130 274 C 128 269, 130 262, 134 256 Z"
            fill={PALETTE.skin}
          />
        </g>
      );
    }

    if (pose === 'pointing') {
      return (
        <g>
          <CleanPath
            d="M 168 154 C 170 143, 186 144, 187 156 L 200 182 L 266 176 L 267 191 L 194 198 C 187 198, 182 194, 179 187 Z"
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d="M 167 154 C 170 142, 186 143, 188 156 L 196 180 Q 186 186 175 183 Z"
              fill={sleeveFill}
            />
          )}
          {/* Pointing hand */}
          <CleanPath
            d="M 266 176 L 288 175 C 292 175, 292 181, 287 182 L 274 183 C 278 186, 276 192, 267 192 Z"
            fill={PALETTE.skin}
          />
        </g>
      );
    }

    // thinking side
    return (
      <g>
        <CleanPath
          d="M 168 154 C 170 144, 184 145, 186 156 L 188 194 L 204 126 L 216 131 L 198 206 C 195 213, 185 213, 180 206 L 169 175 Z"
          fill={isSmart ? sleeveFill : PALETTE.skin}
        />
        {!isSmart && (
          <CleanPath
            d="M 167 154 C 170 142, 185 144, 187 158 L 188 190 Q 178 193 169 189 Z"
            fill={sleeveFill}
          />
        )}
        {/* Hand touching chin */}
        <CleanPath
          d="M 202 126 L 196 114 C 196 110, 202 109, 205 113 L 214 122 L 216 132 Z"
          fill={PALETTE.skin}
        />
      </g>
    );
  }

  // Front & 3/4 Views (Left = character's right arm at x~136, Right = character's left arm at x~224)
  const leftShoulderX = angle === 'three-quarter' ? 142 : 138;
  const rightShoulderX = angle === 'three-quarter' ? 214 : 222;
  const shoulderY = 149;

  if (layer === 'back') {
    // Only render arms that stay behind or parallel to torso in back layer; crossed-arms/thinking/waving hands render in frontLayer!
    if (pose === 'crossed-arms' || pose === 'thinking') {
      return null;
    }

    if (pose === 'standing') {
      return (
        <g>
          {/* Left Arm (viewer left) */}
          <CleanPath
            d={`M ${leftShoulderX} ${shoulderY - 4} C ${leftShoulderX - 10} ${shoulderY}, ${leftShoulderX - 14} ${shoulderY + 12}, ${leftShoulderX - 14} ${shoulderY + 26} L ${leftShoulderX - 17} 222 L ${leftShoulderX - 18} 278 L ${leftShoulderX - 4} 278 L ${leftShoulderX - 2} 222 L ${leftShoulderX + 4} 165 Z`}
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d={`M ${leftShoulderX} ${shoulderY - 5} C ${leftShoulderX - 12} ${shoulderY}, ${leftShoulderX - 15} ${shoulderY + 14}, ${leftShoulderX - 15} ${shoulderY + 38} Q ${leftShoulderX - 4} ${shoulderY + 42} ${leftShoulderX + 5} ${shoulderY + 35} L ${leftShoulderX + 6} 165 Z`}
              fill={sleeveFill}
            />
          )}
          <CleanPath
            d={`M ${leftShoulderX - 18} 278 L ${leftShoulderX - 4} 278 L ${leftShoulderX - 2} 296 C ${leftShoulderX - 2} 302, ${leftShoulderX - 9} 304, ${leftShoulderX - 14} 300 C ${leftShoulderX - 18} 296, ${leftShoulderX - 19} 286, ${leftShoulderX - 18} 278 Z`}
            fill={PALETTE.skin}
          />

          {/* Right Arm (viewer right) */}
          <CleanPath
            d={`M ${rightShoulderX} ${shoulderY - 4} C ${rightShoulderX + 10} ${shoulderY}, ${rightShoulderX + 14} ${shoulderY + 12}, ${rightShoulderX + 14} ${shoulderY + 26} L ${rightShoulderX + 17} 222 L ${rightShoulderX + 18} 278 L ${rightShoulderX + 4} 278 L ${rightShoulderX + 2} 222 L ${rightShoulderX - 4} 165 Z`}
            fill={isSmart ? (angle === 'three-quarter' ? backSleeveFill : sleeveFill) : (angle === 'three-quarter' ? PALETTE.skinShade : PALETTE.skin)}
          />
          {!isSmart && (
            <CleanPath
              d={`M ${rightShoulderX} ${shoulderY - 5} C ${rightShoulderX + 12} ${shoulderY}, ${rightShoulderX + 15} ${shoulderY + 14}, ${rightShoulderX + 15} ${shoulderY + 38} Q ${rightShoulderX + 4} ${shoulderY + 42} ${rightShoulderX - 5} ${shoulderY + 35} L ${rightShoulderX - 6} 165 Z`}
              fill={angle === 'three-quarter' ? backSleeveFill : sleeveFill}
            />
          )}
          <CleanPath
            d={`M ${rightShoulderX + 4} 278 L ${rightShoulderX + 18} 278 L ${rightShoulderX + 19} 296 C ${rightShoulderX + 18} 302, ${rightShoulderX + 11} 304, ${rightShoulderX + 6} 300 C ${rightShoulderX + 2} 296, ${rightShoulderX + 3} 286, ${rightShoulderX + 4} 278 Z`}
            fill={angle === 'three-quarter' ? PALETTE.skinShade : PALETTE.skin}
          />
        </g>
      );
    }

    if (pose === 'walking') {
      return (
        <g>
          {/* Left arm swinging back slightly */}
          <CleanPath
            d={`M ${leftShoulderX} ${shoulderY - 4} C ${leftShoulderX - 11} ${shoulderY}, ${leftShoulderX - 15} ${shoulderY + 14}, ${leftShoulderX - 18} 214 L ${leftShoulderX - 24} 266 L ${leftShoulderX - 11} 269 L ${leftShoulderX - 3} 216 L ${leftShoulderX + 5} 166 Z`}
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d={`M ${leftShoulderX} ${shoulderY - 5} C ${leftShoulderX - 12} ${shoulderY}, ${leftShoulderX - 16} ${shoulderY + 14}, ${leftShoulderX - 17} ${shoulderY + 38} Q ${leftShoulderX - 5} ${shoulderY + 41} ${leftShoulderX + 4} ${shoulderY + 34} L ${leftShoulderX + 6} 166 Z`}
              fill={sleeveFill}
            />
          )}
          <CleanPath
            d={`M ${leftShoulderX - 24} 266 L ${leftShoulderX - 11} 269 L ${leftShoulderX - 12} 285 C ${leftShoulderX - 14} 290, ${leftShoulderX - 21} 290, ${leftShoulderX - 24} 284 Z`}
            fill={PALETTE.skin}
          />

          {/* Right arm swinging forward slightly */}
          <CleanPath
            d={`M ${rightShoulderX} ${shoulderY - 4} C ${rightShoulderX + 11} ${shoulderY}, ${rightShoulderX + 15} ${shoulderY + 14}, ${rightShoulderX + 19} 212 L ${rightShoulderX + 27} 260 L ${rightShoulderX + 14} 264 L ${rightShoulderX + 4} 216 L ${rightShoulderX - 4} 166 Z`}
            fill={isSmart ? backSleeveFill : PALETTE.skinShade}
          />
          {!isSmart && (
            <CleanPath
              d={`M ${rightShoulderX} ${shoulderY - 5} C ${rightShoulderX + 12} ${shoulderY}, ${rightShoulderX + 16} ${shoulderY + 14}, ${rightShoulderX + 17} ${shoulderY + 38} Q ${rightShoulderX + 5} ${shoulderY + 41} ${rightShoulderX - 4} ${shoulderY + 34} L ${rightShoulderX - 6} 166 Z`}
              fill={backSleeveFill}
            />
          )}
          <CleanPath
            d={`M ${rightShoulderX + 14} 264 L ${rightShoulderX + 27} 260 L ${rightShoulderX + 29} 276 C ${rightShoulderX + 27} 282, ${rightShoulderX + 20} 283, ${rightShoulderX + 16} 277 Z`}
            fill={PALETTE.skinShade}
          />
        </g>
      );
    }

    if (pose === 'waving') {
      // Right arm (viewer right) relaxed at side in back layer
      return (
        <g>
          <CleanPath
            d={`M ${rightShoulderX} ${shoulderY - 4} C ${rightShoulderX + 10} ${shoulderY}, ${rightShoulderX + 14} ${shoulderY + 12}, ${rightShoulderX + 14} ${shoulderY + 26} L ${rightShoulderX + 17} 222 L ${rightShoulderX + 18} 278 L ${rightShoulderX + 4} 278 L ${rightShoulderX + 2} 222 L ${rightShoulderX - 4} 165 Z`}
            fill={isSmart ? (angle === 'three-quarter' ? backSleeveFill : sleeveFill) : (angle === 'three-quarter' ? PALETTE.skinShade : PALETTE.skin)}
          />
          {!isSmart && (
            <CleanPath
              d={`M ${rightShoulderX} ${shoulderY - 5} C ${rightShoulderX + 12} ${shoulderY}, ${rightShoulderX + 15} ${shoulderY + 14}, ${rightShoulderX + 15} ${shoulderY + 38} Q ${rightShoulderX + 4} ${shoulderY + 42} ${rightShoulderX - 5} ${shoulderY + 35} L ${rightShoulderX - 6} 165 Z`}
              fill={angle === 'three-quarter' ? backSleeveFill : sleeveFill}
            />
          )}
          <CleanPath
            d={`M ${rightShoulderX + 4} 278 L ${rightShoulderX + 18} 278 L ${rightShoulderX + 19} 296 C ${rightShoulderX + 18} 302, ${rightShoulderX + 11} 304, ${rightShoulderX + 6} 300 Z`}
            fill={angle === 'three-quarter' ? PALETTE.skinShade : PALETTE.skin}
          />
        </g>
      );
    }

    if (pose === 'pointing') {
      // Left arm (viewer left) relaxed at side
      return (
        <g>
          <CleanPath
            d={`M ${leftShoulderX} ${shoulderY - 4} C ${leftShoulderX - 10} ${shoulderY}, ${leftShoulderX - 14} ${shoulderY + 12}, ${leftShoulderX - 14} ${shoulderY + 26} L ${leftShoulderX - 17} 222 L ${leftShoulderX - 18} 278 L ${leftShoulderX - 4} 278 L ${leftShoulderX - 2} 222 L ${leftShoulderX + 4} 165 Z`}
            fill={isSmart ? sleeveFill : PALETTE.skin}
          />
          {!isSmart && (
            <CleanPath
              d={`M ${leftShoulderX} ${shoulderY - 5} C ${leftShoulderX - 12} ${shoulderY}, ${leftShoulderX - 15} ${shoulderY + 14}, ${leftShoulderX - 15} ${shoulderY + 38} Q ${leftShoulderX - 4} ${shoulderY + 42} ${leftShoulderX + 5} ${shoulderY + 35} L ${leftShoulderX + 6} 165 Z`}
              fill={sleeveFill}
            />
          )}
          <CleanPath
            d={`M ${leftShoulderX - 18} 278 L ${leftShoulderX - 4} 278 L ${leftShoulderX - 2} 296 C ${leftShoulderX - 2} 302, ${leftShoulderX - 9} 304, ${leftShoulderX - 14} 300 Z`}
            fill={PALETTE.skin}
          />
        </g>
      );
    }

    return null;
  }

  // FRONT LAYER (arms in front of torso/head)
  if (pose === 'waving') {
    // Viewer left arm raised cheerfully waving
    return (
      <g>
        <CleanPath
          d={`M ${leftShoulderX} ${shoulderY - 4}
             C ${leftShoulderX - 12} ${shoulderY - 2}, ${leftShoulderX - 24} ${shoulderY + 10}, ${leftShoulderX - 38} ${shoulderY + 22}
             L ${leftShoulderX - 58} 108
             L ${leftShoulderX - 44} 104
             L ${leftShoulderX - 30} ${shoulderY + 10}
             L ${leftShoulderX + 2} ${shoulderY + 12} Z`}
          fill={isSmart ? sleeveFill : PALETTE.skin}
        />
        {!isSmart && (
          <CleanPath
            d={`M ${leftShoulderX} ${shoulderY - 5}
               C ${leftShoulderX - 12} ${shoulderY - 3}, ${leftShoulderX - 25} ${shoulderY + 9}, ${leftShoulderX - 34} ${shoulderY + 18}
               Q ${leftShoulderX - 24} ${shoulderY + 28} ${leftShoulderX - 14} ${shoulderY + 26}
               L ${leftShoulderX + 4} ${shoulderY + 14} Z`}
            fill={sleeveFill}
          />
        )}
        {/* Open waving hand */}
        <CleanPath
          d={`M ${leftShoulderX - 58} 108
             L ${leftShoulderX - 65} 90
             C ${leftShoulderX - 66} 86, ${leftShoulderX - 61} 85, ${leftShoulderX - 59} 90
             L ${leftShoulderX - 55} 99
             L ${leftShoulderX - 58} 83
             C ${leftShoulderX - 59} 79, ${leftShoulderX - 54} 78, ${leftShoulderX - 53} 83
             L ${leftShoulderX - 50} 97
             L ${leftShoulderX - 50} 82
             C ${leftShoulderX - 50} 78, ${leftShoulderX - 45} 78, ${leftShoulderX - 45} 83
             L ${leftShoulderX - 45} 98
             L ${leftShoulderX - 40} 90
             C ${leftShoulderX - 38} 87, ${leftShoulderX - 35} 89, ${leftShoulderX - 37} 94
             L ${leftShoulderX - 44} 106 Z`}
          fill={PALETTE.skin}
        />
      </g>
    );
  }

  if (pose === 'pointing') {
    // Viewer right arm extended outward pointing
    return (
      <g>
        <CleanPath
          d={`M ${rightShoulderX} ${shoulderY - 4}
             C ${rightShoulderX + 12} ${shoulderY - 2}, ${rightShoulderX + 26} ${shoulderY + 6}, ${rightShoulderX + 44} ${shoulderY + 14}
             L ${rightShoulderX + 86} ${shoulderY + 12}
             L ${rightShoulderX + 86} ${shoulderY + 26}
             L ${rightShoulderX + 40} ${shoulderY + 30}
             L ${rightShoulderX - 3} ${shoulderY + 16} Z`}
          fill={isSmart ? sleeveFill : PALETTE.skin}
        />
        {!isSmart && (
          <CleanPath
            d={`M ${rightShoulderX} ${shoulderY - 5}
               C ${rightShoulderX + 12} ${shoulderY - 3}, ${rightShoulderX + 24} ${shoulderY + 4}, ${rightShoulderX + 34} ${shoulderY + 10}
               Q ${rightShoulderX + 30} ${shoulderY + 24} ${rightShoulderX + 20} ${shoulderY + 26}
               L ${rightShoulderX - 4} ${shoulderY + 16} Z`}
            fill={sleeveFill}
          />
        )}
        {/* Pointing hand */}
        <CleanPath
          d={`M ${rightShoulderX + 86} ${shoulderY + 12}
             L ${rightShoulderX + 107} ${shoulderY + 12}
             C ${rightShoulderX + 111} ${shoulderY + 12}, ${rightShoulderX + 111} ${shoulderY + 18}, ${rightShoulderX + 106} ${shoulderY + 18}
             L ${rightShoulderX + 94} ${shoulderY + 19}
             C ${rightShoulderX + 97} ${shoulderY + 23}, ${rightShoulderX + 94} ${shoulderY + 28}, ${rightShoulderX + 86} ${shoulderY + 27} Z`}
          fill={PALETTE.skin}
        />
      </g>
    );
  }

  if (pose === 'crossed-arms') {
    return (
      <g>
        {/* Left Upper Arm */}
        <CleanPath
          d={`M ${leftShoulderX} ${shoulderY - 4} C ${leftShoulderX - 12} ${shoulderY}, ${leftShoulderX - 15} ${shoulderY + 14}, ${leftShoulderX - 14} 198 L ${leftShoulderX - 2} 198 L ${leftShoulderX + 5} 164 Z`}
          fill={sleeveFill}
        />
        {/* Right Upper Arm */}
        <CleanPath
          d={`M ${rightShoulderX} ${shoulderY - 4} C ${rightShoulderX + 12} ${shoulderY}, ${rightShoulderX + 15} ${shoulderY + 14}, ${rightShoulderX + 14} 198 L ${rightShoulderX + 2} 198 L ${rightShoulderX - 5} 164 Z`}
          fill={angle === 'three-quarter' ? backSleeveFill : sleeveFill}
        />

        {/* Lower Forearms folded across chest */}
        <CleanPath
          d={`M ${rightShoulderX + 14} 196 C ${rightShoulderX + 15} 208, ${rightShoulderX + 6} 214, ${rightShoulderX - 4} 214 L ${leftShoulderX + 12} 208 L ${leftShoulderX + 14} 194 L ${rightShoulderX - 2} 198 Z`}
          fill={isSmart ? backSleeveFill : PALETTE.skinShade}
        />
        <CleanPath
          d={`M ${leftShoulderX - 14} 196 C ${leftShoulderX - 15} 210, ${leftShoulderX - 4} 218, ${leftShoulderX + 8} 218 L ${rightShoulderX - 14} 212 L ${rightShoulderX - 16} 197 L ${leftShoulderX + 2} 200 Z`}
          fill={isSmart ? sleeveFill : PALETTE.skin}
        />
        {/* Tucked Hand */}
        <CleanPath
          d={`M ${rightShoulderX - 15} 198 C ${rightShoulderX - 6} 197, ${rightShoulderX - 2} 202, ${rightShoulderX - 3} 208 C ${rightShoulderX - 4} 212, ${rightShoulderX - 10} 213, ${rightShoulderX - 16} 211 Z`}
          fill={PALETTE.skin}
        />
      </g>
    );
  }

  if (pose === 'thinking') {
    return (
      <g>
        {/* Left arm supporting across waist */}
        <CleanPath
          d={`M ${leftShoulderX} ${shoulderY - 4} C ${leftShoulderX - 11} ${shoulderY}, ${leftShoulderX - 14} ${shoulderY + 14}, ${leftShoulderX - 13} 210 L ${rightShoulderX - 10} 216 L ${rightShoulderX - 10} 202 L ${leftShoulderX + 2} 198 L ${leftShoulderX + 5} 165 Z`}
          fill={isSmart ? sleeveFill : PALETTE.skin}
        />
        {!isSmart && (
          <CleanPath
            d={`M ${leftShoulderX} ${shoulderY - 5} C ${leftShoulderX - 12} ${shoulderY}, ${leftShoulderX - 15} ${shoulderY + 14}, ${leftShoulderX - 14} ${shoulderY + 38} Q ${leftShoulderX - 3} ${shoulderY + 41} ${leftShoulderX + 4} ${shoulderY + 34} L ${leftShoulderX + 6} 165 Z`}
            fill={sleeveFill}
          />
        )}

        {/* Right arm resting elbow on left hand and rising to chin */}
        <CleanPath
          d={`M ${rightShoulderX} ${shoulderY - 4} C ${rightShoulderX + 12} ${shoulderY}, ${rightShoulderX + 16} ${shoulderY + 14}, ${rightShoulderX + 14} 202 C ${rightShoulderX + 12} 214, ${rightShoulderX + 2} 214, ${rightShoulderX - 4} 204 L 185 128 L 197 125 L ${rightShoulderX + 2} 190 L ${rightShoulderX - 3} 165 Z`}
          fill={isSmart ? sleeveFill : PALETTE.skin}
        />
        {!isSmart && (
          <CleanPath
            d={`M ${rightShoulderX} ${shoulderY - 5} C ${rightShoulderX + 12} ${shoulderY}, ${rightShoulderX + 16} ${shoulderY + 14}, ${rightShoulderX + 15} ${shoulderY + 38} Q ${rightShoulderX + 5} ${shoulderY + 41} ${rightShoulderX - 4} ${shoulderY + 34} L ${rightShoulderX - 6} 165 Z`}
            fill={sleeveFill}
          />
        )}
        {/* Hand thoughtfully resting near chin */}
        <CleanPath
          d="M 183 128 L 177 115 C 176 111, 182 110, 185 114 L 189 120 L 195 113 C 198 111, 201 114, 198 119 L 195 127 Z"
          fill={PALETTE.skin}
        />
      </g>
    );
  }

  return null;
}

export const WhiteMaleCharacter: React.FC<WhiteMaleCharacterProps> = ({
  angle,
  pose,
  expression,
  outfit,
  showGrid = false,
  isDarkBackdrop = false,
  svgRef,
  className = '',
}) => {
  const shadowColor = isDarkBackdrop ? 'rgba(0, 0, 0, 0.45)' : 'rgba(15, 23, 42, 0.14)';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 360 620"
      className={className}
      role="img"
      aria-label="Beyaz tenli ve beyaz kıyafetli standart vektörel erkek karakter çizimi"
    >
      {/* Ground Contact Shadow */}
      <ellipse cx="180" cy="580" rx={angle === 'side' ? 42 : 58} ry="10" fill={shadowColor} />

      {/* 1. Back Arm Layer */}
      <ArmSleeveAndLimbs angle={angle} pose={pose} outfit={outfit} layer="back" />

      {/* 2. Legs & White Shoes */}
      <LegsAndShoes angle={angle} pose={pose} outfit={outfit} />

      {/* 3. White Outfit Torso */}
      <Torso angle={angle} outfit={outfit} />

      {/* 4. Neck, Head, Hair & Facial Expression */}
      <HeadAndNeck angle={angle} expression={expression} outfit={outfit} />

      {/* 5. Front Arm Layer (over torso/chin for waving, pointing, crossed arms, thinking) */}
      <ArmSleeveAndLimbs angle={angle} pose={pose} outfit={outfit} layer="front" />

      {/* 6. Optional Anatomical 7.5-Head Guide Overlay (excluded on export) */}
      {showGrid && <AnatomicalGuideOverlay isDark={isDarkBackdrop} />}
    </svg>
  );
};
