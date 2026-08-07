"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserProfile } from "@/types";
import { getPainAdvice } from "@/lib/aiEvaluator";

const STORAGE_KEY = "builder_profile";

const PAIN_OPTIONS = ["肩膀弹响", "膝盖疼痛", "腰部不适", "手腕疼痛"];

export default function RecoveryPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedPain, setSelectedPain] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      setProfile(p);
      if (p.painAreas && p.painAreas.length > 0) {
        setSelectedPain(p.painAreas[0]);
      }
    }
  }, []);

  const advice = selectedPain ? getPainAdvice(selectedPain) : null;

  return (
    <div className="min-h-screen px-4 py-6 max-w-4xl mx-auto w-full">
      <header className="flex items-center gap-3 mb-6 animate-fade-in">
        <Link href="/" className="btn-secondary text-sm py-2 px-4">← 返回</Link>
        <h1 className="text-xl font-bold gradient-text">伤病恢复与体态矫正</h1>
      </header>

      {/* 疼痛部位选择 */}
      <div className="card mb-6 animate-fade-in">
        <h3 className="font-bold text-lg mb-3">选择你的不适部位</h3>
        <div className="grid grid-cols-2 gap-3">
          {PAIN_OPTIONS.map(area => (
            <button
              key={area}
              onClick={() => setSelectedPain(area)}
              className="py-4 px-4 rounded-xl text-center transition-all"
              style={{
                background: selectedPain === area ? "var(--danger)15" : "var(--surface-hover)",
                color: selectedPain === area ? "var(--danger)" : "var(--text-secondary)",
                border: `1px solid ${selectedPain === area ? "var(--danger)" : "var(--border)"}`,
              }}
            >
              <div className="text-2xl mb-1">
                {area === "肩膀弹响" ? "" : area === "膝盖疼痛" ? "" : area === "腰部不适" ? "" : ""}
              </div>
              <div className="font-medium text-sm">{area}</div>
              {profile?.painAreas.includes(area) && (
                <div className="text-xs mt-1" style={{ color: "var(--warning)" }}>你的档案中已记录</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 分析结果 */}
      {advice && (
        <div className="space-y-6 animate-fade-in">
          {/* 病因分析 */}
          <div className="card">
            <h3 className="font-bold text-lg mb-2" style={{ color: "var(--danger)" }}>
              {selectedPain} — 病因分析
            </h3>
            <p className="text-sm text-text-secondary">{advice.cause}</p>
          </div>

          {/* 改善建议 */}
          <div className="card">
            <h3 className="font-bold text-lg mb-3">改善建议</h3>
            <div className="space-y-2">
              {advice.advice.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "var(--surface-hover)" }}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "var(--primary)20", color: "var(--primary)" }}>
                    {i + 1}
                  </span>
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 推荐动作 */}
          <div className="card">
            <h3 className="font-bold text-lg mb-3">推荐康复/改善动作</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advice.exercises.map((ex, i) => (
                <div key={i} className="p-4 rounded-xl text-center" style={{ background: "var(--surface-hover)" }}>
                  <div className="text-3xl mb-2">🏋️</div>
                  <div className="font-medium text-sm">{ex}</div>
                  <div className="text-xs text-text-muted mt-1">3组 × 12-15次</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3 text-center">
              这些动作强度较低，适合在正式训练前作为热身，或单独作为康复训练日进行。
              <br />
              3D 演示图和视频将在后续版本中接入。
            </p>
          </div>

          {/* 体态评估提示 */}
          <div className="p-4 rounded-xl" style={{ background: "var(--primary)08", border: "1px solid var(--primary)20" }}>
            <h4 className="font-bold text-sm mb-2" style={{ color: "var(--primary)" }}>
              体态问题与互联网资源
            </h4>
            <p className="text-sm text-text-secondary mb-2">
              很多体态问题可以通过针对性训练改善。以下是常见的体态-动作对应关系：
            </p>
            <div className="space-y-1 text-xs text-text-muted">
              <p>• 圆肩/含胸 → 面拉 + 胸椎伸展 + 菱形肌训练</p>
              <p>• 骨盆前倾 → 臀桥 + 死虫式 + 髋屈肌拉伸</p>
              <p>• 膝盖内扣 → 侧向弹力带走 + 臀中肌激活</p>
              <p>• 头前倾 → 靠墙天使 + 深层颈屈肌训练</p>
            </div>
            <p className="text-xs text-text-muted mt-3">
              后续版本将接入互联网搜索（如抖音、B站），自动推荐相关改善视频。
            </p>
          </div>
        </div>
      )}

      {/* 未选择时的提示 */}
      {!advice && (
        <div className="card text-center py-12 animate-fade-in">
          <div className="text-5xl mb-4">🩺</div>
          <h3 className="font-bold text-lg mb-2">选择不适部位查看分析</h3>
          <p className="text-sm text-text-muted">
            点击上方疼痛部位，AI 将为你分析病因并给出改善建议
          </p>
        </div>
      )}
    </div>
  );
}
