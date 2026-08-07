"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme, UserSettings } from "@/components/ThemeProvider";
import { themes } from "@/lib/themes";
import { ThemeKey } from "@/types";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, settings, updateSettings } = useTheme();
  const [bgColor, setBgColor] = useState(settings.customBackground || theme.background);
  const [primaryColor, setPrimaryColor] = useState(settings.customPrimary || theme.primary);

  const densityOptions = [
    { value: "compact" as const, label: "紧凑", desc: "信息密度高，适合大屏" },
    { value: "normal" as const, label: "标准", desc: "默认排版，舒适阅读" },
    { value: "spacious" as const, label: "宽松", desc: "大间距，呼吸感强" },
  ];

  const cardOptions = [
    { value: "rounded" as const, label: "圆润", desc: "主题默认圆角" },
    { value: "sharp" as const, label: "硬朗", desc: "直角风格，更专业" },
    { value: "soft" as const, label: "柔和", desc: "大圆角，更温暖" },
  ];

  const handleReset = () => {
    setBgColor(theme.background);
    setPrimaryColor(theme.primary);
    updateSettings({ customBackground: undefined, customPrimary: undefined });
  };

  const handleBgChange = (color: string) => {
    setBgColor(color);
    updateSettings({ customBackground: color === theme.background ? undefined : color });
  };

  const handlePrimaryChange = (color: string) => {
    setPrimaryColor(color);
    updateSettings({ customPrimary: color === theme.primary ? undefined : color });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", padding: "var(--card-padding, 24px)" }}>
      <div className="max-w-lg mx-auto">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="text-2xl" style={{ color: "var(--text)" }}>
            ←
          </button>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>设置</h1>
          <button onClick={handleReset} className="text-sm" style={{ color: "var(--primary)" }}>
            重置默认
          </button>
        </div>

        {/* 当前主题预览 */}
        <div className="card mb-6" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: 60, height: 60, borderRadius: "50%",
              background: theme.gradient,
              border: "3px solid var(--border)",
            }}
          />
          <div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>当前主题</div>
            <div className="font-bold" style={{ color: "var(--text)" }}>
              {theme.primary === "#00D4FF" ? "男性 · 青年" :
               theme.primary === "#4A90D9" ? "男性 · 中年" :
               theme.primary === "#6B8F71" ? "男性 · 成熟" :
               theme.primary === "#F472B6" ? "女性 · 青年" :
               theme.primary === "#E8A0BF" ? "女性 · 中年" : "女性 · 成熟"}
            </div>
          </div>
        </div>

        {/* 背景颜色 */}
        <div className="setting-section">
          <h3>背景颜色</h3>
          <div className="card">
            <div className="color-picker-wrap">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => handleBgChange(e.target.value)}
              />
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>自定义背景</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  当前：{bgColor}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主题色 */}
        <div className="setting-section">
          <h3>主题色</h3>
          <div className="card">
            <div className="color-picker-wrap">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => handlePrimaryChange(e.target.value)}
              />
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>自定义主题色</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  当前：{primaryColor}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 排版密度 */}
        <div className="setting-section">
          <h3>排版密度</h3>
          {densityOptions.map((opt) => (
            <div
              key={opt.value}
              className={`setting-option ${settings.layoutDensity === opt.value ? "active" : ""}`}
              onClick={() => updateSettings({ layoutDensity: opt.value })}
            >
              <div>
                <div className="font-medium" style={{ color: "var(--text)" }}>{opt.label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{opt.desc}</div>
              </div>
              {settings.layoutDensity === opt.value && (
                <span style={{ color: "var(--primary)", fontSize: "18px" }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {/* 卡片风格 */}
        <div className="setting-section">
          <h3>卡片风格</h3>
          {cardOptions.map((opt) => (
            <div
              key={opt.value}
              className={`setting-option ${settings.cardStyle === opt.value ? "active" : ""}`}
              onClick={() => updateSettings({ cardStyle: opt.value })}
            >
              <div>
                <div className="font-medium" style={{ color: "var(--text)" }}>{opt.label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{opt.desc}</div>
              </div>
              {settings.cardStyle === opt.value && (
                <span style={{ color: "var(--primary)", fontSize: "18px" }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {/* 重置档案 */}
        <div className="setting-section" style={{ marginTop: "40px" }}>
          <button
            className="btn-secondary"
            style={{ width: "100%", color: "var(--danger)", borderColor: "var(--danger)" }}
            onClick={() => {
              if (confirm("确定要重置所有数据吗？这将清除你的档案和设置。")) {
                localStorage.clear();
                router.push("/");
              }
            }}
          >
            重置所有数据
          </button>
        </div>
      </div>
    </div>
  );
}
