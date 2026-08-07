import { PRData, FitnessLevel, UserProfile } from '@/types';

export interface LevelAnalysis {
  selfReported: FitnessLevel;
  aiAssessed: FitnessLevel;
  match: boolean;
  score: number; // 0-100
  details: string[];
  recommendation: string;
}

/**
 * AI 智能分级评估
 * 根据用户自选级别 + PR数据 + 训练年限 + 训练频率 综合判定
 */
export function evaluateFitnessLevel(profile: UserProfile): LevelAnalysis {
  const { prData, trainingFrequency } = profile;
  const selfReported = profile.fitnessLevel;
  const details: string[] = [];
  let score = 0;

  // === 评分维度 ===

  // 1. 训练年限 (0-25分)
  const yearsScore = Math.min(prData.trainingYears / 3 * 25, 25);
  score += yearsScore;
  if (prData.trainingYears < 0.5) details.push('训练经验不足半年，属于入门阶段');
  else if (prData.trainingYears < 1) details.push('有一定训练基础，但仍在积累期');
  else if (prData.trainingYears < 2) details.push('训练1-2年，处于快速进步期');
  else details.push(`训练${prData.trainingYears}年，经验丰富`);

  // 2. 卧推相对力量 (0-25分)
  const benchRatio = prData.benchPress / profile.weight;
  const benchScore = Math.min(benchRatio / 1.5 * 25, 25);
  score += benchScore;
  if (benchRatio < 0.6) details.push(`卧推/体重比 ${benchRatio.toFixed(2)}，低于平均水平`);
  else if (benchRatio < 1.0) details.push(`卧推/体重比 ${benchRatio.toFixed(2)}，达到一般健身者水平`);
  else if (benchRatio < 1.5) details.push(`卧推/体重比 ${benchRatio.toFixed(2)}，表现优秀`);
  else details.push(`卧推/体重比 ${benchRatio.toFixed(2)}，达到高级训练者水平`);

  // 3. 深蹲相对力量 (0-25分)
  const squatRatio = prData.squat / profile.weight;
  const squatScore = Math.min(squatRatio / 2.0 * 25, 25);
  score += squatScore;
  if (squatRatio < 0.8) details.push(`深蹲/体重比 ${squatRatio.toFixed(2)}，下肢力量待提升`);
  else if (squatRatio < 1.5) details.push(`深蹲/体重比 ${squatRatio.toFixed(2)}，下肢力量良好`);
  else if (squatRatio < 2.0) details.push(`深蹲/体重比 ${squatRatio.toFixed(2)}，下肢力量优秀`);
  else details.push(`深蹲/体重比 ${squatRatio.toFixed(2)}，下肢力量非常强`);

  // 4. 训练频率 (0-25分)
  const freqScore = Math.min(trainingFrequency / 5 * 25, 25);
  score += freqScore;
  if (trainingFrequency < 2) details.push(`每周训练${trainingFrequency}次，频率偏低`);
  else if (trainingFrequency < 4) details.push(`每周训练${trainingFrequency}次，频率适中`);
  else details.push(`每周训练${trainingFrequency}次，训练频率很高`);

  // === 判定级别 ===
  let aiAssessed: FitnessLevel;
  if (score < 30) aiAssessed = 'beginner';
  else if (score < 65) aiAssessed = 'intermediate';
  else aiAssessed = 'advanced';

  const match = selfReported === aiAssessed;

  // === 生成建议 ===
  let recommendation = '';
  if (match) {
    recommendation = `自我评估与AI分析一致，确认为${getLevelName(aiAssessed)}级别。`;
  } else if (score > getLevelThreshold(selfReported) + 15) {
    recommendation = `你的实际数据优于自我评估！AI判定你已达到${getLevelName(aiAssessed)}水平，建议尝试更高强度的训练计划。`;
  } else {
    recommendation = `AI检测到你的PR数据尚未达到${getLevelName(selfReported)}的标准。为了安全起见，建议从${getLevelName(aiAssessed)}计划开始，循序渐进提升。`;
  }

  return {
    selfReported,
    aiAssessed,
    match,
    score: Math.round(score),
    details,
    recommendation,
  };
}

function getLevelName(level: FitnessLevel): string {
  const names: Record<FitnessLevel, string> = {
    beginner: '新手',
    intermediate: '进阶',
    advanced: '老手',
  };
  return names[level];
}

function getLevelThreshold(level: FitnessLevel): number {
  const thresholds: Record<FitnessLevel, number> = {
    beginner: 30,
    intermediate: 65,
    advanced: 100,
  };
  return thresholds[level];
}

/**
 * 生成饮食方案
 */
export function generateDietPlan(profile: UserProfile) {
  const { weight, height, age, gender, goalType } = profile;

  // 基础代谢率 (Mifflin-St Jeor 公式)
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  // 每日总消耗 (TDEE) - 假设中等活动量
  const tdee = bmr * 1.55;

  // 根据目标调整热量
  const calorieTarget = goalType === 'fat_loss'
    ? tdee - 500
    : goalType === 'muscle_gain'
      ? tdee + 300
      : tdee;

  // 宏量营养素
  const protein = Math.round(weight * 2);           // 蛋白质: 体重×2g
  const carbs = Math.round(weight * 3);             // 碳水: 体重×3g
  const fat = Math.round((calorieTarget - protein * 4 - carbs * 4) / 9); // 脂肪: 剩余热量

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calorieTarget: Math.round(calorieTarget),
    protein,
    carbs,
    fat: Math.max(fat, 40), // 脂肪不低于40g
    goalLabel: goalType === 'fat_loss' ? '减脂' : goalType === 'muscle_gain' ? '增肌' : '体型重塑',
    mealSuggestions: generateMealSuggestions(protein, carbs, Math.max(fat, 40)),
  };
}

function generateMealSuggestions(protein: number, carbs: number, fat: number) {
  const perMeal = {
    protein: Math.round(protein / 4),
    carbs: Math.round(carbs / 4),
    fat: Math.round(fat / 4),
  };

  return [
    {
      meal: '早餐',
      foods: [
        `${perMeal.protein}g 蛋白质：3个全蛋 + 200ml 牛奶`,
        `${perMeal.carbs}g 碳水：80g 燕麦片 + 1根香蕉`,
        `${perMeal.fat}g 脂肪：1勺花生酱`,
      ],
    },
    {
      meal: '午餐',
      foods: [
        `${perMeal.protein}g 蛋白质：150g 鸡胸肉/牛肉`,
        `${perMeal.carbs}g 碳水：200g 糙米饭 + 蔬菜`,
        `${perMeal.fat}g 脂肪：烹饪用橄榄油10ml`,
      ],
    },
    {
      meal: '训练前加餐',
      foods: [
        '1根香蕉 + 1片全麦面包',
        '可选：1勺乳清蛋白粉',
      ],
    },
    {
      meal: '训练后/晚餐',
      foods: [
        `${perMeal.protein}g 蛋白质：150g 鱼肉/虾 + 1勺蛋白粉`,
        `${perMeal.carbs}g 碳水：200g 白米饭（训练后快速补充）`,
        '大量蔬菜：西兰花、菠菜、番茄',
      ],
    },
  ];
}

/**
 * 伤病/疼痛分析建议
 */
export function getPainAdvice(painArea: string): { cause: string; advice: string[]; exercises: string[] } {
  const adviceMap: Record<string, { cause: string; advice: string[]; exercises: string[] }> = {
    '肩膀弹响': {
      cause: '肩关节弹响通常由肩袖肌群薄弱、肩胛骨稳定性不足或肩峰下空间狭窄引起。',
      advice: [
        '避免大重量过头推举动作',
        '加强肩袖肌群（外旋/内旋训练）',
        '每次训练前做肩关节热身：肩环绕 + 弹力带外旋',
        '改善胸椎活动度，减少肩关节代偿',
        '如伴随疼痛，建议就医检查是否有肩袖损伤',
      ],
      exercises: ['面拉 (Face Pull)', '弹力带肩外旋', 'YTWL 肩胛训练', '胸椎泡沫轴放松'],
    },
    '膝盖疼痛': {
      cause: '膝盖疼痛常见原因包括髌骨轨迹异常、股四头肌/腘绳肌力量不平衡、或深蹲动作模式错误。',
      advice: [
        '检查深蹲动作：膝盖是否与脚尖方向一致',
        '加强股内侧肌（VMO）：终端伸膝训练',
        '强化臀部肌群，减少膝盖代偿',
        '避免膝盖超过脚尖过多的动作',
        '训练前后充分热身和拉伸',
      ],
      exercises: ['终端伸膝 (TKE)', '臀桥', '侧向弹力带走', '靠墙静蹲'],
    },
    '腰部不适': {
      cause: '腰部不适多由核心稳定性不足、骨盆前倾、或硬拉/深蹲动作中腰部代偿引起。',
      advice: [
        '强化核心：平板支撑、死虫式、鸟狗式',
        '改善髋关节活动度，减少腰椎代偿',
        '避免大重量硬拉，改用罗马尼亚硬拉或臀推',
        '日常注意坐姿，避免久坐',
        '训练时使用举重腰带保护',
      ],
      exercises: ['平板支撑', '死虫式 (Dead Bug)', '鸟狗式 (Bird Dog)', '臀桥', '猫牛式拉伸'],
    },
    '手腕疼痛': {
      cause: '手腕疼痛通常由卧推/推举时手腕过度伸展、握力不足或三角纤维软骨复合体(TFCC)损伤引起。',
      advice: [
        '卧推时保持手腕中立位，不要过度后仰',
        '使用护腕提供支撑',
        '加强前臂和握力训练',
        '减少大重量推类动作的频率',
        '尝试中立握（对握）减少手腕压力',
      ],
      exercises: ['腕屈伸训练', '农夫行走', '中立握哑铃卧推', '前臂拉伸'],
    },
  };

  return adviceMap[painArea] || {
    cause: '未识别的疼痛部位，建议详细描述症状以便获得更精准的建议。',
    advice: ['建议咨询专业医生或物理治疗师', '暂时避免引起疼痛的动作', '记录疼痛出现的动作和强度'],
    exercises: ['轻度拉伸', '泡沫轴放松'],
  };
}
