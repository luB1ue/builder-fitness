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

// 胸部解剖图 - 带肌肉纹理
export function ChestAnatomy3D({ subMuscle = '整体', showForm = true }: { subMuscle?: string; showForm?: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        {/* 肌肉纹理渐变 */}
        <radialGradient id="chestGradient">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 背景 */}
      <rect width="300" height="200" fill="#1a1a2e" />
      
      {/* 人体轮廓 - 卧推姿势 */}
      {/* 头部 */}
      <ellipse cx="150" cy="40" rx="18" ry="22" fill={colors.bodyBase} />
      
      {/* 躯干 */}
      <path d="M 120 55 Q 150 50 180 55 L 185 100 Q 150 110 115 100 Z" fill={colors.bodyBase} />
      
      {/* 胸大肌 - 根据subMuscle高亮不同区域 */}
      {subMuscle === '上束' && (
        <path d="M 125 58 Q 150 55 175 58 L 173 75 Q 150 80 127 75 Z" 
              fill="url(#chestGradient)" filter="url(#glow)" />
      )}
      {subMuscle === '中束' && (
        <path d="M 125 72 Q 150 70 175 72 L 173 90 Q 150 95 127 90 Z" 
              fill="url(#chestGradient)" filter="url(#glow)" />
      )}
      {subMuscle === '下束' && (
        <path d="M 125 88 Q 150 86 175 88 L 172 102 Q 150 107 128 102 Z" 
              fill="url(#chestGradient)" filter="url(#glow)" />
      )}
      {subMuscle === '整体' && (
        <path d="M 125 58 Q 150 55 175 58 L 173 100 Q 150 105 127 100 Z" 
              fill="url(#chestGradient)" filter="url(#glow)" />
      )}
      
      {/* 胸肌纹理线条 */}
      <path d="M 130 65 Q 150 63 170 65" stroke={colors.bodyShadow} strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 130 75 Q 150 73 170 75" stroke={colors.bodyShadow} strokeWidth="0.5" fill="none" opacity="0.5" />
      <path d="M 130 85 Q 150 83 170 85" stroke={colors.bodyShadow} strokeWidth="0.5" fill="none" opacity="0.5" />
      
      {/* 手臂 - 卧推姿势 */}
      <path d="M 120 60 Q 100 70 95 90 Q 92 110 98 130" stroke={colors.bodyBase} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M 180 60 Q 200 70 205 90 Q 208 110 202 130" stroke={colors.bodyBase} strokeWidth="10" fill="none" strokeLinecap="round" />
      
      {/* 三头肌 */}
      <path d="M 105 75 Q 100 90 102 105" stroke={colors.secondary} strokeWidth="5" fill="none" opacity="0.6" />
      <path d="M 195 75 Q 200 90 198 105" stroke={colors.secondary} strokeWidth="5" fill="none" opacity="0.6" />
      
      {/* 三角肌前束 */}
      <circle cx="118" cy="62" r="7" fill={colors.secondary} opacity="0.7" />
      <circle cx="182" cy="62" r="7" fill={colors.secondary} opacity="0.7" />
      
      {/* 哑铃 */}
      <rect x="85" y="125" width="30" height="8" rx="2" fill="#4a4a4a" />
      <rect x="185" y="125" width="30" height="8" rx="2" fill="#4a4a4a" />
      <circle cx="90" cy="129" r="6" fill="#333" />
      <circle cx="110" cy="129" r="6" fill="#333" />
      <circle cx="190" cy="129" r="6" fill="#333" />
      <circle cx="210" cy="129" r="6" fill="#333" />
      
      {/* 正确/错误标记 */}
      {showForm && (
        <>
          <circle cx="270" cy="30" r="15" fill={colors.correct} opacity="0.9" />
          <path d="M 263 30 L 268 35 L 277 25" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
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
