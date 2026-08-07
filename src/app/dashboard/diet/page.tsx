"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserProfile } from "@/types";
import { generateDietPlan } from "@/lib/aiEvaluator";

const STORAGE_KEY = "builder_profile";

export default function DietPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [diet, setDiet] = useState<ReturnType<typeof generateDietPlan> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      setDiet(generateDietPlan(p));
    }
  }, []);

  if (!profile || !diet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">请先创建个人档案</p>
          <Link href="/onboarding" className="btn-primary">去创建 →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-4xl mx-auto w-full">
      <header className="flex items-center gap-3 mb-6 animate-fade-in">
        <Link href="/" className="btn-secondary text-sm py-2 px-4">← 返回</Link>
        <h1 className="text-xl font-bold gradient-text">个性化饮食方案</h1>
      </header>

      {/* 热量概览 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-fade-in">
        <MacroCard label="基础代谢" value={`${diet.bmr}`} unit="kcal" color="var(--text-secondary)" />
        <MacroCard label="每日消耗" value={`${diet.tdee}`} unit="kcal" color="var(--text-secondary)" />
        <MacroCard label="目标热量" value={`${diet.calorieTarget}`} unit="kcal" color="var(--primary)" highlight />
        <MacroCard label="目标" value={diet.goalLabel} unit="" color="var(--accent)" />
      </div>

      {/* 宏量营养素 */}
      <div className="card mb-6 animate-fade-in">
        <h3 className="font-bold text-lg mb-4">每日宏量营养素</h3>
        <div className="space-y-4">
          <MacroBar label="蛋白质" value={diet.protein} unit="g" color="var(--primary)" note="体重 × 2g" />
          <MacroBar label="碳水化合物" value={diet.carbs} unit="g" color="var(--warning)" note="体重 × 3g" />
          <MacroBar label="脂肪" value={diet.fat} unit="g" color="var(--accent)" note="剩余热量分配" />
        </div>
        <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "var(--surface-hover)" }}>
          <p className="text-text-muted">
            蛋白质 {diet.protein}g × 4 = {diet.protein * 4}kcal +
            碳水 {diet.carbs}g × 4 = {diet.carbs * 4}kcal +
            脂肪 {diet.fat}g × 9 = {diet.fat * 9}kcal =
            总计 {diet.protein * 4 + diet.carbs * 4 + diet.fat * 9}kcal
          </p>
        </div>
      </div>

      {/* 每日餐单建议 */}
      <div className="card animate-fade-in">
        <h3 className="font-bold text-lg mb-4">每日餐单建议</h3>
        <div className="space-y-4">
          {diet.mealSuggestions.map((meal, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "var(--surface-hover)" }}>
              <h4 className="font-bold mb-2" style={{ color: "var(--primary)" }}>{meal.meal}</h4>
              <ul className="space-y-1">
                {meal.foods.map((food, j) => (
                  <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {food}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 饮食贴士 */}
      <div className="mt-6 card animate-fade-in">
        <h3 className="font-bold text-lg mb-3">饮食贴士</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>• 训练后30分钟内补充蛋白质和快速碳水，促进肌肉恢复</p>
          <p>• 每天饮水 {Math.round(profile.weight * 0.04 * 10) / 10}L（体重 × 40ml）</p>
          <p>• 蔬菜不限量，优先选择深色蔬菜（西兰花、菠菜、紫甘蓝）</p>
          <p>• 减脂期不要过度节食，热量缺口控制在300-500kcal/天</p>
          <p>• 增肌期热量盈余控制在200-300kcal/天，避免过多脂肪增长</p>
        </div>
      </div>
    </div>
  );
}

function MacroCard({ label, value, unit, color, highlight }: { label: string; value: string; unit: string; color: string; highlight?: boolean }) {
  return (
    <div className="p-4 rounded-xl text-center" style={{
      background: highlight ? `${color}15` : "var(--surface)",
      border: highlight ? `1px solid ${color}40` : "1px solid var(--border)",
    }}>
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-text-muted">{unit}</div>
    </div>
  );
}

function MacroBar({ label, value, unit, color, note }: { label: string; value: number; unit: string; color: string; note: string }) {
  const maxVal = 300;
  const percentage = Math.min((value / maxVal) * 100, 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-hover)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${percentage}%`, background: color }} />
      </div>
      <p className="text-xs text-text-muted mt-1">{note}</p>
    </div>
  );
}
