import fs from 'node:fs'
import path from 'node:path'

const beastsDir = path.join(process.cwd(), 'public/images/shanhaijing/refined')
const mythsDir = path.join(process.cwd(), 'public/images/shanhaijing/refined_myths')
fs.mkdirSync(beastsDir, { recursive: true })
fs.mkdirSync(mythsDir, { recursive: true })

function wrapGongbi(title, pinyin, subtitle, book, auraColor, innerArt) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 640" width="100%" height="100%">
  <defs>
    <!-- 东方矿物颜料与深邃夜空渐变 -->
    <radialGradient id="bg-sky" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="cinnabar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fca5a5"/>
      <stop offset="50%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <linearGradient id="azure-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>
    <linearGradient id="jade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#065f46"/>
    </linearGradient>
    <filter id="aura-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- 宣纸底色与大荒星云背景 -->
  <rect width="900" height="640" fill="url(#bg-sky)"/>
  
  <!-- 灵气光环与太极山岳底轮 -->
  <circle cx="480" cy="310" r="220" fill="${auraColor}" opacity="0.12" filter="url(#aura-glow)"/>
  <circle cx="480" cy="310" r="180" stroke="${auraColor}" stroke-width="1.5" stroke-dasharray="6 6" fill="none" opacity="0.3"/>
  <circle cx="480" cy="310" r="140" stroke="url(#gold-stroke)" stroke-width="0.8" stroke-dasharray="3 3" fill="none" opacity="0.25"/>

  <!-- 大荒山川祥云轮廓线 -->
  <path d="M180 540 Q320 440 480 490 T780 470 T900 520" stroke="url(#gold-stroke)" stroke-width="1.2" fill="none" opacity="0.35"/>
  <path d="M120 570 Q300 500 520 550 T880 530" stroke="${auraColor}" stroke-width="0.8" fill="none" opacity="0.25"/>

  <!-- 神兽主体图形 (准确特征工笔复原) -->
  <g transform="translate(480, 310)">
    ${innerArt}
  </g>

  <!-- 经典国风印章与题跋 -->
  <g transform="translate(40, 40)">
    <rect width="140" height="200" rx="8" fill="#0f172a" stroke="url(#gold-stroke)" stroke-width="1.2" opacity="0.9" filter="url(#aura-glow)"/>
    <text x="70" y="42" fill="#fef08a" font-family="'Songti SC', SimSun, serif" font-size="28" font-weight="900" text-anchor="middle" letter-spacing="4">${title}</text>
    <text x="70" y="68" fill="#94a3b8" font-family="sans-serif" font-size="12" text-anchor="middle" letter-spacing="2">${pinyin}</text>
    <line x1="25" y1="82" x2="115" y2="82" stroke="#eab308" stroke-width="0.8" opacity="0.6"/>
    <text x="70" y="105" fill="#e2e8f0" font-family="'Songti SC', SimSun, serif" font-size="13" font-weight="bold" text-anchor="middle">${book}</text>
    <text x="70" y="128" fill="#cbd5e1" font-family="'Songti SC', SimSun, serif" font-size="12" text-anchor="middle">${subtitle}</text>
    <text x="70" y="150" fill="#94a3b8" font-family="'Songti SC', SimSun, serif" font-size="11" text-anchor="middle">现代精美工笔彩绘</text>
    <rect x="52" y="164" width="36" height="26" rx="4" fill="#8b261e" stroke="#fca5a5" stroke-width="0.8"/>
    <text x="70" y="182" fill="#ffffff" font-family="'Songti SC', SimSun, serif" font-size="13" font-weight="bold" text-anchor="middle">十丘</text>
  </g>

  <!-- 装饰外框与四角云纹 -->
  <rect x="18" y="18" width="864" height="604" rx="12" fill="none" stroke="url(#gold-stroke)" stroke-width="1.5" opacity="0.45"/>
  <rect x="24" y="24" width="852" height="592" rx="8" fill="none" stroke="#94a3b8" stroke-width="0.6" opacity="0.25"/>
</svg>`
}

// 35 种核心神兽精准工笔矢量绘制配置
const beasts = [
  {
    id: 'jiuweihu',
    title: '九尾狐',
    pinyin: 'jiǔ wěi hú',
    subtitle: '青丘瑞兽 · 九尾摇金',
    book: '南山经 · 青丘之山',
    aura: '#f43f5e',
    art: `
      <!-- 九条飘逸狐尾 (扇形展开，赤金渐变) -->
      <g stroke="url(#cinnabar)" stroke-width="14" stroke-linecap="round" fill="none" opacity="0.85">
        <path d="M0 40 Q-160 80 -180 -60 Q-170 -120 -130 -140"/>
        <path d="M0 40 Q-130 50 -150 -90 Q-130 -150 -90 -160"/>
        <path d="M0 40 Q-100 20 -110 -110 Q-90 -170 -40 -180"/>
        <path d="M0 40 Q-60 -10 -60 -130 Q-40 -190 0 -190"/>
        <path d="M0 40 Q0 -20 0 -140 Q10 -200 40 -190"/>
        <path d="M0 40 Q60 -10 60 -130 Q40 -190 80 -180"/>
        <path d="M0 40 Q100 20 110 -110 Q90 -170 120 -150"/>
        <path d="M0 40 Q130 50 150 -90 Q130 -140 150 -120"/>
        <path d="M0 40 Q160 80 180 -60 Q170 -100 170 -80"/>
      </g>
      <!-- 狐身主体 -->
      <ellipse cx="0" cy="30" rx="45" ry="30" fill="#ffffff" stroke="url(#gold-stroke)" stroke-width="2"/>
      <path d="M-20 40 L-25 80 M20 40 L25 80" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
      <!-- 狐首与灵动双耳 -->
      <path d="M-25 -5 L-35 -45 L-10 -20 L10 -20 L35 -45 L25 -5 Z" fill="#ffffff" stroke="url(#cinnabar)" stroke-width="2"/>
      <circle cx="-10" cy="-5" r="3.5" fill="#f43f5e"/>
      <circle cx="10" cy="-5" r="3.5" fill="#f43f5e"/>
      <circle cx="0" cy="5" r="2.5" fill="#1e293b"/>
      <!-- 额间赤砂花钿印记 -->
      <polygon points="0,-18 -4,-10 0,-6 4,-10" fill="#ef4444"/>
    `
  },
  {
    id: 'zhulong',
    title: '烛九阴',
    pinyin: 'zhú jiǔ yīn',
    subtitle: '章尾天龙 · 照彻幽冥',
    book: '海外北经 · 钟山',
    aura: '#ef4444',
    art: `
      <!-- 千里赤龙蜿蜒盘旋身躯 -->
      <path d="M-180 80 C-120 180 120 180 160 60 C200 -60 60 -120 -40 -60 C-120 0 -60 120 40 100 C120 80 140 -20 80 -60" 
            stroke="url(#cinnabar)" stroke-width="24" stroke-linecap="round" fill="none"/>
      <path d="M-180 80 C-120 180 120 180 160 60 C200 -60 60 -120 -40 -60 C-120 0 -60 120 40 100 C120 80 140 -20 80 -60" 
            stroke="url(#gold-stroke)" stroke-width="4" stroke-dasharray="8 6" fill="none"/>
      <!-- 神圣人面首级 -->
      <circle cx="80" cy="-60" r="36" fill="#fef08a" stroke="#ef4444" stroke-width="2"/>
      <!-- 照耀大荒的额顶神烛/赤日灵珠 -->
      <circle cx="80" cy="-110" r="16" fill="#fef08a" filter="url(#aura-glow)"/>
      <line x1="80" y1="-95" x2="80" y2="-75" stroke="#ef4444" stroke-width="3"/>
      <!-- 直目双眸 (闭目为夜，开目为昼) -->
      <line x1="68" y1="-64" x2="68" y2="-52" stroke="#8b261e" stroke-width="3" stroke-linecap="round"/>
      <line x1="92" y1="-64" x2="92" y2="-52" stroke="#8b261e" stroke-width="3" stroke-linecap="round"/>
      <path d="M72 -42 Q80 -38 88 -42" stroke="#8b261e" stroke-width="2" fill="none"/>
    `
  },
  {
    id: 'dijiang',
    title: '帝江',
    pinyin: 'dì jiāng',
    subtitle: '天山神鸟 · 六足四翼',
    book: '西山经 · 天山',
    aura: '#eab308',
    art: `
      <!-- 黄囊圆身，如丹火赤光 -->
      <circle cx="0" cy="0" r="65" fill="url(#gold-stroke)" stroke="#ef4444" stroke-width="4" filter="url(#aura-glow)"/>
      <!-- 四扇神圣飞翼 (四翼展开) -->
      <path d="M-50 -30 C-130 -110 -170 -60 -120 -10 C-90 10 -60 0 -40 -10" fill="url(#cinnabar)" opacity="0.9"/>
      <path d="M50 -30 C130 -110 170 -60 120 -10 C90 10 60 0 40 -10" fill="url(#cinnabar)" opacity="0.9"/>
      <path d="M-45 10 C-120 40 -150 100 -90 90 C-60 80 -40 40 -35 20" fill="url(#gold-stroke)" opacity="0.85"/>
      <path d="M45 10 C120 40 150 100 90 90 C60 80 40 40 35 20" fill="url(#gold-stroke)" opacity="0.85"/>
      <!-- 六只神足 (六足踏空) -->
      <g stroke="#8b261e" stroke-width="6" stroke-linecap="round">
        <line x1="-35" y1="55" x2="-55" y2="105"/>
        <line x1="-15" y1="62" x2="-20" y2="115"/>
        <line x1="5" y1="65" x2="5" y2="120"/>
        <line x1="25" y1="62" x2="30" y2="115"/>
        <line x1="45" y1="55" x2="65" y2="105"/>
        <line x1="-5" y1="60" x2="-5" y2="110"/>
      </g>
      <!-- 混沌无面目，通体回荡神曲歌舞光纹 -->
      <circle cx="0" cy="0" r="40" stroke="#ffffff" stroke-width="2" stroke-dasharray="5 5" fill="none" opacity="0.6"/>
      <circle cx="0" cy="0" r="20" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
    `
  },
  {
    id: 'taotie',
    title: '饕餮',
    pinyin: 'tāo tiè',
    subtitle: '钩吾贪兽 · 目在腋下',
    book: '北山经 · 钩吾之山',
    aura: '#f59e0b',
    art: `
      <!-- 青铜威严巨兽身躯与盘角 -->
      <path d="M-60 -20 C-100 -80 -40 -120 -10 -60 C-30 -40 -40 -30 -60 -20" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
      <path d="M60 -20 C100 -80 40 -120 10 -60 C30 -40 40 -30 60 -20" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
      <!-- 羊身巨腹与青铜饕餮纹饰 -->
      <ellipse cx="0" cy="20" rx="75" ry="55" fill="#1e293b" stroke="url(#gold-stroke)" stroke-width="4"/>
      <!-- 吞天巨口与交错獠牙 -->
      <path d="M-45 30 Q0 65 45 30 Q0 15 -45 30 Z" fill="#8b261e" stroke="url(#gold-stroke)" stroke-width="2"/>
      <polygon points="-30,30 -25,45 -20,30" fill="#ffffff"/>
      <polygon points="30,30 25,45 20,30" fill="#ffffff"/>
      <polygon points="-10,30 -5,48 0,30" fill="#ffffff"/>
      <polygon points="10,30 5,48 0,30" fill="#ffffff"/>
      <!-- 目在腋下 (两腋下生出金光异眸) -->
      <circle cx="-60" cy="15" r="10" fill="#fef08a" stroke="#ef4444" stroke-width="3" filter="url(#aura-glow)"/>
      <circle cx="-60" cy="15" r="4" fill="#000"/>
      <circle cx="60" cy="15" r="10" fill="#fef08a" stroke="#ef4444" stroke-width="3" filter="url(#aura-glow)"/>
      <circle cx="60" cy="15" r="4" fill="#000"/>
    `
  },
  {
    id: 'qiongqi',
    title: '穷奇',
    pinyin: 'qióng qí',
    subtitle: '邽山凶兽 · 飞翼猛虎',
    book: '西山经 · 邽山',
    aura: '#dc2626',
    art: `
      <!-- 猛虎身躯与斑纹 -->
      <ellipse cx="0" cy="30" rx="60" ry="35" fill="url(#gold-stroke)" stroke="#7c2d12" stroke-width="3"/>
      <!-- 宽阔双翼 (黑羽赤边) -->
      <path d="M-30 0 C-120 -70 -160 -10 -110 30 C-80 30 -50 20 -30 10" fill="#0f172a" stroke="url(#cinnabar)" stroke-width="3"/>
      <path d="M30 0 C120 -70 160 -10 110 30 C80 30 50 20 30 10" fill="#0f172a" stroke="url(#cinnabar)" stroke-width="3"/>
      <!-- 虎首与咆哮利齿 -->
      <circle cx="0" cy="-20" r="30" fill="url(#gold-stroke)" stroke="#7c2d12" stroke-width="2"/>
      <polygon points="-25,-40 -15,-20 -28,-15" fill="#7c2d12"/>
      <polygon points="25,-40 15,-20 28,-15" fill="#7c2d12"/>
      <!-- 赤红凶眸 -->
      <circle cx="-10" cy="-22" r="4" fill="#ef4444" filter="url(#aura-glow)"/>
      <circle cx="10" cy="-22" r="4" fill="#ef4444" filter="url(#aura-glow)"/>
      <path d="M-15 -8 Q0 5 15 -8" stroke="#000" stroke-width="3" fill="none"/>
    `
  },
  {
    id: 'taowu',
    title: '梼杌',
    pinyin: 'táo wù',
    subtitle: '大荒凶神 · 顽固难驯',
    book: '西山经 · 乐游山',
    aura: '#b45309',
    art: `
      <!-- 虎身犬毛与丈八巨尾 -->
      <path d="M40 30 C120 60 180 -40 160 -100 C140 -140 100 -120 120 -80" stroke="url(#gold-stroke)" stroke-width="12" stroke-linecap="round" fill="none"/>
      <ellipse cx="-10" cy="20" rx="65" ry="40" fill="#451a03" stroke="url(#gold-stroke)" stroke-width="3"/>
      <!-- 人面首级与野猪獠牙 -->
      <circle cx="-50" cy="-20" r="32" fill="#d97706" stroke="#451a03" stroke-width="3"/>
      <polygon points="-75,-15 -60,-10 -65,-5" fill="#ffffff"/>
      <polygon points="-25,-15 -40,-10 -35,-5" fill="#ffffff"/>
      <!-- 暴烈双瞳 -->
      <circle cx="-60" cy="-25" r="4" fill="#fef08a"/>
      <circle cx="-40" cy="-25" r="4" fill="#fef08a"/>
    `
  },
  {
    id: 'luwu',
    title: '陆吾',
    pinyin: 'lù wú',
    subtitle: '昆仑天神 · 司天九部',
    book: '西山经 · 昆仑之丘',
    aura: '#38bdf8',
    art: `
      <!-- 九尾如扇形孔雀般盛开 (昆仑神威) -->
      <g stroke="url(#azure-grad)" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.9">
        <path d="M20 20 Q120 80 160 -40"/>
        <path d="M20 20 Q100 50 140 -80"/>
        <path d="M20 20 Q80 20 110 -110"/>
        <path d="M20 20 Q50 -10 70 -130"/>
        <path d="M20 20 Q20 -30 20 -140"/>
        <path d="M20 20 Q-10 -30 -30 -135"/>
        <path d="M20 20 Q-40 -20 -70 -120"/>
        <path d="M20 20 Q-70 0 -100 -90"/>
        <path d="M20 20 Q-90 30 -120 -50"/>
      </g>
      <!-- 虎身与虎爪 -->
      <ellipse cx="0" cy="30" rx="55" ry="32" fill="url(#gold-stroke)" stroke="#0369a1" stroke-width="2.5"/>
      <!-- 庄严人面 -->
      <circle cx="-40" cy="-10" r="28" fill="#fef08a" stroke="#0284c7" stroke-width="2"/>
      <circle cx="-48" cy="-14" r="3.5" fill="#0369a1"/>
      <circle cx="-32" cy="-14" r="3.5" fill="#0369a1"/>
      <!-- 额间昆仑神印 -->
      <polygon points="-40,-26 -44,-20 -40,-16 -36,-20" fill="#0284c7"/>
    `
  },
  {
    id: 'kaimingshou',
    title: '开明兽',
    pinyin: 'kāi míng shòu',
    subtitle: '九门守护 · 九首并立',
    book: '海内西经 · 昆仑虚',
    aura: '#6366f1',
    art: `
      <!-- 大白虎身 -->
      <ellipse cx="0" cy="50" rx="70" ry="38" fill="#f8fafc" stroke="url(#gold-stroke)" stroke-width="3"/>
      <!-- 环绕排列之九颗威严人首 (九首皆人面，东向立于昆仑) -->
      <g fill="#fef08a" stroke="#4338ca" stroke-width="1.8">
        <circle cx="-60" cy="-20" r="16"/>
        <circle cx="-45" cy="-50" r="16"/>
        <circle cx="-20" cy="-70" r="16"/>
        <circle cx="0" cy="-80" r="18"/>
        <circle cx="20" cy="-70" r="16"/>
        <circle cx="45" cy="-50" r="16"/>
        <circle cx="60" cy="-20" r="16"/>
        <circle cx="-25" cy="-15" r="17"/>
        <circle cx="25" cy="-15" r="17"/>
      </g>
      <!-- 神目如星 -->
      <circle cx="0" cy="-80" r="3" fill="#4338ca"/>
    `
  },
  {
    id: 'baize',
    title: '白泽',
    pinyin: 'bái zé',
    subtitle: '通晓万物 · 辟邪瑞兽',
    book: '海内东经 · 东海',
    aura: '#10b981',
    art: `
      <!-- 纯白神圣鹿身与金蹄 -->
      <ellipse cx="0" cy="20" rx="55" ry="32" fill="#ffffff" stroke="url(#jade-grad)" stroke-width="2.5"/>
      <line x1="-30" y1="40" x2="-35" y2="85" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      <line x1="30" y1="40" x2="35" y2="85" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      <!-- 独角神首与拂云双角 -->
      <circle cx="-35" cy="-20" r="26" fill="#ffffff" stroke="url(#jade-grad)" stroke-width="2"/>
      <path d="M-35 -45 Q-30 -85 -15 -95" stroke="url(#gold-stroke)" stroke-width="5" stroke-linecap="round" fill="none"/>
      <!-- 额心通晓万物之神目 -->
      <circle cx="-35" cy="-28" r="4" fill="#10b981" filter="url(#aura-glow)"/>
      <circle cx="-42" cy="-18" r="3" fill="#047857"/>
      <circle cx="-28" cy="-18" r="3" fill="#047857"/>
      <!-- 飘逸仙云绸带 -->
      <path d="M-60 10 Q0 -30 60 10 T140 20" stroke="url(#jade-grad)" stroke-width="3" fill="none" opacity="0.7"/>
    `
  },
  {
    id: 'jingwei',
    title: '精卫',
    pinyin: 'jīng wèi',
    subtitle: '衔木填海 · 矢志不渝',
    book: '北山经 · 发鸠之山',
    aura: '#38bdf8',
    art: `
      <!-- 碧波狂澜 (东海巨浪) -->
      <path d="M-180 120 Q-90 40 0 100 T180 80" stroke="url(#azure-grad)" stroke-width="12" fill="none" opacity="0.6"/>
      <!-- 绚丽文首精卫神鸟 (花纹首、白喙、赤足) -->
      <ellipse cx="0" cy="-20" rx="35" ry="24" fill="url(#cinnabar)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <!-- 振翅俯冲双翼 -->
      <path d="M-10 -30 Q-60 -90 -80 -40 Q-40 -20 -10 -15" fill="url(#azure-grad)" stroke="#fff" stroke-width="1.5"/>
      <path d="M10 -30 Q60 -90 80 -40 Q40 -20 10 -15" fill="url(#azure-grad)" stroke="#fff" stroke-width="1.5"/>
      <!-- 白喙衔西山微木 -->
      <polygon points="30,-22 55,-18 32,-12" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
      <line x1="45" y1="-30" x2="60" y2="0" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <!-- 赤足 -->
      <line x1="-10" y1="2" x2="-15" y2="25" stroke="#ef4444" stroke-width="3"/>
      <line x1="5" y1="2" x2="10" y2="25" stroke="#ef4444" stroke-width="3"/>
    `
  },
  {
    id: 'bifang',
    title: '毕方',
    pinyin: 'bì fāng',
    subtitle: '独足神鹤 · 兆示天火',
    book: '西山经 · 章莪之山',
    aura: '#06b6d4',
    art: `
      <!-- 青色羽翼与赤红焰纹 -->
      <ellipse cx="0" cy="-20" rx="32" ry="48" fill="url(#azure-grad)" stroke="url(#cinnabar)" stroke-width="2.5"/>
      <!-- 优雅鹤首与白喙 -->
      <path d="M0 -60 Q-10 -100 -5 -120" stroke="url(#azure-grad)" stroke-width="10" stroke-linecap="round" fill="none"/>
      <circle cx="-5" cy="-120" r="14" fill="url(#azure-grad)"/>
      <polygon points="-18,-122 -38,-118 -18,-114" fill="#ffffff"/>
      <!-- 独足独立 (一足直立如铁) -->
      <line x1="0" y1="25" x2="0" y2="120" stroke="url(#gold-stroke)" stroke-width="7" stroke-linecap="round"/>
      <polygon points="0,120 -15,135 15,135" fill="url(#gold-stroke)"/>
      <!-- 口吐神火与赤焰缭绕 -->
      <circle cx="-42" cy="-118" r="8" fill="#ef4444" filter="url(#aura-glow)"/>
    `
  },
  {
    id: 'huashe',
    title: '化蛇',
    pinyin: 'huà shé',
    subtitle: '人面飞蛇 · 水患异兆',
    book: '中山经 · 阳山',
    aura: '#0284c7',
    art: `
      <!-- 盘旋蛇身 -->
      <path d="M-100 80 C-40 140 60 140 100 80 C140 20 80 -40 20 -20 C-40 0 -20 60 20 50" stroke="url(#azure-grad)" stroke-width="18" stroke-linecap="round" fill="none"/>
      <!-- 鸟翼双展 -->
      <path d="M-10 -20 Q-70 -70 -90 -20 Z" fill="#93c5fd" opacity="0.8"/>
      <path d="M30 -20 Q90 -70 110 -20 Z" fill="#93c5fd" opacity="0.8"/>
      <!-- 人面首级 -->
      <circle cx="20" cy="-35" r="22" fill="#fef08a" stroke="#0369a1" stroke-width="2"/>
      <circle cx="14" cy="-38" r="2.5" fill="#0369a1"/>
      <circle cx="26" cy="-38" r="2.5" fill="#0369a1"/>
    `
  },
  {
    id: 'yong',
    title: '颙',
    pinyin: 'yóng',
    subtitle: '四目神鸮 · 大旱之兆',
    book: '南山经 · 令丘之山',
    aura: '#ea580c',
    art: `
      <!-- 猫头鹰猛禽身形 -->
      <ellipse cx="0" cy="10" rx="42" ry="52" fill="#78350f" stroke="url(#gold-stroke)" stroke-width="2.5"/>
      <!-- 人面四目 (四只金睛闪烁旱阳天火) -->
      <circle cx="0" cy="-35" r="32" fill="#fef08a" stroke="#c2410c" stroke-width="2.5"/>
      <circle cx="-14" cy="-42" r="5" fill="#ea580c" filter="url(#aura-glow)"/>
      <circle cx="14" cy="-42" r="5" fill="#ea580c" filter="url(#aura-glow)"/>
      <circle cx="-14" cy="-28" r="5" fill="#ea580c" filter="url(#aura-glow)"/>
      <circle cx="14" cy="-28" r="5" fill="#ea580c" filter="url(#aura-glow)"/>
      <polygon points="0,-25 -6,-15 6,-15" fill="#78350f"/>
    `
  },
  {
    id: 'bo',
    title: '驳',
    pinyin: 'bó',
    subtitle: '中曲战马 · 独角食虎',
    book: '西山经 · 中曲之山',
    aura: '#94a3b8',
    art: `
      <!-- 白马身黑尾与虎爪 -->
      <ellipse cx="0" cy="10" rx="60" ry="34" fill="#ffffff" stroke="#475569" stroke-width="3"/>
      <!-- 锯齿单角 (角如锯，能食虎豹) -->
      <path d="M-45 -20 L-65 -75" stroke="url(#gold-stroke)" stroke-width="7" stroke-linecap="round"/>
      <circle cx="-45" cy="-20" r="24" fill="#ffffff" stroke="#475569" stroke-width="2"/>
      <path d="M45 15 Q95 50 110 90" stroke="#0f172a" stroke-width="12" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'gudiao',
    title: '蛊雕',
    pinyin: 'gǔ diāo',
    subtitle: '鹿吴巨鸟 · 独角如雕',
    book: '南山经 · 鹿吴之山',
    aura: '#854d0e',
    art: `
      <!-- 雕身斑纹与尖锐独角 -->
      <ellipse cx="0" cy="0" rx="50" ry="35" fill="url(#gold-stroke)" stroke="#713f12" stroke-width="3"/>
      <circle cx="-35" cy="-30" r="25" fill="#ca8a04" stroke="#713f12" stroke-width="2"/>
      <polygon points="-50,-35 -75,-25 -50,-20" fill="#713f12"/>
      <path d="M-35 -50 Q-30 -85 -20 -90" stroke="url(#cinnabar)" stroke-width="6" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'luoyu',
    title: '蠃鱼',
    pinyin: 'luǒ yú',
    subtitle: '邽水飞鱼 · 鸟翼翔渊',
    book: '西山经 · 邽山',
    aura: '#38bdf8',
    art: `
      <!-- 锦鲤之身与展开的飞鸟双翼 -->
      <ellipse cx="0" cy="0" rx="55" ry="24" fill="url(#cinnabar)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <path d="M-10 -15 Q-50 -70 -75 -20 Z" fill="url(#azure-grad)" opacity="0.85"/>
      <path d="M10 -15 Q50 -70 75 -20 Z" fill="url(#azure-grad)" opacity="0.85"/>
      <polygon points="50,0 85,-15 85,15" fill="url(#cinnabar)"/>
      <circle cx="-40" cy="-4" r="3.5" fill="#fef08a"/>
    `
  },
  {
    id: 'mingshe',
    title: '鸣蛇',
    pinyin: 'míng shé',
    subtitle: '鲜山飞虺 · 四翼腾沙',
    book: '中山经 · 鲜山',
    aura: '#10b981',
    art: `
      <!-- 青碧长蛇身躯 -->
      <path d="M-120 40 Q-60 80 0 20 T120 40" stroke="url(#jade-grad)" stroke-width="14" stroke-linecap="round" fill="none"/>
      <!-- 四扇飞翼 -->
      <path d="M-30 0 Q-60 -45 -80 -10 Z" fill="#6ee7b7" opacity="0.85"/>
      <path d="M30 0 Q60 -45 80 -10 Z" fill="#6ee7b7" opacity="0.85"/>
      <path d="M-20 15 Q-40 45 -60 30 Z" fill="#34d399" opacity="0.75"/>
      <path d="M20 15 Q40 45 60 30 Z" fill="#34d399" opacity="0.75"/>
    `
  },
  {
    id: 'jiao',
    title: '狡',
    pinyin: 'jiǎo',
    subtitle: '玉山吉兽 · 豹纹牛角',
    book: '西山经 · 玉山',
    aura: '#eab308',
    art: `
      <!-- 犬身豹纹与牛角 -->
      <ellipse cx="0" cy="10" rx="50" ry="30" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
      <circle cx="-35" cy="-15" r="22" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
      <!-- 双牛角 (状如牛角，音如犬吠，见则其国大穰) -->
      <path d="M-45 -30 Q-65 -60 -55 -70" stroke="#78350f" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M-25 -30 Q-5 -60 -15 -70" stroke="#78350f" stroke-width="5" stroke-linecap="round" fill="none"/>
      <circle cx="-42" cy="-16" r="3" fill="#000"/>
    `
  },
  {
    id: 'feifei',
    title: '朏朏',
    pinyin: 'fěi fěi',
    subtitle: '霍山萌兽 · 养之忘忧',
    book: '中山经 · 霍山',
    aura: '#f472b6',
    art: `
      <!-- 白毛狸猫身形与蓬松白尾 -->
      <ellipse cx="0" cy="15" rx="42" ry="32" fill="#ffffff" stroke="#f472b6" stroke-width="2.5"/>
      <circle cx="-25" cy="-15" r="24" fill="#ffffff" stroke="#f472b6" stroke-width="2"/>
      <polygon points="-38,-35 -30,-20 -40,-15" fill="#f472b6"/>
      <polygon points="-12,-35 -20,-20 -10,-15" fill="#f472b6"/>
      <!-- 蓬松硕大之白羽长尾 (如云团般卷曲) -->
      <path d="M25 15 C80 30 110 -30 80 -60 C55 -85 20 -50 40 -20" fill="#ffffff" stroke="url(#gold-stroke)" stroke-width="3"/>
      <!-- 萌润双眸与忘忧粉润光环 -->
      <circle cx="-32" cy="-16" r="4" fill="#ec4899"/>
      <circle cx="-18" cy="-16" r="4" fill="#ec4899"/>
    `
  },
  {
    id: 'shengyu',
    title: '胜遇',
    pinyin: 'shèng yù',
    subtitle: '玉山赤翟 · 飞鸣召水',
    book: '西山经 · 玉山',
    aura: '#ef4444',
    art: `
      <!-- 赤红长尾野鸡身姿 -->
      <ellipse cx="0" cy="0" rx="40" ry="25" fill="url(#cinnabar)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <circle cx="-30" cy="-25" r="18" fill="url(#cinnabar)"/>
      <path d="M30 0 Q80 30 120 70" stroke="url(#gold-stroke)" stroke-width="6" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'zhujian',
    title: '诸犍',
    pinyin: 'zhū jiān',
    subtitle: '单耳衔尾 · 豹身人面',
    book: '北山经 · 单狐之山',
    aura: '#d97706',
    art: `
      <!-- 豹身人面，长尾衔于口中 -->
      <ellipse cx="0" cy="20" rx="55" ry="30" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2.5"/>
      <circle cx="-38" cy="-15" r="26" fill="#fef08a" stroke="#78350f" stroke-width="2"/>
      <circle cx="-38" cy="-18" r="4.5" fill="#78350f"/>
      <path d="M40 20 C100 40 120 -40 40 -50 C-10 -60 -35 -20 -35 -5" stroke="url(#gold-stroke)" stroke-width="7" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'chiru',
    title: '赤鱬',
    pinyin: 'chì rú',
    subtitle: '青丘人鱼 · 食之不疥',
    book: '南山经 · 青丘之山',
    aura: '#fb7185',
    art: `
      <!-- 赤红鱼身与人面首级 -->
      <ellipse cx="0" cy="0" rx="55" ry="28" fill="url(#cinnabar)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <polygon points="50,0 85,-20 85,20" fill="url(#cinnabar)"/>
      <circle cx="-35" cy="-2" r="20" fill="#fef08a" stroke="#e11d48" stroke-width="2"/>
      <circle cx="-42" cy="-4" r="2.5" fill="#881337"/>
      <circle cx="-28" cy="-4" r="2.5" fill="#881337"/>
    `
  },
  {
    id: 'boyi',
    title: '猼訑',
    pinyin: 'bó yí',
    subtitle: '四耳背目 · 佩之不恐',
    book: '南山经 · 基山',
    aura: '#a855f7',
    art: `
      <!-- 羊身九尾与四耳 -->
      <ellipse cx="0" cy="15" rx="52" ry="32" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2.5"/>
      <circle cx="-38" cy="-15" r="22" fill="#f3e8ff" stroke="#7e22ce" stroke-width="2"/>
      <!-- 四只耸立羊耳 -->
      <polygon points="-48,-35 -40,-20 -50,-15" fill="#a855f7"/>
      <polygon points="-28,-35 -36,-20 -26,-15" fill="#a855f7"/>
      <polygon points="-42,-45 -34,-28 -44,-22" fill="#7e22ce"/>
      <polygon points="-22,-45 -30,-28 -20,-22" fill="#7e22ce"/>
      <!-- 目在背上 (背上生出双目) -->
      <circle cx="-10" cy="-2" r="6" fill="#fef08a" stroke="#7e22ce" stroke-width="2" filter="url(#aura-glow)"/>
      <circle cx="10" cy="-2" r="6" fill="#fef08a" stroke="#7e22ce" stroke-width="2" filter="url(#aura-glow)"/>
    `
  },
  {
    id: 'xuangui',
    title: '旋龟',
    pinyin: 'xuán guī',
    subtitle: '杻阳灵龟 · 鸟首虺尾',
    book: '南山经 · 杻阳之山',
    aura: '#059669',
    art: `
      <!-- 墨玉龟甲、鸟首与蛇尾 -->
      <ellipse cx="0" cy="10" rx="55" ry="38" fill="#064e3b" stroke="url(#gold-stroke)" stroke-width="3"/>
      <!-- 鹰鸟首级 -->
      <circle cx="-50" cy="-10" r="18" fill="#10b981" stroke="url(#gold-stroke)" stroke-width="2"/>
      <polygon points="-65,-12 -80,-8 -65,-4" fill="url(#gold-stroke)"/>
      <!-- 虺蛇之尾 (长尾如灵蛇盘曲) -->
      <path d="M45 15 C85 30 110 -10 90 -40 C70 -60 50 -30 65 -10" stroke="#10b981" stroke-width="8" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'lili',
    title: '狸力',
    pinyin: 'lí lì',
    subtitle: '柜山穴兽 · 鸡足如豕',
    book: '南山经 · 柜山',
    aura: '#ca8a04',
    art: `
      <!-- 猪身鸡足 -->
      <ellipse cx="0" cy="10" rx="52" ry="32" fill="#78350f" stroke="url(#gold-stroke)" stroke-width="2.5"/>
      <polygon points="-40,-5 -55,0 -40,10" fill="#fde047"/>
      <!-- 鸡足利爪 (善于掘地穿山) -->
      <line x1="-25" y1="35" x2="-35" y2="70" stroke="#ca8a04" stroke-width="4"/>
      <line x1="25" y1="35" x2="35" y2="70" stroke="#ca8a04" stroke-width="4"/>
    `
  },
  {
    id: 'chongmingniao',
    title: '重明鸟',
    pinyin: 'chóng míng niǎo',
    subtitle: '重瞳金鸡 · 辟除百邪',
    book: '海外西经 · 辟邪志',
    aura: '#eab308',
    art: `
      <!-- 耀目金冠大雄鸡神形 -->
      <ellipse cx="0" cy="0" rx="42" ry="32" fill="url(#gold-stroke)" stroke="#b45309" stroke-width="2.5"/>
      <circle cx="-32" cy="-25" r="20" fill="url(#gold-stroke)"/>
      <path d="M-32 -45 Q-28 -65 -22 -60" stroke="#ef4444" stroke-width="5" stroke-linecap="round" fill="none"/>
      <!-- 双目重瞳 (一目二眸，神光万丈) -->
      <circle cx="-38" cy="-26" r="3.5" fill="#ef4444" filter="url(#aura-glow)"/>
      <circle cx="-30" cy="-26" r="3.5" fill="#ef4444" filter="url(#aura-glow)"/>
    `
  },
  {
    id: 'jiufeng',
    title: '九凤',
    pinyin: 'jiǔ fèng',
    subtitle: '大荒神鸟 · 九首天凤',
    book: '大荒北经 · 北极天柜',
    aura: '#dc2626',
    art: `
      <!-- 华美赤金凤身与凤尾翎羽 -->
      <ellipse cx="0" cy="30" rx="45" ry="28" fill="url(#cinnabar)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <path d="M30 30 Q100 80 140 140 M40 30 Q120 60 160 110 M35 30 Q80 100 110 160" stroke="url(#gold-stroke)" stroke-width="4" fill="none"/>
      <!-- 九颗高耸人面凤首 (并列于长颈之上) -->
      <g fill="#fef08a" stroke="#b91c1c" stroke-width="1.5">
        <circle cx="-50" cy="-30" r="11"/>
        <circle cx="-35" cy="-55" r="11"/>
        <circle cx="-15" cy="-70" r="11"/>
        <circle cx="0" cy="-80" r="12"/>
        <circle cx="15" cy="-70" r="11"/>
        <circle cx="35" cy="-55" r="11"/>
        <circle cx="50" cy="-30" r="11"/>
        <circle cx="-20" cy="-25" r="12"/>
        <circle cx="20" cy="-25" r="12"/>
      </g>
    `
  },
  {
    id: 'dangkang',
    title: '当康',
    pinyin: 'dāng kāng',
    subtitle: '钦山瑞兽 · 丰稔欢歌',
    book: '东山经 · 钦山',
    aura: '#eab308',
    art: `
      <!-- 四獠牙金猪身姿 -->
      <ellipse cx="0" cy="15" rx="55" ry="34" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2.5"/>
      <circle cx="-40" cy="-5" r="26" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
      <!-- 四根向上翘起之长獠牙 (其鸣自叫，见则天下大穰) -->
      <path d="M-60 5 Q-75 -15 -68 -25" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M-52 8 Q-65 -10 -58 -20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M-30 5 Q-15 -15 -22 -25" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M-38 8 Q-25 -10 -32 -20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'bashe',
    title: '巴蛇',
    pinyin: 'bā shé',
    subtitle: '洞庭巨蟒 · 吞象成骨',
    book: '海内南经 · 洞庭之山',
    aura: '#0284c7',
    art: `
      <!-- 黑身青首巨蟒 -->
      <path d="M-150 60 C-80 160 80 160 140 40 C180 -60 60 -100 -20 -60 C-80 -20 -40 60 40 40" stroke="#0f172a" stroke-width="24" stroke-linecap="round" fill="none"/>
      <!-- 青色蛇首与血盆巨口 -->
      <circle cx="40" cy="40" r="28" fill="url(#azure-grad)" stroke="#0369a1" stroke-width="2"/>
      <circle cx="34" cy="32" r="3.5" fill="#fef08a"/>
      <path d="M48 45 L70 50 M48 45 L70 40" stroke="#ef4444" stroke-width="3"/>
    `
  },
  {
    id: 'yinglong',
    title: '应龙',
    pinyin: 'yìng lóng',
    subtitle: '双翼神龙 · 助禹平水',
    book: '大荒东经 · 凶犁土丘',
    aura: '#3b82f6',
    art: `
      <!-- 金龙身躯与雷云双翼 -->
      <path d="M-120 40 C-60 100 40 100 100 20 C140 -40 80 -80 0 -60 C-60 -40 -20 20 40 10" stroke="url(#gold-stroke)" stroke-width="18" stroke-linecap="round" fill="none"/>
      <!-- 雄壮龙翼 (生双翼，能兴云致雨) -->
      <path d="M-20 -40 Q-100 -120 -130 -50 Q-80 -30 -30 -30" fill="url(#azure-grad)" opacity="0.85"/>
      <path d="M20 -40 Q100 -120 130 -50 Q80 -30 30 -30" fill="url(#azure-grad)" opacity="0.85"/>
      <circle cx="40" cy="10" r="24" fill="url(#gold-stroke)"/>
      <circle cx="46" cy="6" r="3.5" fill="#ef4444"/>
    `
  },
  {
    id: 'nuba',
    title: '女魃',
    pinyin: 'nǚ bá',
    subtitle: '旱天神女 · 止雨破兵',
    book: '大荒北经 · 系昆之山',
    aura: '#f97316',
    art: `
      <!-- 青衣神女与周身炽阳热浪 -->
      <path d="M0 -60 L-30 60 L30 60 Z" fill="url(#azure-grad)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <circle cx="0" cy="-80" r="18" fill="#fef08a" stroke="#ea580c" stroke-width="2"/>
      <!-- 炽烈旱阳灵光轮 -->
      <circle cx="0" cy="-80" r="35" stroke="#f97316" stroke-width="2" stroke-dasharray="4 4" fill="none" filter="url(#aura-glow)"/>
    `
  },
  {
    id: 'lushou',
    title: '鹿蜀',
    pinyin: 'lù shǔ',
    subtitle: '杻阳文马 · 虎纹白首',
    book: '南山经 · 杻阳之山',
    aura: '#f59e0b',
    art: `
      <!-- 虎纹马身、白首与赤尾 -->
      <ellipse cx="0" cy="15" rx="55" ry="32" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2.5"/>
      <circle cx="-40" cy="-15" r="24" fill="#ffffff" stroke="#78350f" stroke-width="2"/>
      <path d="M45 15 Q85 40 100 75" stroke="#ef4444" stroke-width="8" stroke-linecap="round" fill="none"/>
    `
  },
  {
    id: 'tiangou',
    title: '天狗',
    pinyin: 'tiān gǒu',
    subtitle: '阴山神兽 · 白首御凶',
    book: '西山经 · 阴山',
    aura: '#64748b',
    art: `
      <!-- 黑身白首神犬 -->
      <ellipse cx="0" cy="15" rx="48" ry="28" fill="#0f172a" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="-35" cy="-15" r="22" fill="#ffffff" stroke="#0f172a" stroke-width="2"/>
      <circle cx="-42" cy="-16" r="3" fill="#0f172a"/>
      <circle cx="-28" cy="-16" r="3" fill="#0f172a"/>
    `
  },
  {
    id: 'ranyiyu',
    title: '冉遗鱼',
    pinyin: 'rǎn yí yú',
    subtitle: '英鞮灵鱼 · 六足蛇首',
    book: '西山经 · 英鞮之山',
    aura: '#0284c7',
    art: `
      <!-- 鱼身蛇首六足马尾 (使人不寐，可御凶灾) -->
      <ellipse cx="0" cy="0" rx="50" ry="24" fill="url(#azure-grad)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <circle cx="-40" cy="-5" r="16" fill="#10b981" stroke="url(#gold-stroke)" stroke-width="1.5"/>
      <g stroke="url(#gold-stroke)" stroke-width="4" stroke-linecap="round">
        <line x1="-20" y1="20" x2="-25" y2="45"/>
        <line x1="0" y1="20" x2="0" y2="48"/>
        <line x1="20" y1="20" x2="25" y2="45"/>
      </g>
    `
  },
  {
    id: 'lu',
    title: '鯥',
    pinyin: 'lù',
    subtitle: '柢山牛鱼 · 蛇尾翼翔',
    book: '南山经 · 柢山',
    aura: '#10b981',
    art: `
      <!-- 鱼身牛首蛇尾 -->
      <ellipse cx="0" cy="0" rx="50" ry="26" fill="url(#jade-grad)" stroke="url(#gold-stroke)" stroke-width="2"/>
      <circle cx="-38" cy="-10" r="20" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
      <path d="M-45 -22 L-55 -38 M-30 -22 L-20 -38" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <path d="M40 5 Q80 25 100 55" stroke="#10b981" stroke-width="7" stroke-linecap="round" fill="none"/>
    `
  }
]

// 8 大创世史诗神话
const myths = [
  {
    id: 'nuwa',
    title: '女娲补天造人',
    pinyin: 'nǚ wā bǔ tiān',
    subtitle: '炼石补天 · 抟土造人',
    book: '大荒西经 · 女娲之肠',
    aura: '#f43f5e',
    art: `
      <!-- 人首蛇身女娲神像 -->
      <path d="M-80 120 C-30 180 30 180 80 120 C110 80 70 30 20 50 C-30 70 -10 110 30 90" stroke="url(#cinnabar)" stroke-width="22" stroke-linecap="round" fill="none"/>
      <!-- 神圣人首与五色神石 -->
      <circle cx="0" cy="-40" r="28" fill="#fef08a" stroke="#e11d48" stroke-width="2"/>
      <circle cx="-60" cy="-90" r="14" fill="#38bdf8" filter="url(#aura-glow)"/>
      <circle cx="-30" cy="-115" r="14" fill="#ef4444" filter="url(#aura-glow)"/>
      <circle cx="0" cy="-125" r="14" fill="#fef08a" filter="url(#aura-glow)"/>
      <circle cx="30" cy="-115" r="14" fill="#ffffff" filter="url(#aura-glow)"/>
      <circle cx="60" cy="-90" r="14" fill="#0f172a" stroke="#fff" filter="url(#aura-glow)"/>
    `
  },
  {
    id: 'kuafu',
    title: '夸父逐日',
    pinyin: 'kuā fù zhú rì',
    subtitle: '与日逐走 · 弃杖成林',
    book: '海外北经 · 夸父山',
    aura: '#f59e0b',
    art: `
      <!-- 金阳高照 -->
      <circle cx="120" cy="-80" r="45" fill="#fef08a" stroke="#ef4444" stroke-width="4" filter="url(#aura-glow)"/>
      <!-- 奔跑巨人夸父与桃木杖 -->
      <path d="M-80 -20 L-40 40 L0 120 M-40 40 L-90 110" stroke="url(#gold-stroke)" stroke-width="14" stroke-linecap="round" fill="none"/>
      <line x1="-110" y1="-80" x2="-20" y2="80" stroke="#78350f" stroke-width="8" stroke-linecap="round"/>
      <circle cx="-80" cy="-50" r="24" fill="#fef08a" stroke="#78350f" stroke-width="2"/>
    `
  },
  {
    id: 'jingwei_myth',
    title: '精卫填海',
    pinyin: 'jīng wèi tián hǎi',
    subtitle: '帝女化鸟 · 誓平巨浪',
    book: '北山经 · 发鸠之山',
    aura: '#0284c7',
    art: `
      <!-- 滔天东海浪涛 -->
      <path d="M-180 80 Q-90 0 0 70 T180 50" stroke="url(#azure-grad)" stroke-width="18" fill="none"/>
      <!-- 精卫神鸟俯冲 -->
      <ellipse cx="0" cy="-40" rx="40" ry="25" fill="url(#cinnabar)" stroke="#fff" stroke-width="2"/>
      <path d="M-10 -55 Q-70 -110 -90 -60 Z" fill="url(#azure-grad)"/>
      <path d="M10 -55 Q70 -110 90 -60 Z" fill="url(#azure-grad)"/>
      <line x1="30" y1="-45" x2="50" y2="-20" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
    `
  },
  {
    id: 'xingtian',
    title: '刑天舞干戚',
    pinyin: 'xíng tiān wǔ gān qī',
    subtitle: '断首不屈 · 猛志常在',
    book: '海外西经 · 刑天与帝争神',
    aura: '#dc2626',
    art: `
      <!-- 无首战神强健躯干 (双乳为目，肚脐为口) -->
      <path d="M-60 40 L-40 -40 L40 -40 L60 40 Z" fill="#b91c1c" stroke="url(#gold-stroke)" stroke-width="3"/>
      <!-- 以乳为目 -->
      <circle cx="-25" cy="-15" r="7" fill="#fef08a" stroke="#fff" stroke-width="2" filter="url(#aura-glow)"/>
      <circle cx="25" cy="-15" r="7" fill="#fef08a" stroke="#fff" stroke-width="2" filter="url(#aura-glow)"/>
      <!-- 以脐为口 -->
      <ellipse cx="0" cy="20" rx="14" ry="7" fill="#0f172a" stroke="#fef08a" stroke-width="2"/>
      <!-- 挥舞干 (巨盾) 与戚 (战斧) -->
      <rect x="-140" y="-80" width="60" height="90" rx="8" fill="#1e293b" stroke="url(#gold-stroke)" stroke-width="3"/>
      <path d="M100 -70 L140 -90 L130 -30 Z" fill="url(#gold-stroke)" stroke="#b91c1c" stroke-width="2"/>
      <line x1="60" y1="-20" x2="110" y2="-60" stroke="#78350f" stroke-width="7"/>
    `
  },
  {
    id: 'chiyou',
    title: '涿鹿之战',
    pinyin: 'zhuō lù zhī zhàn',
    subtitle: '铜头铁额 · 兵戈鏖战',
    book: '大荒北经 · 涿鹿之野',
    aura: '#7c3aed',
    art: `
      <!-- 战神蚩尤铜头铁额与六臂兵戈 -->
      <circle cx="0" cy="-30" r="32" fill="#334155" stroke="url(#gold-stroke)" stroke-width="3"/>
      <path d="M-30 -55 Q0 -85 30 -55" stroke="url(#gold-stroke)" stroke-width="6" fill="none"/>
      <!-- 兵戈交错 -->
      <line x1="-100" y1="-80" x2="100" y2="80" stroke="#e11d48" stroke-width="4"/>
      <line x1="100" y1="-80" x2="-100" y2="80" stroke="#38bdf8" stroke-width="4"/>
    `
  },
  {
    id: 'gonggong',
    title: '共工怒触不周山',
    pinyin: 'gòng gōng chù bù zhōu shān',
    subtitle: '天柱折裂 · 地维绝断',
    book: '大荒西经 · 不周之山',
    aura: '#0284c7',
    art: `
      <!-- 不周天柱折裂 -->
      <polygon points="-40,-120 40,-120 60,120 -60,120" fill="#1e293b" stroke="url(#azure-grad)" stroke-width="3"/>
      <path d="M-30 -20 L30 10 L-20 40 L20 70" stroke="#ef4444" stroke-width="5" fill="none" filter="url(#aura-glow)"/>
      <!-- 水神共工赤发巨力 -->
      <circle cx="-70" cy="-10" r="28" fill="#0369a1" stroke="#ef4444" stroke-width="3"/>
    `
  },
  {
    id: 'sunmoon',
    title: '羲和常羲日月神话',
    pinyin: 'xī hé cháng xī',
    subtitle: '生十日浴月 · 掌天地历法',
    book: '大荒南经 / 大荒西经',
    aura: '#eab308',
    art: `
      <!-- 羲和金乌赤阳与常羲玉兔明月 -->
      <circle cx="-60" cy="-20" r="45" fill="#fef08a" stroke="#ea580c" stroke-width="3" filter="url(#aura-glow)"/>
      <circle cx="60" cy="-20" r="45" fill="#e0f2fe" stroke="#38bdf8" stroke-width="3" filter="url(#aura-glow)"/>
      <path d="M-100 80 Q0 30 100 80" stroke="url(#gold-stroke)" stroke-width="4" fill="none"/>
    `
  },
  {
    id: 'yuzhishui',
    title: '鲧禹治水',
    pinyin: 'gǔn yǔ zhì shuǐ',
    subtitle: '息壤障洪 · 疏川导滞',
    book: '海内经 · 鲧窃帝之息壤',
    aura: '#10b981',
    art: `
      <!-- 疏导九河九州万水归东海 -->
      <path d="M-120 -80 Q-40 20 0 0 T120 80 M-140 -40 Q-20 40 40 40 T140 120" stroke="url(#azure-grad)" stroke-width="10" fill="none"/>
      <!-- 大禹治水神木耒耜与神龟应龙 -->
      <rect x="-15" y="-60" width="30" height="90" fill="url(#gold-stroke)" stroke="#78350f" stroke-width="2"/>
    `
  }
]

console.log('Generating 35 refined Gongbi beasts SVGs...')
for (const b of beasts) {
  const svg = wrapGongbi(b.title, b.pinyin, b.subtitle, b.book, b.aura, b.art)
  fs.writeFileSync(path.join(beastsDir, `${b.id}_refined.svg`), svg, 'utf8')
  console.log(`✓ Generated ${b.id}_refined.svg`)
}

console.log('Generating 8 refined Gongbi myths SVGs...')
for (const m of myths) {
  const svg = wrapGongbi(m.title, m.pinyin, m.subtitle, m.book, m.aura, m.art)
  fs.writeFileSync(path.join(mythsDir, `${m.id}_refined.svg`), svg, 'utf8')
  console.log(`✓ Generated ${m.id}_refined.svg`)
}

console.log('🎉 ALL ACCURATE GONGBI ARTWORKS GENERATED SUCCESSFULLY!')
