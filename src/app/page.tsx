"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserProfile, FitnessLevel } from "@/types";

const STORAGE_KEY = "builder_profile";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
  };

  // 已有档案 → 显示 Dashboard
  if (profile) {
    return <Dashboard profile={profile} onReset={handleReset} />;
  }

  // 无档案 → 显示 Landing
  return <LandingPage />;
}

// ============ Landing Page ============
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6"
            style={{ background: "var(--gradient)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5h11M6.5 17.5h11M4 4v16M20 4v16M8 4v16M16 4v16" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-3">
            <span className="gradient-text">Builder</span>
          </h1>
          <p className="text-xl text-text-secondary">Build Yourself, For Yourself</p>
          <p className="text-text-muted mt-2">发掘个人潜力，为了自己而练</p>
        </div>

        {/* 功能亮点 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "🧠", title: "AI 智能分级", desc: "根据PR数据自动评估训练水平" },
            { icon: "📋", title: "个性化计划", desc: "三分化/五分化智能推荐" },
            { icon: "🍽️", title: "精准饮食", desc: "碳水×3 + 蛋白质科学配比" },
          ].map((item, i) => (
            <div key={i} className="card text-center" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/onboarding">
          <button className="btn-primary text-lg px-10 py-4 animate-pulse-glow">
            开始创建你的档案 →
          </button>
        </Link>

        <p className="text-text-muted text-sm mt-6">
          免费使用 · 数据存储在本地 · 无需注册
        </p>
      </div>
    </div>
  );
}

// ============ Dashboard ============
function Dashboard({ profile, onReset }: { profile: UserProfile; onReset: () => void }) {
  const levelLabels: Record<FitnessLevel, { label: string; color: string }> = {
    beginner: { label: "新手", color: "var(--success)" },
    intermediate: { label: "进阶", color: "var(--warning)" },
    advanced: { label: "老手", color: "var(--accent)" },
  };
  const goalLabels: Record<string, string> = {
    muscle_gain: "增肌",
    fat_loss: "减脂",
    recomp: "体型重塑",
  };
  const level = levelLabels[profile.fitnessLevel];

  return (
    <div className="min-h-screen px-4 py-6 max-w-6xl mx-auto w-full">
      {/* 顶部导航 */}
      <header className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M6.5 6.5h11M6.5 17.5h11M4 4v16M20 4v16" />
            </svg>
          </div>
          <h1 className="text-xl font-bold gradient-text">Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/settings">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              title="设置">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </button>
          </Link>
          <button onClick={onReset} className="btn-secondary text-sm py-2 px-4">
            重置档案
          </button>
        </div>
      </header>

      {/* 用户概览卡片 */}
      <div className="card mb-6 animate-fade-in">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-2xl font-bold mb-1">欢迎回来 💪</h2>
            <p className="text-text-secondary">
              {profile.gender === "male" ? "兄弟" : "姐妹"}，今天也要为了自己而练！
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <StatBadge label="级别" value={level.label} color={level.color} />
            <StatBadge label="目标" value={goalLabels[profile.goalType]} color="var(--primary)" />
            <StatBadge label="体重" value={`${profile.weight}kg`} color="var(--secondary)" />
            <StatBadge label="目标体重" value={`${profile.targetWeight}kg`} color="var(--accent)" />
          </div>
        </div>
      </div>

      {/* 功能入口网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { icon: "️", title: "今日训练", desc: "查看今日训练计划", href: "/dashboard/training", color: "var(--primary)" },
          { icon: "🍽️", title: "饮食方案", desc: "个性化营养计划", href: "/dashboard/diet", color: "var(--success)" },
          { icon: "", title: "训练理论", desc: "科学训练知识", href: "/dashboard/theory", color: "var(--warning)" },
          { icon: "🩺", title: "伤病恢复", desc: "疼痛分析与建议", href: "/dashboard/recovery", color: "var(--accent)" },
          { icon: "🏋️", title: "器械科普", desc: "器械使用指南", href: "/dashboard/equipment", color: "var(--secondary)" },
          { icon: "⌚", title: "手表同步", desc: "健康数据·运动手表", href: "/dashboard/watch", color: "#FF3B30" },
        ].map((item, i) => (
          <Link key={i} href={item.href} className="card animate-slide-in" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-text-muted">{item.desc}</p>
            <div className="mt-3 text-sm font-medium" style={{ color: item.color }}>
              进入 →
            </div>
          </Link>
        ))}
      </div>

      {/* PR 数据概览 */}
      <div className="card animate-fade-in">
        <h3 className="font-bold text-lg mb-4">个人 PR 数据</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <PRCard label="卧推" value={`${profile.prData.benchPress}kg`} ratio={(profile.prData.benchPress / profile.weight).toFixed(2)} />
          <PRCard label="深蹲" value={`${profile.prData.squat}kg`} ratio={(profile.prData.squat / profile.weight).toFixed(2)} />
          <PRCard label="硬拉" value={`${profile.prData.deadlift}kg`} ratio={(profile.prData.deadlift / profile.weight).toFixed(2)} />
          <PRCard label="训练年限" value={`${profile.prData.trainingYears}年`} ratio={`${profile.trainingFrequency}次/周`} />
        </div>
      </div>
    </div>
  );
}

function StatBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center px-4 py-2 rounded-xl" style={{ background: `${color}15`, border: `1px solid ${color}40` }}>
      <div className="text-xs text-text-muted mb-0.5">{label}</div>
      <div className="font-bold text-sm" style={{ color }}>{value}</div>
    </div>
  );
}

function PRCard({ label, value, ratio }: { label: string; value: string; ratio: string }) {
  return (
    <div className="text-center p-4 rounded-xl" style={{ background: "var(--surface-hover)" }}>
      <div className="text-xs text-text-muted mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-primary mt-1">×{ratio}</div>
    </div>
  );
}
