"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProfile, Gender, FitnessLevel, GoalType, PRData } from "@/types";
import { getAgeGroup } from "@/lib/themes";
import { evaluateFitnessLevel } from "@/lib/aiEvaluator";

const STORAGE_KEY = "builder_profile";

const STEPS = ["基本信息", "训练数据", "目标设定", "AI 分析"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: 25,
    gender: "male" as Gender,
    height: 175,
    weight: 70,
    benchPress: 60,
    squat: 80,
    deadlift: 100,
    trainingYears: 1,
    trainingFrequency: 3,
    targetWeight: 70,
    goalType: "muscle_gain" as GoalType,
    selfLevel: "beginner" as FitnessLevel,
    painAreas: [] as string[],
    painDescription: "",
  });

  const updateField = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    const ageGroup = getAgeGroup(formData.age);
    const profile: UserProfile = {
      age: formData.age,
      gender: formData.gender,
      ageGroup,
      height: formData.height,
      weight: formData.weight,
      targetWeight: formData.targetWeight,
      goalType: formData.goalType,
      fitnessLevel: formData.selfLevel,
      prData: {
        benchPress: formData.benchPress,
        squat: formData.squat,
        deadlift: formData.deadlift,
        trainingYears: formData.trainingYears,
      },
      trainingFrequency: formData.trainingFrequency,
      painAreas: formData.painAreas,
      painDescription: formData.painDescription,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    router.push("/");
  };

  const canProceed = () => {
    if (step === 0) return formData.age >= 14 && formData.age <= 80 && formData.height > 0 && formData.weight > 0;
    if (step === 1) return formData.trainingFrequency > 0; // 只需要训练次数
    if (step === 2) return formData.targetWeight > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* 进度条 */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: i <= step ? "var(--gradient)" : "var(--surface)",
                    color: i <= step ? "white" : "var(--text-muted)",
                    border: i <= step ? "none" : "1px solid var(--border)",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i <= step ? "text-text" : "text-text-muted"}`}>{s}</span>
                {i < STEPS.length - 1 && (
                  <div className="w-8 h-0.5 mx-1" style={{ background: i < step ? "var(--primary)" : "var(--border)" }} />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-center">{STEPS[step]}</h2>
        </div>

        {/* 步骤内容 */}
        <div className="card animate-fade-in" key={step}>
          {step === 0 && <Step1Basic formData={formData} updateField={updateField} />}
          {step === 1 && <Step2PR formData={formData} updateField={updateField} />}
          {step === 2 && <Step3Goal formData={formData} updateField={updateField} />}
          {step === 3 && <Step4Analysis formData={formData} />}
        </div>

        {/* 导航按钮 */}
        <div className="flex gap-4 mt-6">
          {step > 0 && (
            <button onClick={handleBack} className="btn-secondary flex-1">
              ← 上一步
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-primary flex-1"
          >
            {step === STEPS.length - 1 ? "完成并进入 →" : "下一步 →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ Step 1: 基本信息 ============
function Step1Basic({ formData, updateField }: {
  formData: { age: number; gender: Gender; height: number; weight: number; painAreas: string[] };
  updateField: any;
}) {
  return (
    <div className="space-y-5">
      {/* 性别选择 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">性别</label>
        <div className="grid grid-cols-2 gap-3">
          {(["male", "female"] as Gender[]).map(g => (
            <button
              key={g}
              onClick={() => updateField("gender", g)}
              className="py-3 rounded-xl font-medium transition-all"
              style={{
                background: formData.gender === g ? "var(--gradient)" : "var(--surface-hover)",
                color: formData.gender === g ? "white" : "var(--text-secondary)",
                border: formData.gender === g ? "none" : "1px solid var(--border)",
              }}
            >
              {g === "male" ? "♂ 男" : "♀ 女"}
            </button>
          ))}
        </div>
      </div>

      {/* 年龄 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">年龄</label>
        <NumInput
          value={formData.age}
          onChange={v => updateField("age", v)}
          placeholder="输入年龄"
          min={14}
          max={80}
        />
        <p className="text-xs text-text-muted mt-1">
          {formData.age <= 30 ? "年轻活力期" : formData.age <= 45 ? "成熟稳定期" : "经验积累期"}
        </p>
      </div>

      {/* 身高体重 */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">身高 (cm)</label>
          <NumInput
            value={formData.height}
            onChange={v => updateField("height", v)}
            placeholder="175"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">体重 (kg)</label>
          <NumInput
            value={formData.weight}
            onChange={v => updateField("weight", v)}
            placeholder="70"
          />
        </div>
      </div>
    </div>
  );
}

// ============ 伤病描述自动归类 ============
function categorizePain(description: string): string[] {
  const text = description.toLowerCase();
  const categories: { keywords: string[]; label: string }[] = [
    { keywords: ['肩', '肩膀', '弹响', '圆肩', '高低肩', '肩颈', '脖子', '颈椎', '斜方'], label: '肩膀弹响' },
    { keywords: ['膝', '膝盖', '腿', '蹲', '髌骨', '半月板'], label: '膝盖疼痛' },
    { keywords: ['腰', '腰椎', '下背', '屁股', '臀', '骨盆', '前倾'], label: '腰部不适' },
    { keywords: ['手腕', '手', '握', '前臂', '肘', '手肘', '网球肘'], label: '手腕疼痛' },
    { keywords: ['胸', '含胸', '驼背', '背', '脊柱', '侧弯'], label: '腰部不适' },
    { keywords: ['踝', '脚', '足', '跟腱', '小腿', '抽筋'], label: '膝盖疼痛' },
  ];
  const matched = new Set<string>();
  for (const cat of categories) {
    if (cat.keywords.some(k => text.includes(k))) {
      matched.add(cat.label);
    }
  }
  return Array.from(matched);
}

// ============ Step 2: 训练数据 ============
function Step2PR({ formData, updateField }: {
  formData: { benchPress: number; squat: number; deadlift: number; trainingYears: number; trainingFrequency: number; selfLevel: FitnessLevel; weight: number; painAreas: string[]; painDescription: string };
  updateField: any;
}) {
  const levels: { value: FitnessLevel; label: string; desc: string; slogan: string }[] = [
    { value: "beginner", label: "新手", desc: "刚开始健身 / 不到1年", slogan: "每个大佬都曾是小白，从今天开始蜕变 🐣" },
    { value: "intermediate", label: "进阶", desc: "有1-3年训练经验", slogan: "过了新手村，该上强度了 " },
    { value: "advanced", label: "老手", desc: "3年以上系统训练", slogan: "那还说啥了，开干！🔥" },
  ];

  const isBeginner = formData.selfLevel === "beginner";

  const handlePainDescChange = (val: string) => {
    updateField("painDescription", val);
    // 实时自动归类
    const categorized = categorizePain(val);
    updateField("painAreas", categorized);
  };

  const handleVoiceInput = () => {
    // 使用浏览器 Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("你的浏览器不支持语音输入，请使用 Chrome 或 Edge");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "zh-CN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const newDesc = formData.painDescription ? formData.painDescription + " " + transcript : transcript;
      handlePainDescChange(newDesc);
    };
    recognition.start();
  };

  return (
    <div className="space-y-5">
      {/* 自我评估 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">你觉得自己是什么水平？</label>
        <div className="grid grid-cols-3 gap-2">
          {levels.map(l => (
            <div key={l.value}>
              <button
                onClick={() => updateField("selfLevel", l.value)}
                className="w-full py-3 px-2 rounded-xl text-center transition-all"
                style={{
                  background: formData.selfLevel === l.value ? "var(--gradient)" : "var(--surface-hover)",
                  color: formData.selfLevel === l.value ? "white" : "var(--text-secondary)",
                  border: formData.selfLevel === l.value ? "none" : "1px solid var(--border)",
                }}
              >
                <div className="font-bold text-sm">{l.label}</div>
                <div className="text-xs mt-0.5 opacity-70">{l.desc}</div>
              </button>
              <p className="text-[10px] text-text-muted text-center mt-1.5 leading-tight px-1">
                {l.slogan}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 进阶/老手才显示 PR 数据 */}
      {!isBeginner && (
        <>
          <p className="text-sm text-text-secondary">
            填写你的个人最佳成绩（PR），AI 将据此评估你的真实训练水平。
            <br />
            <span className="text-text-muted">如果不确定，填0即可。</span>
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "benchPress" as const, label: "卧推", unit: "kg" },
              { key: "squat" as const, label: "深蹲", unit: "kg" },
              { key: "deadlift" as const, label: "硬拉", unit: "kg" },
            ].map(item => (
              <div key={item.key}>
                <label className="block text-xs text-text-muted mb-1">{item.label}</label>
                <div className="relative">
                  <NumInput
                    value={(formData as any)[item.key]}
                    onChange={v => updateField(item.key, v)}
                    placeholder="0"
                    className="text-center"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">{item.unit}</span>
                </div>
                {formData.weight > 0 && (formData as any)[item.key] > 0 && (
                  <p className="text-xs text-primary text-center mt-1">
                    ×{((formData as any)[item.key] / formData.weight).toFixed(2)} 体重比
                  </p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">训练年限</label>
            <NumInput
              value={formData.trainingYears}
              onChange={v => updateField("trainingYears", v)}
              placeholder="1"
              step={0.5}
            />
            <p className="text-xs text-text-muted mt-1">年</p>
          </div>
        </>
      )}

      {/* 所有人都显示：每周训练次数 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">目标每周训练次数</label>
        <NumInput
          value={formData.trainingFrequency}
          onChange={v => updateField("trainingFrequency", v)}
          placeholder="3"
          min={0}
          max={7}
        />
        <p className="text-xs text-text-muted mt-1">次/周</p>
      </div>

      {/* 伤病描述 — 文本+语音输入 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          身体有没有不舒服的地方？
          <span className="text-text-muted font-normal ml-1">（用你自己的话描述就行）</span>
        </label>
        <div className="relative">
          <textarea
            value={formData.painDescription}
            onChange={e => handlePainDescChange(e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="比如：我左边肩膀举起来会响，有时候蹲久了膝盖有点疼..."
          />
          <button
            onClick={handleVoiceInput}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all"
            style={{ background: "var(--primary)20", color: "var(--primary)" }}
            title="语音输入"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-text-muted mt-1">
          点击 🎤 可以语音输入，也可以直接打字。AI 会自动理解你的描述。
        </p>
        {/* 自动归类预览 */}
        {formData.painAreas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-xs text-text-muted">AI 识别到：</span>
            {formData.painAreas.map(area => (
              <span key={area} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--warning)15", color: "var(--warning)" }}>
                {area}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ Step 3: 目标设定 ============
function Step3Goal({ formData, updateField }: {
  formData: { targetWeight: number; goalType: GoalType; weight: number };
  updateField: any;
}) {
  const goals: { value: GoalType; label: string; icon: string; desc: string }[] = [
    { value: "muscle_gain", label: "增肌", icon: "", desc: "增加肌肉量和力量" },
    { value: "fat_loss", label: "减脂", icon: "🔥", desc: "降低体脂率，保留肌肉" },
    { value: "recomp", label: "体型重塑", icon: "⚡", desc: "同时增肌减脂" },
  ];

  const weightDiff = formData.targetWeight - formData.weight;

  return (
    <div className="space-y-5">
      {/* 目标类型 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">你的目标是？</label>
        <div className="grid grid-cols-3 gap-3">
          {goals.map(g => (
            <button
              key={g.value}
              onClick={() => updateField("goalType", g.value)}
              className="py-4 px-2 rounded-xl text-center transition-all"
              style={{
                background: formData.goalType === g.value ? "var(--gradient)" : "var(--surface-hover)",
                color: formData.goalType === g.value ? "white" : "var(--text-secondary)",
                border: formData.goalType === g.value ? "none" : "1px solid var(--border)",
              }}
            >
              <div className="text-2xl mb-1">{g.icon}</div>
              <div className="font-bold text-sm">{g.label}</div>
              <div className="text-xs mt-0.5 opacity-70">{g.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 目标体重 */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">目标体重 (kg)</label>
        <NumInput
          value={formData.targetWeight}
          onChange={v => updateField("targetWeight", v)}
          placeholder={String(formData.weight)}
        />
        {formData.targetWeight > 0 && formData.weight > 0 && (
          <div className="mt-2 p-3 rounded-lg" style={{ background: "var(--surface-hover)" }}>
            <p className="text-sm">
              {weightDiff > 0 ? (
                <span style={{ color: "var(--success)" }}>需要增重 {weightDiff.toFixed(1)}kg</span>
              ) : weightDiff < 0 ? (
                <span style={{ color: "var(--warning)" }}>需要减重 {Math.abs(weightDiff).toFixed(1)}kg</span>
              ) : (
                <span style={{ color: "var(--primary)" }}>体重维持不变，专注体型改善</span>
              )}
            </p>
            <p className="text-xs text-text-muted mt-1">
              建议每月变化不超过体重的 2-3%，健康可持续
            </p>
          </div>
        )}
      </div>

      {/* 过度训练警示 */}
      <div className="p-4 rounded-xl border border-warning/30" style={{ background: "var(--warning)08" }}>
        <h4 className="font-bold text-sm mb-2" style={{ color: "var(--warning)" }}>
          ⚠️ 过度训练警示：皮质醇爆炸
        </h4>
        <p className="text-xs text-text-secondary mb-2">
          有氧和无氧训练量同时过大时，皮质醇（压力激素）持续升高会导致：
        </p>
        <ul className="text-xs text-text-muted space-y-1">
          <li>• 肌肉分解加速，增肌效果适得其反</li>
          <li>• 免疫力下降，容易感冒生病</li>
          <li>• 睡眠质量恶化，恢复能力下降</li>
          <li>• 关节和肌腱受伤风险显著增加</li>
        </ul>
        <p className="text-xs text-text-secondary mt-2">
          Builder 会根据你的目标自动平衡有氧和无氧训练量，避免过度训练。
        </p>
      </div>
    </div>
  );
}

// ============ Step 4: AI 分析结果 ============
function Step4Analysis({ formData }: {
  formData: { age: number; gender: Gender; height: number; weight: number; benchPress: number; squat: number; deadlift: number; trainingYears: number; trainingFrequency: number; selfLevel: FitnessLevel; targetWeight: number; goalType: GoalType; painAreas: string[]; painDescription: string };
}) {
  const profile: UserProfile = {
    age: formData.age,
    gender: formData.gender,
    ageGroup: getAgeGroup(formData.age),
    height: formData.height,
    weight: formData.weight,
    targetWeight: formData.targetWeight,
    goalType: formData.goalType,
    fitnessLevel: formData.selfLevel,
    prData: {
      benchPress: formData.benchPress,
      squat: formData.squat,
      deadlift: formData.deadlift,
      trainingYears: formData.trainingYears,
    },
    trainingFrequency: formData.trainingFrequency,
    painAreas: formData.painAreas,
      painDescription: formData.painDescription,
    };

    const analysis = evaluateFitnessLevel(profile);
  const levelNames: Record<FitnessLevel, string> = { beginner: "新手", intermediate: "进阶", advanced: "老手" };

  return (
    <div className="space-y-5">
      {/* AI 评分 */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-3"
          style={{ background: "var(--gradient)" }}>
          <span className="text-3xl font-bold text-white">{analysis.score}</span>
        </div>
        <h3 className="text-lg font-bold">AI 综合评分</h3>
        <p className="text-sm text-text-muted">基于 PR 数据、训练年限和频率的综合评估</p>
      </div>

      {/* 级别对比 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl text-center" style={{ background: "var(--surface-hover)" }}>
          <div className="text-xs text-text-muted mb-1">自我评估</div>
          <div className="text-xl font-bold">{levelNames[analysis.selfReported]}</div>
        </div>
        <div className="p-4 rounded-xl text-center" style={{
          background: analysis.match ? "var(--success)15" : "var(--warning)15",
          border: `1px solid ${analysis.match ? "var(--success)" : "var(--warning)"}`,
        }}>
          <div className="text-xs text-text-muted mb-1">AI 判定</div>
          <div className="text-xl font-bold" style={{ color: analysis.match ? "var(--success)" : "var(--warning)" }}>
            {levelNames[analysis.aiAssessed]}
          </div>
        </div>
      </div>

      {/* 分析详情 */}
      <div className="space-y-2">
        {analysis.details.map((detail, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-0.5">•</span>
            <span className="text-text-secondary">{detail}</span>
          </div>
        ))}
      </div>

      {/* 建议 */}
      <div className="p-4 rounded-xl" style={{ background: "var(--primary)08", border: "1px solid var(--primary)30" }}>
        <p className="text-sm" style={{ color: "var(--primary)" }}>
          {analysis.recommendation}
        </p>
      </div>

      {/* 疼痛提示 */}
      {formData.painDescription && (
        <div className="p-4 rounded-xl" style={{ background: "var(--danger)08", border: "1px solid var(--danger)30" }}>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--danger)" }}>
            你描述的身体不适：
          </p>
          <p className="text-sm text-text-secondary mb-2">
            “{formData.painDescription}”
          </p>
          {formData.painAreas.length > 0 && (
            <>
              <p className="text-xs text-text-muted mb-1">AI 已归类为：</p>
              <div className="flex flex-wrap gap-1.5">
                {formData.painAreas.map(area => (
                  <span key={area} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--warning)15", color: "var(--warning)" }}>
                    {area}
                  </span>
                ))}
              </div>
            </>
          )}
          <p className="text-xs text-text-muted mt-2">
            训练计划将自动为你推荐针对性改善动作，并在训练页面置顶显示。
          </p>
        </div>
      )}
    </div>
  );
}

// ============ 可完全清空的数字输入框 ============
function NumInput({
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  className = "",
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const [raw, setRaw] = useState(value === 0 ? "" : String(value));

  // 当外部 value 变化时同步（比如从其他步骤返回）
  useEffect(() => {
    setRaw(value === 0 ? "" : String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRaw(val);
    // 允许空字符串（用户正在删除）
    if (val === "") {
      onChange(0);
      return;
    }
    const num = step && step < 1 ? parseFloat(val) : parseInt(val);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    // 失焦时如果为空则设为 0
    if (raw === "") {
      setRaw("0");
      onChange(0);
    }
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={raw}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`input-field ${className}`}
      placeholder={placeholder}
      min={min}
      max={max}
    />
  );
}
