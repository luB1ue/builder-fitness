"use client";

import { useState } from "react";
import Link from "next/link";
interface Equipment {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  targetMuscles: string[];
  description: string;
  tips: string;
  difficulty: "入门" | "中级" | "高级";
  imagePlaceholder: string;
}

const equipmentDatabase: Equipment[] = [
  // 胸部器械
  {
    id: "barbell_bench",
    name: "杠铃卧推架",
    nameEn: "Barbell Bench Press",
    category: "胸部",
    targetMuscles: ["胸大肌", "三角肌前束", "肱三头肌"],
    description: "练胸王牌动作，可调节重量，适合渐进超负荷。平板、上斜、下斜三种角度刺激不同部位。",
    tips: "握距略宽于肩，下放至胸部轻触，推起时呼气。",
    difficulty: "中级",
    imagePlaceholder: "杠铃+卧推凳",
  },
  {
    id: "dumbbell",
    name: "哑铃",
    nameEn: "Dumbbells",
    category: "胸部",
    targetMuscles: ["胸大肌", "三角肌", "肱三头肌"],
    description: "最 versatile 的器械，可做卧推、飞鸟、推举等多种动作。自由重量更能刺激稳定肌群。",
    tips: "选择合适重量，动作全程控制，避免借力。",
    difficulty: "入门",
    imagePlaceholder: "一对哑铃",
  },
  {
    id: "cable_machine",
    name: "绳索机",
    nameEn: "Cable Machine",
    category: "胸部",
    targetMuscles: ["胸大肌", "三角肌前束"],
    description: "提供持续张力，适合做夹胸、面拉等动作。可调节高度刺激不同角度。",
    tips: "保持核心收紧，动作顶端挤压目标肌群。",
    difficulty: "入门",
    imagePlaceholder: "绳索机",
  },
  // 背部器械
  {
    id: "lat_pulldown",
    name: "高位下拉机",
    nameEn: "Lat Pulldown Machine",
    category: "背部",
    targetMuscles: ["背阔肌", "肱二头肌", "三角肌后束"],
    description: "练背入门首选，模拟引体向上动作。宽握练宽度，窄握练厚度。",
    tips: "下拉至锁骨位置，感受背阔肌收缩，缓慢回放。",
    difficulty: "入门",
    imagePlaceholder: "高位下拉机",
  },
  {
    id: "rowing_machine",
    name: "划船机",
    nameEn: "Rowing Machine",
    category: "背部",
    targetMuscles: ["背阔肌", "斜方肌", "二头肌"],
    description: "坐姿划船机，练背厚度王牌。可调节握距和角度。",
    tips: "挺胸收腹，拉至腹部，感受肩胛骨收缩。",
    difficulty: "入门",
    imagePlaceholder: "划船机",
  },
  // 腿部器械
  {
    id: "squat_rack",
    name: "深蹲架",
    nameEn: "Squat Rack",
    category: "腿部",
    targetMuscles: ["股四头肌", "臀大肌", "腘绳肌"],
    description: "练腿核心器械，可做深蹲、前蹲、过头蹲等变式。力量训练之王。",
    tips: "蹲至大腿平行地面，膝盖不超过脚尖太多，核心收紧。",
    difficulty: "中级",
    imagePlaceholder: "深蹲架+杠铃",
  },
  {
    id: "leg_press",
    name: "倒蹬机",
    nameEn: "Leg Press Machine",
    category: "腿部",
    targetMuscles: ["股四头肌", "臀大肌"],
    description: "相对安全的练腿器械，适合新手或腰部不适者。可调节脚位刺激不同部位。",
    tips: "脚位高练臀，脚位低练股四头，膝盖不要锁死。",
    difficulty: "入门",
    imagePlaceholder: "倒蹬机",
  },
  {
    id: "leg_extension",
    name: "腿屈伸机",
    nameEn: "Leg Extension Machine",
    category: "腿部",
    targetMuscles: ["股四头肌"],
    description: "孤立训练股四头肌，适合热身或收尾。",
    tips: "动作顶端停留1秒，缓慢下放，避免借力甩腿。",
    difficulty: "入门",
    imagePlaceholder: "腿屈伸机",
  },
  // 肩部器械
  {
    id: "shoulder_press_machine",
    name: "肩推机",
    nameEn: "Shoulder Press Machine",
    category: "肩部",
    targetMuscles: ["三角肌", "肱三头肌"],
    description: "固定轨迹肩推，比自由重量更安全，适合新手。",
    tips: "推至手臂伸直但不锁死，下放至耳朵高度。",
    difficulty: "入门",
    imagePlaceholder: "肩推机",
  },
  {
    id: "lateral_raise_machine",
    name: "侧平举机",
    nameEn: "Lateral Raise Machine",
    category: "肩部",
    targetMuscles: ["三角肌中束"],
    description: "孤立训练三角肌中束，打造宽肩必备。",
    tips: "手肘微屈，抬至肩高，避免耸肩。",
    difficulty: "入门",
    imagePlaceholder: "侧平举机",
  },
  // 手臂器械
  {
    id: "curl_station",
    name: "二头弯举架",
    nameEn: "Bicep Curl Station",
    category: "手臂",
    targetMuscles: ["肱二头肌", "肱肌"],
    description: "专用弯举器械，可调节座椅高度，固定轨迹更安全。",
    tips: "上臂贴紧垫子，只动前臂，顶峰收缩。",
    difficulty: "入门",
    imagePlaceholder: "弯举架",
  },
  {
    id: "tricep_pushdown",
    name: "三头下压机",
    nameEn: "Tricep Pushdown Machine",
    category: "手臂",
    targetMuscles: ["肱三头肌"],
    description: "绳索下压，练三头经典动作。可用直杆或绳头。",
    tips: "大臂固定不动，只动前臂，压到底部挤压三头。",
    difficulty: "入门",
    imagePlaceholder: "绳索下压机",
  },
  // 核心器械
  {
    id: "ab_wheel",
    name: "健腹轮",
    nameEn: "Ab Wheel",
    category: "核心",
    targetMuscles: ["腹直肌", "腹斜肌", "竖脊肌"],
    description: "高效核心训练工具，从跪姿开始，逐步挑战站姿。",
    tips: "核心收紧，缓慢 rollout，不要塌腰。",
    difficulty: "中级",
    imagePlaceholder: "健腹轮",
  },
  {
    id: "cable_crunch",
    name: "绳索卷腹",
    nameEn: "Cable Crunch",
    category: "核心",
    targetMuscles: ["腹直肌"],
    description: "负重卷腹，可调节重量，比自重卷腹更高效。",
    tips: "用腹肌发力卷曲，不是用手臂拉，呼气时卷起。",
    difficulty: "中级",
    imagePlaceholder: "绳索机+跪姿",
  },
];

const categoryIcons: Record<string, string> = {
  "胸部": "💪",
  "背部": "🔙",
  "腿部": "🦵",
  "肩部": "🏋️",
  "手臂": "",
  "核心": "🎯",
};

const difficultyColors: Record<string, string> = {
  "入门": "var(--success)",
  "中级": "var(--warning)",
  "高级": "var(--danger)",
};

export default function EquipmentGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [expandedImage, setExpandedImage] = useState<{ id: string; name: string; nameEn: string } | null>(null);
  
  const categories = ["全部", "胸部", "背部", "腿部", "肩部", "手臂", "核心"];
  
  const filteredEquipment = selectedCategory === "全部" 
    ? equipmentDatabase 
    : equipmentDatabase.filter(eq => eq.category === selectedCategory);

  return (
    <div className="min-h-screen px-4 py-6 max-w-4xl mx-auto w-full">
      {/* 顶部导航 */}
      <header className="flex items-center gap-3 mb-6 animate-fade-in">
        <Link href="/" className="btn-secondary text-sm py-2 px-4">← 返回</Link>
        <h1 className="text-xl font-bold gradient-text">器械科普</h1>
      </header>

      {/* 分类筛选 */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 animate-fade-in">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: cat === selectedCategory ? "var(--gradient)" : "var(--surface)",
              color: cat === selectedCategory ? "white" : "var(--text-secondary)",
              border: cat === selectedCategory ? "none" : "1px solid var(--border)",
            }}
          >
            {cat !== "全部" && <span className="mr-1">{categoryIcons[cat]}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* 器械列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredEquipment.map((eq, i) => (
          <div key={eq.id} className="card animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
            {/* 器械图片 - 可点击放大 */}
            <button
              onClick={() => setExpandedImage({ id: eq.id, name: eq.name, nameEn: eq.nameEn })}
              className="w-full h-40 rounded-lg mb-3 overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] border border-transparent hover:border-[var(--primary)]/30"
              style={{ background: "var(--surface-hover)" }}
              title="点击放大查看"
            >
              <img
                src={`/equipment/${eq.id}.png`}
                alt={eq.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </button>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--primary)20", color: "var(--primary)" }}>
                {eq.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ 
                background: `${difficultyColors[eq.difficulty]}20`, 
                color: difficultyColors[eq.difficulty] 
              }}>
                {eq.difficulty}
              </span>
            </div>
            
            <h3 className="font-bold text-lg mb-1">{eq.name}</h3>
            <p className="text-xs text-text-muted mb-2">{eq.nameEn}</p>
            
            <p className="text-sm text-text-secondary mb-3">{eq.description}</p>
            
            <div className="p-2 rounded-lg text-xs" style={{ background: "var(--background)" }}>
              <span className="text-warning">💡 </span>
              <span className="text-text-muted">{eq.tips}</span>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {eq.targetMuscles.map(muscle => (
                <span key={muscle} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--surface-hover)", color: "var(--text-muted)" }}>
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 器械图片放大弹窗 */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-2xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-10 right-0 text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors z-10"
            >
              ✕
            </button>
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)" }}>
              <div className="p-3 border-b border-[var(--border)]">
                <h3 className="font-bold text-white">{expandedImage.name}</h3>
                <p className="text-xs text-text-muted">{expandedImage.nameEn}</p>
              </div>
              <div className="w-full" style={{ aspectRatio: "4/3" }}>
                <img
                  src={`/equipment/${expandedImage.id}.png`}
                  alt={expandedImage.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 推荐资源 */}
      <div className="mt-8 card">
        <h3 className="font-bold text-lg mb-3">📺 推荐学习资源</h3>
        <div className="space-y-2">
          <a href="https://www.douyin.com/user/MS4wLjABAAAA" target="_blank" rel="noopener noreferrer" 
             className="block p-3 rounded-lg transition-all hover:scale-[1.02]" 
             style={{ background: "var(--surface-hover)" }}>
            <div className="font-medium text-sm">抖音：tanchengyi</div>
            <div className="text-xs text-text-muted mt-1">专业健身科普，动作讲解详细到位</div>
          </a>
          <a href="https://www.douyin.com/search/健身教学" target="_blank" rel="noopener noreferrer"
             className="block p-3 rounded-lg transition-all hover:scale-[1.02]"
             style={{ background: "var(--surface-hover)" }}>
            <div className="font-medium text-sm">抖音搜索：健身教学</div>
            <div className="text-xs text-text-muted mt-1">海量健身视频教程</div>
          </a>
        </div>
      </div>
    </div>
  );
}
