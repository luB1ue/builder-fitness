"use client";

import Link from "next/link";
import { trainingTheory } from "@/lib/exercises";

export default function TheoryPage() {
  return (
    <div className="min-h-screen px-4 py-6 max-w-4xl mx-auto w-full">
      <header className="flex items-center gap-3 mb-6 animate-fade-in">
        <Link href="/" className="btn-secondary text-sm py-2 px-4">← 返回</Link>
        <h1 className="text-xl font-bold gradient-text">训练理论</h1>
      </header>

      {/* 次数区间理论 */}
      <div className="card mb-6 animate-fade-in">
        <h3 className="font-bold text-lg mb-4">次数区间与训练效果</h3>
        <div className="space-y-4">
          {trainingTheory.repRanges.map((range, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "var(--surface-hover)" }}>
              <h4 className="font-bold mb-2" style={{ color: i === 0 ? "var(--danger)" : i === 1 ? "var(--primary)" : "var(--success)" }}>
                {range.title}
              </h4>
              <p className="text-sm text-text-secondary mb-2">{range.description}</p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-2 py-1 rounded" style={{ background: "var(--primary)15", color: "var(--primary)" }}>
                  适合：{range.bestFor}
                </span>
                <span className="px-2 py-1 rounded" style={{ background: "var(--warning)15", color: "var(--warning)" }}>
                  组间休息：{range.restTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 大肌群 vs 小肌群 */}
      <div className="card mb-6 animate-fade-in">
        <h3 className="font-bold text-lg mb-4">大肌群 vs 小肌群</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(trainingTheory.muscleGroups).map((group, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "var(--surface-hover)" }}>
              <h4 className="font-bold mb-2" style={{ color: i === 0 ? "var(--primary)" : "var(--accent)" }}>
                {group.name}
              </h4>
              <div className="flex flex-wrap gap-1 mb-3">
                {group.muscles.map(m => (
                  <span key={m} className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--primary)10", color: "var(--text-secondary)" }}>
                    {m}
                  </span>
                ))}
              </div>
              <div className="space-y-1 text-sm text-text-secondary">
                <p>恢复时间：{group.recoveryTime}</p>
                <p>训练频率：{group.frequency}</p>
              </div>
              <p className="text-xs text-text-muted mt-2 p-2 rounded" style={{ background: "var(--background)" }}>
                {group.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 分化训练建议 */}
      <div className="card mb-6 animate-fade-in">
        <h3 className="font-bold text-lg mb-4">分化训练方案</h3>
        <div className="space-y-4">
          {[
            {
              level: "新手",
              split: "全身训练 (Full Body)",
              frequency: "每周 3 次",
              desc: "每次训练覆盖全身主要肌群，动作以复合动作为主。适合建立基础力量和学习动作模式。",
              example: "深蹲 + 卧推 + 划船 + 推举 + 平板支撑",
            },
            {
              level: "进阶",
              split: "三分化 (Push / Pull / Legs)",
              frequency: "每周 3-4 次",
              desc: "推日（胸/肩/三头）、拉日（背/二头）、腿日（股四/后链/核心）。每个肌群每周训练1-2次。",
              example: "周一推 / 周二拉 / 周三腿 / 周四休 / 循环",
            },
            {
              level: "老手",
              split: "五分化 (Bro Split)",
              frequency: "每周 5 次",
              desc: "每天专注一个肌群，训练量更大，刺激更深。适合有足够恢复能力的高级训练者。",
              example: "胸 / 背 / 腿(股四) / 肩 / 手臂+核心 / 腿(后链) / 休",
            },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "var(--surface-hover)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold" style={{ color: "var(--primary)" }}>{item.level}</span>
                <span className="text-sm text-text-secondary">— {item.split}</span>
                <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ background: "var(--warning)15", color: "var(--warning)" }}>
                  {item.frequency}
                </span>
              </div>
              <p className="text-sm text-text-secondary mb-2">{item.desc}</p>
              <p className="text-xs text-text-muted p-2 rounded" style={{ background: "var(--background)" }}>
                示例：{item.example}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 过度训练警示 */}
      <div className="card animate-fade-in">
        <h3 className="font-bold text-lg mb-2" style={{ color: "var(--warning)" }}>
          {trainingTheory.overtrainingWarning.title}
        </h3>
        <p className="text-sm text-text-secondary mb-4">{trainingTheory.overtrainingWarning.description}</p>

        <h4 className="font-medium text-sm mb-2 text-text">症状表现：</h4>
        <div className="space-y-1 mb-4">
          {trainingTheory.overtrainingWarning.symptoms.map((s, i) => (
            <p key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span style={{ color: "var(--danger)" }}></span> {s}
            </p>
          ))}
        </div>

        <h4 className="font-medium text-sm mb-2 text-text">预防建议：</h4>
        <div className="space-y-1">
          {trainingTheory.overtrainingWarning.recommendations.map((r, i) => (
            <p key={i} className="text-sm text-text-secondary flex items-start gap-2">
              <span style={{ color: "var(--success)" }}>✓</span> {r}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
