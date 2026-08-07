// 专业肌肉解剖图组件 - 带肌肉纹理和3D效果
// 参考：健身APP中的3D人体肌肉展示

export interface AnatomyProps {
  muscleGroup: string;
  subMuscle: string;
  showCorrectForm?: boolean; // 是否显示正确动作
  showIncorrectForm?: boolean; // 是否显示错误动作
}

// 肌肉颜色定义
const colors = {
  primary: '#FF3333',      // 主要发力肌群（鲜红）
  secondary: '#FF6B35',    // 辅助肌群（橙红）
  stabilizer: '#FFB347',   // 稳定肌群（浅橙）
  bodyBase: '#E8E8E8',     // 身体基础色（灰白）
  bodyShadow: '#C0C0C0',   // 身体阴影
  muscleHighlight: '#FF4444', // 肌肉高光
  correct: '#00FF88',      // 正确动作标记（绿色）
  incorrect: '#FF3333',    // 错误动作标记（红色）
};

// 3D仿人体胸部肌肉解剖图 - 专业级
export function ChestAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 500 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* 皮肤渐变 - 3D立体感 */}
        <radialGradient id="skinGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#F5D0B0" />
          <stop offset="50%" stopColor="#E8B896" />
          <stop offset="100%" stopColor="#D4A07A" />
        </radialGradient>
        
        {/* 肌肉纤维纹理 */}
        <pattern id="muscleFiber" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(15)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#CC2222" strokeWidth="0.5" opacity="0.3" />
        </pattern>
        
        {/* 胸大肌上束渐变 */}
        <radialGradient id="upperChestGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF4444" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#FF2222" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#CC1111" stopOpacity="0.6" />
        </radialGradient>
        
        {/* 胸大肌中束渐变 */}
        <radialGradient id="midChestGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#FF3333" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#FF1111" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#BB0000" stopOpacity="0.6" />
        </radialGradient>
        
        {/* 胸大肌下束渐变 */}
        <radialGradient id="lowerChestGrad" cx="50%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#FF5555" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#FF3333" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#DD2222" stopOpacity="0.6" />
        </radialGradient>
        
        {/* 整体胸部渐变 */}
        <radialGradient id="fullChestGrad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FF4444" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF2222" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#CC0000" stopOpacity="0.5" />
        </radialGradient>
        
        {/* 三角肌渐变 */}
        <radialGradient id="deltoidGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FF8844" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF6622" stopOpacity="0.5" />
        </radialGradient>
        
        {/* 三头肌渐变 */}
        <radialGradient id="tricepGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FF9955" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FF7733" stopOpacity="0.4" />
        </radialGradient>
        
        {/* 3D阴影滤镜 */}
        <filter id="muscleShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>
        
        {/* 发光效果 */}
        <filter id="muscleGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* 内部阴影 - 肌肉立体感 */}
        <filter id="innerShadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="2" result="offset-blur"/>
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
          <feFlood floodColor="black" floodOpacity="0.2" result="color"/>
          <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
          <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>
        
        {/* 肌肉纹理 - 纤维走向 */}
        <pattern id="fiberUpper" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-20)">
          <line x1="0" y1="0" x2="6" y2="6" stroke="#990000" strokeWidth="0.4" opacity="0.4" />
        </pattern>
        <pattern id="fiberMid" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(0)">
          <line x1="0" y1="0" x2="6" y2="6" stroke="#990000" strokeWidth="0.4" opacity="0.4" />
        </pattern>
        <pattern id="fiberLower" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(20)">
          <line x1="0" y1="0" x2="6" y2="6" stroke="#990000" strokeWidth="0.4" opacity="0.4" />
        </pattern>
      </defs>
      
      {/* 深色背景 */}
      <rect width="500" height="600" fill="#0D1117" rx="12" />
      
      {/* 标题 */}
      <text x="250" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="system-ui">胸部肌肉解剖图</text>
      <text x="250" y="55" textAnchor="middle" fill="#8B949E" fontSize="12" fontFamily="system-ui">Pectoralis Major - 胸大肌</text>
      
      {/* ===== 人体躯干轮廓 ===== */}
      {/* 颈部 */}
      <path d="M 220 80 Q 220 70 230 65 L 270 65 Q 280 70 280 80 L 280 100 Q 270 105 250 105 Q 230 105 220 100 Z" 
            fill="url(#skinGradient)" stroke="#C4956A" strokeWidth="0.5" />
      
      {/* 锁骨 */}
      <path d="M 175 108 Q 210 100 250 102 Q 290 100 325 108" 
            stroke="#D4A07A" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
      
      {/* 躯干主体 */}
      <path d="M 175 108 Q 160 110 155 130 L 150 200 Q 148 280 155 350 Q 160 400 170 430 
               Q 200 445 250 448 Q 300 445 330 430 Q 340 400 345 350 Q 352 280 350 200 
               L 345 130 Q 340 110 325 108 Q 290 100 250 102 Q 210 100 175 108 Z" 
            fill="url(#skinGradient)" stroke="#C4956A" strokeWidth="0.5" />
      
      {/* 胸骨中线 */}
      <line x1="250" y1="105" x2="250" y2="380" stroke="#C4956A" strokeWidth="1" opacity="0.4" />
      
      {/* 肋骨轮廓暗示 */}
      <path d="M 180 160 Q 215 155 250 158 Q 285 155 320 160" stroke="#C4956A" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 175 190 Q 215 185 250 188 Q 285 185 325 190" stroke="#C4956A" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 170 220 Q 215 215 250 218 Q 285 215 330 220" stroke="#C4956A" strokeWidth="0.8" fill="none" opacity="0.3" />
      <path d="M 165 250 Q 215 245 250 248 Q 285 245 335 250" stroke="#C4956A" strokeWidth="0.8" fill="none" opacity="0.3" />
      
      {/* ===== 肩部/三角肌 ===== */}
      {/* 左三角肌 */}
      <path d="M 175 108 Q 155 110 140 125 Q 125 145 120 170 Q 118 190 125 200 
               Q 135 195 145 185 Q 155 170 158 150 Q 160 130 165 115 Z" 
            fill={subMuscle === '整体' ? 'url(#deltoidGrad)' : '#E8B896'} 
            stroke="#C4956A" strokeWidth="0.5" opacity={subMuscle === '整体' ? 1 : 0.5} />
      {/* 右三角肌 */}
      <path d="M 325 108 Q 345 110 360 125 Q 375 145 380 170 Q 382 190 375 200 
               Q 365 195 355 185 Q 345 170 342 150 Q 340 130 335 115 Z" 
            fill={subMuscle === '整体' ? 'url(#deltoidGrad)' : '#E8B896'} 
            stroke="#C4956A" strokeWidth="0.5" opacity={subMuscle === '整体' ? 1 : 0.5} />
      
      {/* ===== 胸大肌 - 根据subMuscle高亮不同区域 ===== */}
      
      {/* 胸大肌上束（锁骨部）- 从锁骨到骨 */}
      {(subMuscle === '上束' || subMuscle === '整体') && (
        <g filter="url(#muscleShadow)">
          {/* 左上束 */}
          <path d="M 180 112 Q 200 108 248 110 L 248 175 Q 220 170 195 165 Q 175 155 170 140 Q 168 125 180 112 Z" 
                fill={subMuscle === '上束' ? 'url(#upperChestGrad)' : 'url(#fullChestGrad)'} 
                stroke="#AA0000" strokeWidth="0.5" opacity={subMuscle === '上束' ? 1 : 0.5} />
          <path d="M 180 112 Q 200 108 248 110 L 248 175 Q 220 170 195 165 Q 175 155 170 140 Q 168 125 180 112 Z" 
                fill="url(#fiberUpper)" opacity={subMuscle === '上束' ? 0.6 : 0.2} />
          {/* 右上束 */}
          <path d="M 320 112 Q 300 108 252 110 L 252 175 Q 280 170 305 165 Q 325 155 330 140 Q 332 125 320 112 Z" 
                fill={subMuscle === '上束' ? 'url(#upperChestGrad)' : 'url(#fullChestGrad)'} 
                stroke="#AA0000" strokeWidth="0.5" opacity={subMuscle === '上束' ? 1 : 0.5} />
          <path d="M 320 112 Q 300 108 252 110 L 252 175 Q 280 170 305 165 Q 325 155 330 140 Q 332 125 320 112 Z" 
                fill="url(#fiberUpper)" opacity={subMuscle === '上束' ? 0.6 : 0.2} />
        </g>
      )}
      
      {/* 胸大肌中束（胸肋部上段） */}
      {(subMuscle === '中束' || subMuscle === '整体') && (
        <g filter="url(#muscleShadow)">
          {/* 左中束 */}
          <path d="M 172 140 Q 175 155 195 165 L 248 175 L 248 240 Q 220 238 195 232 Q 172 225 165 200 Q 160 170 172 140 Z" 
                fill={subMuscle === '中束' ? 'url(#midChestGrad)' : 'url(#fullChestGrad)'} 
                stroke="#AA0000" strokeWidth="0.5" opacity={subMuscle === '中束' ? 1 : 0.5} />
          <path d="M 172 140 Q 175 155 195 165 L 248 175 L 248 240 Q 220 238 195 232 Q 172 225 165 200 Q 160 170 172 140 Z" 
                fill="url(#fiberMid)" opacity={subMuscle === '中束' ? 0.6 : 0.2} />
          {/* 右中束 */}
          <path d="M 328 140 Q 325 155 305 165 L 252 175 L 252 240 Q 280 238 305 232 Q 328 225 335 200 Q 340 170 328 140 Z" 
                fill={subMuscle === '中束' ? 'url(#midChestGrad)' : 'url(#fullChestGrad)'} 
                stroke="#AA0000" strokeWidth="0.5" opacity={subMuscle === '中束' ? 1 : 0.5} />
          <path d="M 328 140 Q 325 155 305 165 L 252 175 L 252 240 Q 280 238 305 232 Q 328 225 335 200 Q 340 170 328 140 Z" 
                fill="url(#fiberMid)" opacity={subMuscle === '中束' ? 0.6 : 0.2} />
        </g>
      )}
      
      {/* 胸大肌下束（胸肋部下段 + 腹部起点） */}
      {(subMuscle === '下束' || subMuscle === '整体') && (
        <g filter="url(#muscleShadow)">
          {/* 左下束 */}
          <path d="M 165 200 Q 172 225 195 232 L 248 240 L 248 310 Q 230 320 210 325 Q 185 328 170 320 Q 158 305 155 280 Q 152 240 165 200 Z" 
                fill={subMuscle === '下束' ? 'url(#lowerChestGrad)' : 'url(#fullChestGrad)'} 
                stroke="#AA0000" strokeWidth="0.5" opacity={subMuscle === '下束' ? 1 : 0.5} />
          <path d="M 165 200 Q 172 225 195 232 L 248 240 L 248 310 Q 230 320 210 325 Q 185 328 170 320 Q 158 305 155 280 Q 152 240 165 200 Z" 
                fill="url(#fiberLower)" opacity={subMuscle === '下束' ? 0.6 : 0.2} />
          {/* 右下束 */}
          <path d="M 335 200 Q 328 225 305 232 L 252 240 L 252 310 Q 270 320 290 325 Q 315 328 330 320 Q 342 305 345 280 Q 348 240 335 200 Z" 
                fill={subMuscle === '下束' ? 'url(#lowerChestGrad)' : 'url(#fullChestGrad)'} 
                stroke="#AA0000" strokeWidth="0.5" opacity={subMuscle === '下束' ? 1 : 0.5} />
          <path d="M 335 200 Q 328 225 305 232 L 252 240 L 252 310 Q 270 320 290 325 Q 315 328 330 320 Q 342 305 345 280 Q 348 240 335 200 Z" 
                fill="url(#fiberLower)" opacity={subMuscle === '下束' ? 0.6 : 0.2} />
        </g>
      )}
      
      {/* 胸肌中缝（胸骨部） */}
      <line x1="250" y1="115" x2="250" y2="330" stroke="#CC0000" strokeWidth="1.5" opacity="0.6" />
      
      {/* ===== 手臂轮廓 ===== */}
      {/* 左臂 */}
      <path d="M 125 200 Q 115 230 110 270 Q 105 310 108 350 Q 110 380 115 400" 
            stroke="url(#skinGradient)" strokeWidth="28" fill="none" strokeLinecap="round" />
      {/* 右臂 */}
      <path d="M 375 200 Q 385 230 390 270 Q 395 310 392 350 Q 390 380 385 400" 
            stroke="url(#skinGradient)" strokeWidth="28" fill="none" strokeLinecap="round" />
      
      {/* 肱三头肌（辅助肌群） */}
      <path d="M 112 230 Q 108 260 110 290 Q 112 310 115 330" 
            stroke={subMuscle === '整体' ? '#FF8844' : '#E8B896'} strokeWidth="12" fill="none" 
            strokeLinecap="round" opacity={subMuscle === '整体' ? 0.7 : 0.4} />
      <path d="M 388 230 Q 392 260 390 290 Q 388 310 385 330" 
            stroke={subMuscle === '整体' ? '#FF8844' : '#E8B896'} strokeWidth="12" fill="none" 
            strokeLinecap="round" opacity={subMuscle === '整体' ? 0.7 : 0.4} />
      
      {/* ===== 肌束标注线和文字 ===== */}
      {/* 上束标注 */}
      {(subMuscle === '上束' || subMuscle === '整体') && (
        <g>
          <line x1="195" y1="135" x2="60" y2="120" stroke="#FF6666" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />
          <circle cx="195" cy="135" r="3" fill="#FF4444" />
          <text x="55" y="118" fill="#FF6666" fontSize="11" fontWeight="bold" fontFamily="system-ui">胸大肌上束</text>
          <text x="55" y="133" fill="#8B949E" fontSize="9" fontFamily="system-ui">锁骨部 · 肩屈曲/水平内收</text>
        </g>
      )}
      
      {/* 中束标注 */}
      {(subMuscle === '中束' || subMuscle === '整体') && (
        <g>
          <line x1="190" y1="200" x2="55" y2="200" stroke="#FF4444" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />
          <circle cx="190" cy="200" r="3" fill="#FF3333" />
          <text x="50" y="198" fill="#FF4444" fontSize="11" fontWeight="bold" fontFamily="system-ui">胸大肌中束</text>
          <text x="50" y="213" fill="#8B949E" fontSize="9" fontFamily="system-ui">胸肋部 · 水平内收/内旋</text>
        </g>
      )}
      
      {/* 下束标注 */}
      {(subMuscle === '下束' || subMuscle === '整体') && (
        <g>
          <line x1="185" y1="280" x2="55" y2="290" stroke="#FF5555" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" />
          <circle cx="185" cy="280" r="3" fill="#FF5555" />
          <text x="50" y="288" fill="#FF5555" fontSize="11" fontWeight="bold" fontFamily="system-ui">胸大肌下束</text>
          <text x="50" y="303" fill="#8B949E" fontSize="9" fontFamily="system-ui">腹部起点 · 肩伸展/下压</text>
        </g>
      )}
      
      {/* 右侧辅助肌群标注 */}
      {subMuscle === '整体' && (
        <g>
          <line x1="355" y1="155" x2="440" y2="140" stroke="#FF8844" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
          <circle cx="355" cy="155" r="3" fill="#FF8844" />
          <text x="400" y="138" fill="#FF8844" fontSize="10" fontWeight="bold" fontFamily="system-ui">三角肌</text>
          <text x="405" y="152" fill="#8B949E" fontSize="8" fontFamily="system-ui">辅助</text>
          
          <line x1="388" y1="270" x2="445" y2="270" stroke="#FF9955" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
          <circle cx="388" cy="270" r="3" fill="#FF9955" />
          <text x="405" y="268" fill="#FF9955" fontSize="10" fontWeight="bold" fontFamily="system-ui">肱三头肌</text>
          <text x="410" y="282" fill="#8B949E" fontSize="8" fontFamily="system-ui">辅助</text>
        </g>
      )}
      
      {/* ===== 底部功能说明 ===== */}
      <rect x="30" y="460" width="440" height="120" rx="8" fill="#161B22" stroke="#30363D" strokeWidth="1" />
      <text x="250" y="482" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="system-ui">胸大肌各束功能</text>
      
      <text x="60" y="505" fill="#FF6666" fontSize="11" fontWeight="bold" fontFamily="system-ui">上束（锁骨部）</text>
      <text x="60" y="520" fill="#8B949E" fontSize="10" fontFamily="system-ui">功能：肩关节屈曲、水平内收、内旋</text>
      <text x="60" y="535" fill="#8B949E" fontSize="10" fontFamily="system-ui">动作：上斜卧推、上斜飞鸟、低位绳索夹胸</text>
      
      <text x="270" y="505" fill="#FF4444" fontSize="11" fontWeight="bold" fontFamily="system-ui">中束（胸肋部）</text>
      <text x="270" y="520" fill="#8B949E" fontSize="10" fontFamily="system-ui">功能：肩水平内收、内旋</text>
      <text x="270" y="535" fill="#8B949E" fontSize="10" fontFamily="system-ui">动作：平板卧推、平板飞鸟、器械夹胸</text>
      
      <text x="60" y="558" fill="#FF5555" fontSize="11" fontWeight="bold" fontFamily="system-ui">下束（腹部起点）</text>
      <text x="60" y="573" fill="#8B949E" fontSize="10" fontFamily="system-ui">功能：肩伸展、下压、内收</text>
      <text x="60" y="588" fill="#8B949E" fontSize="10" fontFamily="system-ui">动作：下斜卧推、双杠臂屈伸、高位绳索夹胸</text>
      
      <text x="270" y="558" fill="#FF8844" fontSize="11" fontWeight="bold" fontFamily="system-ui">辅助肌群</text>
      <text x="270" y="573" fill="#8B949E" fontSize="10" fontFamily="system-ui">三角肌前束：肩屈曲辅助</text>
      <text x="270" y="588" fill="#8B949E" fontSize="10" fontFamily="system-ui">肱三头肌：肘伸展辅助</text>
    </svg>
  );
}

// 腿部解剖图 - 深蹲姿势
export function LegAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <radialGradient id="legGradient">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
        </radialGradient>
        <filter id="legGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 背景 */}
      <rect width="300" height="200" fill="#1a1a2e" />
      
      {/* 人体轮廓 - 深蹲姿势 */}
      {/* 头部 */}
      <ellipse cx="150" cy="30" rx="16" ry="20" fill={colors.bodyBase} />
      
      {/* 躯干 - 前倾 */}
      <path d="M 135 45 Q 150 42 165 45 L 170 80 Q 150 85 130 80 Z" fill={colors.bodyBase} />
      
      {/* 大腿 - 股四头肌 */}
      {subMuscle === '股四头肌' && (
        <>
          <path d="M 132 80 Q 128 110 132 140 Q 140 145 148 140 Q 152 110 148 80 Z" 
                fill="url(#legGradient)" filter="url(#legGlow)" />
          <path d="M 152 80 Q 148 110 152 140 Q 160 145 168 140 Q 172 110 168 80 Z" 
                fill="url(#legGradient)" filter="url(#legGlow)" />
        </>
      )}
      
      {/* 臀大肌 */}
      {subMuscle === '臀大肌' && (
        <path d="M 130 75 Q 150 72 170 75 L 168 90 Q 150 95 132 90 Z" 
              fill="url(#legGradient)" filter="url(#legGlow)" />
      )}
      
      {/* 小腿 */}
      {subMuscle === '小腿' && (
        <>
          <path d="M 134 140 Q 132 165 136 190" stroke={colors.primary} strokeWidth="8" fill="none" opacity="0.8" filter="url(#legGlow)" />
          <path d="M 166 140 Q 168 165 164 190" stroke={colors.primary} strokeWidth="8" fill="none" opacity="0.8" filter="url(#legGlow)" />
        </>
      )}
      
      {/* 整体腿部 */}
      {subMuscle === '整体' && (
        <>
          <path d="M 132 80 Q 128 110 132 140 Q 140 145 148 140 Q 152 110 148 80 Z" fill={colors.primary} opacity="0.6" />
          <path d="M 152 80 Q 148 110 152 140 Q 160 145 168 140 Q 172 110 168 80 Z" fill={colors.primary} opacity="0.6" />
        </>
      )}
      
      {/* 杠铃 */}
      <rect x="100" y="55" width="100" height="6" rx="3" fill="#666" />
      <circle cx="105" cy="58" r="8" fill="#444" />
      <circle cx="195" cy="58" r="8" fill="#444" />
      
      {/* 正确标记 */}
      {showForm && (
        <circle cx="270" cy="30" r="15" fill={colors.correct} opacity="0.9">
          <path d="M 263 30 L 268 35 L 277 25" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </circle>
      )}
    </svg>
  );
}

// 背部解剖图
export function BackAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <radialGradient id="backGradient">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      
      <rect width="300" height="200" fill="#1a1a2e" />
      
      {/* 人体背面轮廓 */}
      <ellipse cx="150" cy="40" rx="18" ry="22" fill={colors.bodyBase} />
      <path d="M 120 55 Q 150 50 180 55 L 185 120 Q 150 130 115 120 Z" fill={colors.bodyBase} />
      
      {/* 背阔肌 */}
      {subMuscle === '背阔肌' && (
        <>
          <path d="M 125 65 Q 120 90 125 115 L 145 110 Q 145 85 145 65 Z" fill="url(#backGradient)" />
          <path d="M 175 65 Q 180 90 175 115 L 155 110 Q 155 85 155 65 Z" fill="url(#backGradient)" />
        </>
      )}
      
      {/* 斜方肌 */}
      {subMuscle === '斜方肌' && (
        <path d="M 135 55 Q 150 52 165 55 L 160 75 Q 150 78 140 75 Z" fill="url(#backGradient)" />
      )}
      
      {/* 手臂 - 下拉姿势 */}
      <path d="M 120 60 Q 100 80 95 110 Q 92 140 98 170" stroke={colors.bodyBase} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M 180 60 Q 200 80 205 110 Q 208 140 202 170" stroke={colors.bodyBase} strokeWidth="10" fill="none" strokeLinecap="round" />
      
      {/* 正确标记 */}
      {showForm && (
        <circle cx="270" cy="30" r="15" fill={colors.correct} opacity="0.9" />
      )}
    </svg>
  );
}

// 肩部解剖图
export function ShoulderAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <radialGradient id="shoulderGradient">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      
      <rect width="300" height="200" fill="#1a1a2e" />
      
      {/* 人体轮廓 */}
      <ellipse cx="150" cy="40" rx="18" ry="22" fill={colors.bodyBase} />
      <path d="M 120 55 Q 150 50 180 55 L 185 120 Q 150 130 115 120 Z" fill={colors.bodyBase} />
      
      {/* 三角肌 */}
      {subMuscle === '前束' && (
        <>
          <circle cx="125" cy="65" r="12" fill="url(#shoulderGradient)" />
          <circle cx="175" cy="65" r="12" fill="url(#shoulderGradient)" />
        </>
      )}
      {subMuscle === '中束' && (
        <>
          <circle cx="120" cy="62" r="12" fill="url(#shoulderGradient)" />
          <circle cx="180" cy="62" r="12" fill="url(#shoulderGradient)" />
        </>
      )}
      {subMuscle === '后束' && (
        <>
          <circle cx="122" cy="68" r="12" fill="url(#shoulderGradient)" />
          <circle cx="178" cy="68" r="12" fill="url(#shoulderGradient)" />
        </>
      )}
      {subMuscle === '整体' && (
        <>
          <circle cx="122" cy="65" r="14" fill={colors.primary} opacity="0.7" />
          <circle cx="178" cy="65" r="14" fill={colors.primary} opacity="0.7" />
        </>
      )}
      
      {/* 哑铃 - 推举姿势 */}
      <rect x="110" y="20" width="20" height="6" rx="2" fill="#4a4a4a" />
      <rect x="170" y="20" width="20" height="6" rx="2" fill="#4a4a4a" />
      
      {showForm && (
        <circle cx="270" cy="30" r="15" fill={colors.correct} opacity="0.9" />
      )}
    </svg>
  );
}

// 手臂解剖图
export function ArmAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <radialGradient id="armGradient">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      
      <rect width="300" height="200" fill="#1a1a2e" />
      
      {/* 人体轮廓 */}
      <ellipse cx="150" cy="40" rx="18" ry="22" fill={colors.bodyBase} />
      <path d="M 120 55 Q 150 50 180 55 L 185 120 Q 150 130 115 120 Z" fill={colors.bodyBase} />
      
      {/* 手臂 - 弯举姿势 */}
      <path d="M 120 60 Q 100 80 95 110 Q 92 140 98 170" stroke={colors.bodyBase} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M 180 60 Q 200 80 205 110 Q 208 140 202 170" stroke={colors.bodyBase} strokeWidth="12" fill="none" strokeLinecap="round" />
      
      {/* 肱二头肌 */}
      {subMuscle === '肱二头肌' && (
        <>
          <ellipse cx="100" cy="100" rx="10" ry="18" fill="url(#armGradient)" />
          <ellipse cx="200" cy="100" rx="10" ry="18" fill="url(#armGradient)" />
        </>
      )}
      
      {/* 肱三头肌 */}
      {subMuscle === '肱三头肌' && (
        <>
          <ellipse cx="95" cy="115" rx="9" ry="20" fill="url(#armGradient)" />
          <ellipse cx="205" cy="115" rx="9" ry="20" fill="url(#armGradient)" />
        </>
      )}
      
      {/* 哑铃 */}
      <rect x="85" y="165" width="25" height="8" rx="2" fill="#4a4a4a" />
      <rect x="190" y="165" width="25" height="8" rx="2" fill="#4a4a4a" />
      
      {showForm && (
        <circle cx="270" cy="30" r="15" fill={colors.correct} opacity="0.9" />
      )}
    </svg>
  );
}

// 核心解剖图
export function CoreAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <radialGradient id="coreGradient">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      
      <rect width="300" height="200" fill="#1a1a2e" />
      
      {/* 人体轮廓 */}
      <ellipse cx="150" cy="40" rx="18" ry="22" fill={colors.bodyBase} />
      <path d="M 120 55 Q 150 50 180 55 L 185 130 Q 150 140 115 130 Z" fill={colors.bodyBase} />
      
      {/* 腹直肌 - 六块腹肌 */}
      {subMuscle === '腹直肌' && (
        <>
          <rect x="140" y="70" width="8" height="12" rx="2" fill="url(#coreGradient)" />
          <rect x="152" y="70" width="8" height="12" rx="2" fill="url(#coreGradient)" />
          <rect x="140" y="85" width="8" height="12" rx="2" fill="url(#coreGradient)" />
          <rect x="152" y="85" width="8" height="12" rx="2" fill="url(#coreGradient)" />
          <rect x="140" y="100" width="8" height="12" rx="2" fill="url(#coreGradient)" />
          <rect x="152" y="100" width="8" height="12" rx="2" fill="url(#coreGradient)" />
        </>
      )}
      
      {/* 腹斜肌 */}
      {subMuscle === '腹斜肌' && (
        <>
          <path d="M 125 75 Q 128 95 126 115" stroke={colors.primary} strokeWidth="6" fill="none" opacity="0.8" />
          <path d="M 175 75 Q 172 95 174 115" stroke={colors.primary} strokeWidth="6" fill="none" opacity="0.8" />
        </>
      )}
      
      {showForm && (
        <circle cx="270" cy="30" r="15" fill={colors.correct} opacity="0.9" />
      )}
    </svg>
  );
}

// 根据肌群返回对应的解剖图组件
export function getAnatomyComponent(muscleGroup: string, subMuscle: string) {
  const muscleMap: Record<string, any> = {
    '胸部': ChestAnatomy3D,
    '背部': BackAnatomy3D,
    '腿部': LegAnatomy3D,
    '肩部': ShoulderAnatomy3D,
    '手臂': ArmAnatomy3D,
    '核心': CoreAnatomy3D,
  };
  
  const Component = muscleMap[muscleGroup] || ChestAnatomy3D;
  return <Component subMuscle={subMuscle} showForm={true} />;
}
