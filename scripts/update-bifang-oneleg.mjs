import fs from 'node:fs'
import path from 'node:path'

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" width="100%" height="100%">
  <defs>
    <radialGradient id="bg-nebula" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#082f49"/>
      <stop offset="50%" stop-color="#0c1e33"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="gold-branch" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="50%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#713f12"/>
    </linearGradient>
    <linearGradient id="feather-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="40%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <linearGradient id="fire-red" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="30%" stop-color="#f97316"/>
      <stop offset="70%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="900" height="700" fill="url(#bg-nebula)"/>

  <!-- 大荒古木与奇峰古枝 -->
  <path d="M-20 620 C180 580 320 640 450 560 C580 480 720 540 920 500" stroke="url(#gold-branch)" stroke-width="28" stroke-linecap="round" fill="none" opacity="0.85"/>
  <path d="M380 580 C410 520 440 460 460 410" stroke="url(#gold-branch)" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.9"/>
  
  <!-- 灵气神火烈焰环绕 (讹火之兆) -->
  <circle cx="480" cy="280" r="240" fill="#ef4444" opacity="0.12" filter="url(#glow)"/>
  <path d="M320 420 C280 300 360 200 480 180 C600 160 680 260 640 380 C600 480 480 500 420 460" stroke="url(#fire-red)" stroke-width="4" stroke-dasharray="8 6" fill="none" opacity="0.45"/>
  
  <!-- 毕方主体 (青羽、赤纹、白喙) -->
  <g transform="translate(470, 290)">
    <!-- 华丽飘逸之青羽尾翎与赤火羽纹 -->
    <path d="M40 60 C120 120 180 200 240 280 C210 240 180 180 120 120" fill="url(#feather-cyan)" opacity="0.9"/>
    <path d="M30 70 C90 150 140 240 180 340 C150 280 120 200 70 120" fill="url(#fire-red)" opacity="0.85"/>
    <path d="M20 75 C60 160 90 260 110 370 C90 290 70 210 40 130" fill="url(#feather-cyan)" opacity="0.95"/>

    <!-- 仙禽躯体 (鹤形、青质赤文) -->
    <ellipse cx="0" cy="10" rx="55" ry="75" fill="url(#feather-cyan)" stroke="url(#fire-red)" stroke-width="3.5"/>
    <!-- 腹部与背脊赤色火纹 -->
    <path d="M-25 -20 Q0 10 -20 40 M-10 -30 Q15 0 0 50 M10 -25 Q30 5 15 45" stroke="url(#fire-red)" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- 展翔仙翼 (单侧优雅收展) -->
    <path d="M-20 -20 C-100 -90 -160 -40 -120 40 C-80 90 -30 60 -10 20 Z" fill="url(#feather-cyan)" stroke="url(#fire-red)" stroke-width="2.5"/>
    
    <!-- 优雅修长鹤颈与灵禽首级 -->
    <path d="M-15 -60 C-30 -120 -15 -180 -5 -210" stroke="url(#feather-cyan)" stroke-width="22" stroke-linecap="round" fill="none"/>
    <circle cx="-5" cy="-210" r="24" fill="url(#feather-cyan)" stroke="url(#fire-red)" stroke-width="2"/>
    <!-- 额顶赤丹火冠 -->
    <path d="M-12 -230 Q-25 -265 -5 -275 Q15 -260 2 -230 Z" fill="url(#fire-red)" filter="url(#glow)"/>
    <!-- 白喙 (长喙如玉，口衔神火) -->
    <polygon points="-25,-215 -85,-205 -25,-198" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="-88" cy="-204" r="10" fill="#ef4444" filter="url(#glow)"/>
    <!-- 金瞳神眸 -->
    <circle cx="-10" cy="-212" r="4" fill="#fef08a"/>
    <circle cx="-10" cy="-212" r="2" fill="#020617"/>

    <!-- 【最核心特征】：独足！仅此单足直立于苍虬古木之上 -->
    <!-- 单独一只苍劲有力之赤金神爪 (独足一足) -->
    <g stroke="url(#gold-branch)" stroke-width="10" stroke-linecap="round" fill="none">
      <line x1="-5" y1="80" x2="-10" y2="195"/>
    </g>
    <!-- 关节金环与锐利爪趾 -->
    <circle cx="-10" cy="195" r="7" fill="#fde047"/>
    <g stroke="#fde047" stroke-width="6" stroke-linecap="round">
      <line x1="-10" y1="195" x2="-40" y2="220"/>
      <line x1="-10" y1="195" x2="-10" y2="230"/>
      <line x1="-10" y1="195" x2="20" y2="220"/>
      <line x1="-10" y1="195" x2="5" y2="180"/>
    </g>
  </g>

  <!-- 醒目标识印章 -->
  <g transform="translate(50, 50)">
    <rect width="130" height="160" rx="8" fill="#0f172a" stroke="url(#gold-branch)" stroke-width="1.5" opacity="0.9" filter="url(#glow)"/>
    <text x="65" y="42" fill="#fef08a" font-family="'Songti SC', SimSun, serif" font-size="28" font-weight="900" text-anchor="middle" letter-spacing="4">毕方</text>
    <text x="65" y="68" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" letter-spacing="2">bì fāng</text>
    <line x1="25" y1="82" x2="105" y2="82" stroke="#eab308" stroke-width="0.8" opacity="0.6"/>
    <text x="65" y="106" fill="#fca5a5" font-family="'Songti SC', SimSun, serif" font-size="13" font-weight="bold" text-anchor="middle">其状如鹤 · 一足</text>
    <text x="65" y="128" fill="#cbd5e1" font-family="'Songti SC', SimSun, serif" font-size="12" text-anchor="middle">赤文青质而白喙</text>
    <rect x="48" y="136" width="34" height="20" rx="3" fill="#8b261e" stroke="#fca5a5" stroke-width="0.8"/>
    <text x="65" y="151" fill="#ffffff" font-family="'Songti SC', SimSun, serif" font-size="11" font-weight="bold" text-anchor="middle">十丘</text>
  </g>

  <!-- 边框 -->
  <rect x="16" y="16" width="868" height="668" rx="14" fill="none" stroke="url(#gold-branch)" stroke-width="1.5" opacity="0.5"/>
</svg>`

fs.writeFileSync(path.join(process.cwd(), 'public/images/shanhaijing/digital_art/bifang.png'), svg, 'utf8')
fs.writeFileSync(path.join(process.cwd(), 'public/images/shanhaijing/refined/bifang_refined.svg'), svg, 'utf8')
console.log('✓ Successfully generated strictly ONE-LEGGED Bifang illustration!')
