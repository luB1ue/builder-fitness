"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserProfile, FitnessLevel, TrainingPlan } from "@/types";
import { generateTrainingPlan, exerciseDatabase } from "@/lib/exercises";
import { getAnatomyComponent } from "@/components/AnatomyDiagram";

const STORAGE_KEY = "builder_profile";

export default function TrainingPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<TrainingPlan[]>([]);
  // 根据今天星期几自动定位（计划数组：0=周一 ... 6=周日）
  const todayIndex = (new Date().getDay() + 6) % 7; // JS: 0=周日, 1=周一... → 转为 0=周一...6=周日
  const [selectedDay, setSelectedDay] = useState(todayIndex);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      setPlan(generateTrainingPlan(p.fitnessLevel, p.goalType, p.painAreas));
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">请先创建个人档案</p>
          <Link href="/onboarding" className="btn-primary">去创建 →</Link>
        </div>
      </div>
    );
  }

  const today = plan[selectedDay];
  const levelLabels: Record<FitnessLevel, string> = { beginner: "新手", intermediate: "进阶", advanced: "老手" };

  return (
    <div className="min-h-screen px-4 py-6 max-w-4xl mx-auto w-full">
      {/* 顶部导航 */}
      <header className="flex items-center gap-3 mb-6 animate-fade-in">
        <Link href="/" className="btn-secondary text-sm py-2 px-4">← 返回</Link>
        <h1 className="text-xl font-bold gradient-text">今日训练计划</h1>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "var(--primary)20", color: "var(--primary)" }}>
          {levelLabels[profile.fitnessLevel]}
        </span>
      </header>

      {/* 周计划选择 */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 animate-fade-in">
        {plan.map((day, i) => (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            className="flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all min-w-[80px]"
            style={{
              background: i === selectedDay ? "var(--gradient)" : "var(--surface)",
              color: i === selectedDay ? "white" : "var(--text-secondary)",
              border: i === selectedDay ? "none" : "1px solid var(--border)",
            }}
          >
            <div className="text-xs opacity-70 flex items-center justify-center gap-1">
              {day.day}
              {i === todayIndex && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: "var(--accent)", color: "white" }}>
                  今天
                </span>
              )}
            </div>
            <div className="text-sm font-bold mt-0.5 truncate max-w-[70px]">{day.focus}</div>
          </button>
        ))}
      </div>

      {/* 康复改善动作 — 置顶显示 */}
      {profile.painAreas && profile.painAreas.length > 0 && (
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🩺</span>
            <h2 className="text-lg font-bold" style={{ color: "var(--warning)" }}>为你定制的改善动作</h2>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--warning)15", color: "var(--warning)" }}>
              针对：{profile.painAreas.join("、")}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exerciseDatabase
              .filter(ex => ex.isRehab && profile.painAreas.includes(ex.targetPain || ""))
              .map((ex, i) => (
                <div key={ex.id} className="card p-4" style={{ animationDelay: `${i * 0.05}s` }}>
                  {/* 3D 解剖图 */}
                  <div className="w-full h-36 rounded-lg mb-3 overflow-hidden" style={{ background: "var(--surface-hover)" }}>
                    {getAnatomyComponent(ex.muscleGroup, ex.subMuscle)}
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--warning)20", color: "var(--warning)" }}>
                      改善 {ex.targetPain}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm">{ex.name}</h3>
                  <p className="text-xs text-text-muted mb-1">{ex.nameEn}</p>
                  <p className="text-xs text-text-secondary mb-2">{ex.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-primary font-medium">{ex.sets}组 × {ex.reps}</span>
                    <span className="text-text-muted">{ex.equipment}</span>
                  </div>
                  <div className="mt-2 p-2 rounded-lg text-xs" style={{ background: "var(--background)" }}>
                    <span className="text-warning">💡 </span>
                    <span className="text-text-muted">{ex.tips}</span>
                  </div>
                </div>
              ))
            }
          </div>
          {exerciseDatabase.filter(ex => ex.isRehab && profile.painAreas.includes(ex.targetPain || "")).length === 0 && (
            <div className="card p-4 text-center">
              <p className="text-sm text-text-secondary">暂无针对以上问题的专项改善动作，建议前往「伤病恢复」页面查看详细建议。</p>
            </div>
          )}
        </div>
      )}

      {/* 今日训练详情 */}
      <div className="card animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">{today.day} — {today.focus}</h2>
            {today.cardioMinutes > 0 && (
              <p className="text-sm text-text-muted mt-1">
                有氧建议：{today.cardioMinutes} 分钟低强度有氧
              </p>
            )}
          </div>
        </div>

        {today.exercises.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3"></div>
            <p className="text-text-secondary">{today.notes}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {today.exercises.map((ex, i) => (
              <div key={ex.id} className="p-4 rounded-xl transition-all" style={{ background: "var(--surface-hover)", animationDelay: `${i * 0.05}s` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "var(--primary)20", color: "var(--primary)" }}>
                        {ex.muscleGroup}
                      </span>
                      <span className="text-xs text-text-muted">{ex.subMuscle}</span>
                    </div>
                    <h3 className="font-bold">{ex.name}</h3>
                    <p className="text-xs text-text-muted">{ex.nameEn}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-bold" style={{ color: "var(--primary)" }}>{ex.sets} 组</div>
                    <div className="text-xs text-text-muted">{ex.reps} 次</div>
                  </div>
                </div>
                {/* 3D 解剖图 */}
                <div className="w-full h-32 rounded-lg mt-3 overflow-hidden" style={{ background: "var(--background)" }}>
                  {getAnatomyComponent(ex.muscleGroup, ex.subMuscle)}
                </div>
                <p className="text-sm text-text-secondary mt-2">{ex.description}</p>
                <div className="mt-2 p-2 rounded-lg text-xs" style={{ background: "var(--background)" }}>
                  <span className="text-warning">💡 </span>
                  <span className="text-text-muted">{ex.tips}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-text-muted">器械：{ex.equipment}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{
                    background: ex.difficulty === "beginner" ? "var(--success)20" : ex.difficulty === "intermediate" ? "var(--warning)20" : "var(--danger)20",
                    color: ex.difficulty === "beginner" ? "var(--success)" : ex.difficulty === "intermediate" ? "var(--warning)" : "var(--danger)",
                  }}>
                    {ex.difficulty === "beginner" ? "入门" : ex.difficulty === "intermediate" ? "中级" : "高级"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {today.notes && today.exercises.length > 0 && (
          <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: "var(--primary)08", border: "1px solid var(--primary)20" }}>
            <span className="text-primary">📝 </span>
            <span className="text-text-secondary">{today.notes}</span>
          </div>
        )}
      </div>

      {/* 训练理论快捷入口 */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link href="/dashboard/theory" className="card text-center py-4">
          <div className="text-2xl mb-1">📚</div>
          <div className="text-sm font-medium">训练理论</div>
          <div className="text-xs text-text-muted">次数区间 / 肌群知识</div>
        </Link>
        <Link href="/dashboard/recovery" className="card text-center py-4">
          <div className="text-2xl mb-1">🩺</div>
          <div className="text-sm font-medium">伤病恢复</div>
          <div className="text-xs text-text-muted">疼痛分析 / 改善建议</div>
        </Link>
      </div>
    </div>
  );
}
