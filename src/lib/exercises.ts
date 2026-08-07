import { Exercise, TrainingPlan, FitnessLevel } from '@/types';

// ============ 动作数据库 ============
export const exerciseDatabase: Exercise[] = [
  // ===== 胸部 =====
  {
    id: 'bench_press',
    name: '杠铃卧推',
    nameEn: 'Barbell Bench Press',
    muscleGroup: '胸部',
    subMuscle: '整体胸大肌',
    equipment: '杠铃',
    difficulty: 'intermediate',
    sets: 4,
    reps: '6-10',
    description: '经典复合动作，全面刺激胸大肌，同时锻炼三角肌前束和肱三头肌。',
    tips: '肩胛骨收紧下沉，杠铃下放至乳头连线位置，推起时呼气。',
    imagePlaceholder: '/exercises/bench_press.png',
  },
  {
    id: 'incline_dumbbell_press',
    name: '上斜哑铃卧推',
    nameEn: 'Incline Dumbbell Press',
    muscleGroup: '胸部',
    subMuscle: '上束',
    equipment: '哑铃 + 上斜凳',
    difficulty: 'intermediate',
    sets: 3,
    reps: '8-12',
    description: '30-45度上斜角度，重点刺激胸大肌上束，打造饱满上胸。',
    tips: '角度不宜超过45度，否则三角肌前束代偿过多。',
    imagePlaceholder: '/exercises/incline_press.png',
  },
  {
    id: 'cable_fly_low',
    name: '低位绳索夹胸',
    nameEn: 'Low Cable Fly',
    muscleGroup: '胸部',
    subMuscle: '上束',
    equipment: '绳索机',
    difficulty: 'beginner',
    sets: 3,
    reps: '12-15',
    description: '从下往上夹胸，重点刺激上胸内侧，塑造胸肌中缝。',
    tips: '手肘微屈固定，想象用肘部画弧线向上合拢。',
    imagePlaceholder: '/exercises/cable_fly_low.png',
  },
  {
    id: 'flat_dumbbell_fly',
    name: '平板哑铃飞鸟',
    nameEn: 'Flat Dumbbell Fly',
    muscleGroup: '胸部',
    subMuscle: '中束',
    equipment: '哑铃',
    difficulty: 'beginner',
    sets: 3,
    reps: '12-15',
    description: '孤立动作，充分拉伸胸大肌中部纤维，增加胸肌宽度。',
    tips: '下放时感受胸肌拉伸，不要过度下放以免肩关节受伤。',
    imagePlaceholder: '/exercises/dumbbell_fly.png',
  },
  {
    id: 'decline_pushup',
    name: '下斜俯卧撑',
    nameEn: 'Decline Push-up',
    muscleGroup: '胸部',
    subMuscle: '下束',
    equipment: '自重',
    difficulty: 'beginner',
    sets: 3,
    reps: '12-20',
    description: '脚部抬高，重心前移，重点刺激胸大肌下束。',
    tips: '身体保持一条直线，核心收紧，下落至胸部接近地面。',
    imagePlaceholder: '/exercises/decline_pushup.png',
  },
  {
    id: 'dips',
    name: '双杠臂屈伸',
    nameEn: 'Parallel Bar Dips',
    muscleGroup: '胸部',
    subMuscle: '下束',
    equipment: '双杠',
    difficulty: 'intermediate',
    sets: 3,
    reps: '8-12',
    description: '身体前倾做臂屈伸，重点刺激胸大肌下束和外沿。',
    tips: '身体前倾约30度，肘部向外展开，下落至大臂平行地面。',
    imagePlaceholder: '/exercises/dips.png',
  },
  // ===== 背部 =====
  {
    id: 'pull_up',
    name: '引体向上',
    nameEn: 'Pull-up',
    muscleGroup: '背部',
    subMuscle: '背阔肌',
    equipment: '单杠',
    difficulty: 'intermediate',
    sets: 4,
    reps: '6-10',
    description: '经典自重复合动作，全面刺激背阔肌，打造V型背部。',
    tips: '正握宽握距，下拉时想象用肘部触碰腰部两侧。',
    imagePlaceholder: '/exercises/pull_up.png',
  },
  {
    id: 'barbell_row',
    name: '杠铃划船',
    nameEn: 'Barbell Row',
    muscleGroup: '背部',
    subMuscle: '中背部',
    equipment: '杠铃',
    difficulty: 'intermediate',
    sets: 4,
    reps: '8-10',
    description: '俯身杠铃划船，全面刺激中背部厚度，包括斜方肌中下束和菱形肌。',
    tips: '背部保持平直，杠铃沿大腿拉向腹部，顶峰收缩1秒。',
    imagePlaceholder: '/exercises/barbell_row.png',
  },
  {
    id: 'lat_pulldown',
    name: '高位下拉',
    nameEn: 'Lat Pulldown',
    muscleGroup: '背部',
    subMuscle: '背阔肌',
    equipment: '下拉机',
    difficulty: 'beginner',
    sets: 3,
    reps: '10-12',
    description: '引体向上的器械替代动作，适合新手建立背部发力感。',
    tips: '宽握，下拉至锁骨位置，感受背阔肌收缩。',
    imagePlaceholder: '/exercises/lat_pulldown.png',
  },
  {
    id: 'seated_row',
    name: '坐姿绳索划船',
    nameEn: 'Seated Cable Row',
    muscleGroup: '背部',
    subMuscle: '中背部',
    equipment: '绳索机',
    difficulty: 'beginner',
    sets: 3,
    reps: '10-12',
    description: '坐姿划船动作，重点刺激中背部厚度，改善圆肩体态。',
    tips: '挺胸收腹，拉回时肩骨后缩夹紧。',
    imagePlaceholder: '/exercises/seated_row.png',
  },
  // ===== 腿部 =====
  {
    id: 'barbell_squat',
    name: '杠铃深蹲',
    nameEn: 'Barbell Squat',
    muscleGroup: '腿部',
    subMuscle: '股四头肌/臀大肌',
    equipment: '杠铃',
    difficulty: 'advanced',
    sets: 4,
    reps: '6-10',
    description: '力量训练之王，全面刺激下肢肌群，促进全身激素分泌。',
    tips: '脚尖微外八，膝盖与脚尖方向一致，蹲至大腿低于平行线。',
    imagePlaceholder: '/exercises/barbell_squat.png',
  },
  {
    id: 'leg_press',
    name: '腿举',
    nameEn: 'Leg Press',
    muscleGroup: '腿部',
    subMuscle: '股四头肌',
    equipment: '腿举机',
    difficulty: 'beginner',
    sets: 4,
    reps: '10-12',
    description: '深蹲的器械替代，对腰部压力更小，适合新手和伤病恢复期。',
    tips: '脚距与肩同宽，膝盖不要内扣，下放至90度。',
    imagePlaceholder: '/exercises/leg_press.png',
  },
  {
    id: 'romanian_deadlift',
    name: '罗马尼亚硬拉',
    nameEn: 'Romanian Deadlift',
    muscleGroup: '腿部',
    subMuscle: '绳肌/臀部',
    equipment: '杠铃',
    difficulty: 'intermediate',
    sets: 3,
    reps: '8-12',
    description: '重点刺激腘绳肌和臀大肌，改善臀腿比例。',
    tips: '微屈膝，杠铃沿腿部下放，感受大腿后侧拉伸。',
    imagePlaceholder: '/exercises/romanian_deadlift.png',
  },
  {
    id: 'leg_curl',
    name: '俯卧腿弯举',
    nameEn: 'Lying Leg Curl',
    muscleGroup: '腿部',
    subMuscle: '腘绳肌',
    equipment: '腿弯举机',
    difficulty: 'beginner',
    sets: 3,
    reps: '12-15',
    description: '孤立动作，专注刺激腘绳肌，预防膝盖受伤。',
    tips: '动作缓慢控制，顶峰收缩1-2秒。',
    imagePlaceholder: '/exercises/leg_curl.png',
  },
  // ===== 肩部 =====
  {
    id: 'overhead_press',
    name: '杠铃推举',
    nameEn: 'Overhead Press',
    muscleGroup: '肩部',
    subMuscle: '三角肌前束/中束',
    equipment: '杠铃',
    difficulty: 'intermediate',
    sets: 4,
    reps: '6-10',
    description: '经典肩部复合动作，打造宽厚肩膀。',
    tips: '核心收紧，杠铃从锁骨推至头顶正上方，不要过度后仰。',
    imagePlaceholder: '/exercises/overhead_press.png',
  },
  {
    id: 'lateral_raise',
    name: '哑铃侧平举',
    nameEn: 'Dumbbell Lateral Raise',
    muscleGroup: '肩部',
    subMuscle: '三角肌中束',
    equipment: '哑铃',
    difficulty: 'beginner',
    sets: 4,
    reps: '12-15',
    description: '孤立动作，重点刺激三角肌中束，增加肩宽视觉效果。',
    tips: '手肘微屈，想象倒水动作，不要耸肩。',
    imagePlaceholder: '/exercises/lateral_raise.png',
  },
  {
    id: 'face_pull',
    name: '面拉',
    nameEn: 'Face Pull',
    muscleGroup: '肩部',
    subMuscle: '三角肌后束',
    equipment: '绳索机',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '刺激三角肌后束和肩袖肌群，改善圆肩体态的必做动作。',
    tips: '绳索调至面部高度，拉向面部，外旋肩关节。',
    imagePlaceholder: '/exercises/face_pull.png',
  },
  // ===== 手臂 =====
  {
    id: 'barbell_curl',
    name: '杠铃弯举',
    nameEn: 'Barbell Curl',
    muscleGroup: '手臂',
    subMuscle: '肱二头肌',
    equipment: '杠铃',
    difficulty: 'beginner',
    sets: 3,
    reps: '10-12',
    description: '经典二头肌训练动作，增加手臂围度。',
    tips: '大臂固定不动，只动前臂，不要借力甩起。',
    imagePlaceholder: '/exercises/barbell_curl.png',
  },
  {
    id: 'tricep_pushdown',
    name: '绳索下压',
    nameEn: 'Tricep Pushdown',
    muscleGroup: '手臂',
    subMuscle: '肱三头肌',
    equipment: '绳索机',
    difficulty: 'beginner',
    sets: 3,
    reps: '12-15',
    description: '孤立刺激肱三头肌，手臂占手臂体积的2/3，不可忽视。',
    tips: '大臂贴紧身体，只动前臂，下压至手臂完全伸直。',
    imagePlaceholder: '/exercises/tricep_pushdown.png',
  },
  // ===== 核心 =====
  {
    id: 'plank',
    name: '平板支撑',
    nameEn: 'Plank',
    muscleGroup: '核心',
    subMuscle: '腹横肌',
    equipment: '自重',
    difficulty: 'beginner',
    sets: 3,
    reps: '30-60秒',
    description: '等长收缩动作，强化核心稳定性，保护腰椎。',
    tips: '身体呈一条直线，不要塌腰或撅臀，收紧腹部和臀部。',
    imagePlaceholder: '/exercises/plank.png',
  },
  {
    id: 'cable_crunch',
    name: '绳索卷腹',
    nameEn: 'Cable Crunch',
    muscleGroup: '核心',
    subMuscle: '腹直肌',
    equipment: '绳索机',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '负重卷腹动作，有效刺激腹直肌，打造六块腹肌。',
    tips: '用腹部力量卷曲身体，不是用手臂拉绳索。',
    imagePlaceholder: '/exercises/cable_crunch.png',
  },
  // ===== 康复/体态改善动作 =====
  {
    id: 'face_pull_rehab',
    name: '面拉',
    nameEn: 'Face Pull',
    muscleGroup: '肩部',
    subMuscle: '三角肌后束/肩袖',
    equipment: '绳索机',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '改善圆肩/高低肩的王牌动作，强化肩袖肌群和菱形肌，恢复肩胛骨正常位置。',
    tips: '绳索调至面部高度，拉向面部时外旋肩关节，感受肩胛骨后缩。',
    imagePlaceholder: '/exercises/face_pull.png',
    isRehab: true,
    targetPain: '肩膀弹响',
  },
  {
    id: 'band_external_rotation',
    name: '弹力带肩外旋',
    nameEn: 'Band External Rotation',
    muscleGroup: '肩部',
    subMuscle: '肩袖肌群',
    equipment: '弹力带',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '专门强化肩袖肌群，解决肩膀弹响和不稳定的问题。',
    tips: '大臂贴紧身体，只动前臂向外旋转，动作要慢。',
    imagePlaceholder: '/exercises/band_external_rotation.png',
    isRehab: true,
    targetPain: '肩膀弹响',
  },
  {
    id: 'ytwl',
    name: 'YTWL 肩胛训练',
    nameEn: 'YTWL Scapular Exercise',
    muscleGroup: '背部',
    subMuscle: '菱形肌/斜方肌中下束',
    equipment: '自重/轻哑铃',
    difficulty: 'beginner',
    sets: 2,
    reps: '每个字母10次',
    description: '俯身做 Y/T/W/L 四个字母形状，全面激活肩胛稳定肌群，改善高低肩和圆肩。',
    tips: '用极轻重量或徒手，重点是感受肩胛骨的收缩和控制。',
    imagePlaceholder: '/exercises/ytwl.png',
    isRehab: true,
    targetPain: '肩膀弹响',
  },
  {
    id: 'tke',
    name: '终端伸膝',
    nameEn: 'Terminal Knee Extension',
    muscleGroup: '腿部',
    subMuscle: '股内侧肌(VMO)',
    equipment: '弹力带',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '强化股内侧肌，稳定髌骨轨迹，解决膝盖疼痛和弹响。',
    tips: '弹力带固定在膝后，从微屈到完全伸直，最后5度最关键。',
    imagePlaceholder: '/exercises/tke.png',
    isRehab: true,
    targetPain: '膝盖疼痛',
  },
  {
    id: 'glute_bridge_rehab',
    name: '臀桥',
    nameEn: 'Glute Bridge',
    muscleGroup: '腿部',
    subMuscle: '臀大肌',
    equipment: '自重',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '激活臀大肌，稳定骨盆，缓解腰部代偿性疼痛。',
    tips: '顶峰收缩时夹紧臀部，不要用腰部发力顶起。',
    imagePlaceholder: '/exercises/glute_bridge.png',
    isRehab: true,
    targetPain: '腰部不适',
  },
  {
    id: 'dead_bug',
    name: '死虫式',
    nameEn: 'Dead Bug',
    muscleGroup: '核心',
    subMuscle: '腹横肌/深层核心',
    equipment: '自重',
    difficulty: 'beginner',
    sets: 3,
    reps: '每侧10次',
    description: '最安全的深层核心训练，强化腹横肌保护腰椎，改善骨盆前倾。',
    tips: '腰部始终贴紧地面，对侧手脚缓慢伸展，不要憋气。',
    imagePlaceholder: '/exercises/dead_bug.png',
    isRehab: true,
    targetPain: '腰部不适',
  },
  {
    id: 'wrist_curl_rehab',
    name: '腕屈伸训练',
    nameEn: 'Wrist Curl/Extension',
    muscleGroup: '手臂',
    subMuscle: '前臂肌群',
    equipment: '轻哑铃',
    difficulty: 'beginner',
    sets: 3,
    reps: '15-20',
    description: '强化前臂屈肌和伸肌，增强腕关节稳定性，缓解手腕疼痛。',
    tips: '用极轻重量（1-2kg），动作缓慢控制，不要借力。',
    imagePlaceholder: '/exercises/wrist_curl.png',
    isRehab: true,
    targetPain: '手腕疼痛',
  },
  {
    id: 'band_lateral_walk',
    name: '侧向弹力带走',
    nameEn: 'Band Lateral Walk',
    muscleGroup: '腿部',
    subMuscle: '臀中肌',
    equipment: '弹力带',
    difficulty: 'beginner',
    sets: 3,
    reps: '每侧15步',
    description: '激活臀中肌，防止膝盖内扣，改善下肢力线，缓解膝盖和腰部压力。',
    tips: '弹力带套在膝盖上方，半蹲姿势侧向行走，膝盖不要内扣。',
    imagePlaceholder: '/exercises/band_lateral_walk.png',
    isRehab: true,
    targetPain: '膝盖疼痛',
  },
];

// ============ 训练计划生成器 ============
export function generateTrainingPlan(
  level: FitnessLevel,
  goalType: 'muscle_gain' | 'fat_loss' | 'recomp',
  painAreas: string[]
): TrainingPlan[] {
  const splits: Record<FitnessLevel, string[]> = {
    beginner: ['全身A', '全身B', '休息', '全身A', '全身B', '有氧/休息', '休息'],
    intermediate: ['胸+三头', '背+二头', '腿+核心', '休息', '肩+手臂', '有氧+核心', '休息'],
    advanced: ['胸', '背', '腿(股四)', '肩', '手臂+核心', '腿(后链)', '休息'],
  };

  const split = splits[level];
  const cardioMinutes = goalType === 'fat_loss' ? 30 : goalType === 'recomp' ? 20 : 10;

  return split.map((day, index) => {
    const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    let exercises: Exercise[] = [];
    let notes = '';

    if (day === '休息' || day.startsWith('有氧')) {
      notes = day === '休息' ? '完全休息日，保证肌肉恢复' : '低强度有氧30-45分钟，如快走、游泳、骑车';
    } else {
      // 根据训练日分配动作
      exercises = getExercisesForDay(day, level, painAreas);
      notes = getDayNotes(day, goalType);
    }

    return {
      day: dayNames[index],
      focus: day,
      exercises,
      cardioMinutes: day === '休息' ? 0 : cardioMinutes,
      notes,
    };
  });
}

function getExercisesForDay(day: string, level: FitnessLevel, painAreas: string[]): Exercise[] {
  const filtered = exerciseDatabase.filter(e => {
    // 排除疼痛部位相关动作
    if (painAreas.includes('肩膀') && (e.muscleGroup === '肩部' || e.name.includes('卧推') || e.name.includes('推举'))) return false;
    if (painAreas.includes('膝盖') && (e.muscleGroup === '腿部' && e.name.includes('深蹲'))) return false;
    if (painAreas.includes('腰部') && (e.name.includes('硬拉') || e.name.includes('划船'))) return false;
    return e.difficulty === level || (level === 'advanced' && e.difficulty === 'intermediate');
  });

  // 根据训练日选取对应肌群动作
  const muscleMap: Record<string, string[]> = {
    '胸': ['胸部'],
    '背': ['背部'],
    '腿': ['腿部'],
    '肩': ['肩部'],
    '手臂': ['手臂'],
    '核心': ['核心'],
    '全身': ['胸部', '背部', '腿部', '肩部', '核心'],
  };

  const targetMuscles = muscleMap[day.split('+')[0].replace('(', '').trim()] || ['胸部'];
  let selected = filtered.filter(e => targetMuscles.includes(e.muscleGroup));

  // 补充辅助肌群
  if (day.includes('三头')) {
    selected = [...selected, ...filtered.filter(e => e.muscleGroup === '手臂' && e.subMuscle.includes('三头'))];
  }
  if (day.includes('二头')) {
    selected = [...selected, ...filtered.filter(e => e.muscleGroup === '手臂' && e.subMuscle.includes('二头'))];
  }

  // 限制每个训练日的动作数量
  const maxExercises = level === 'beginner' ? 5 : level === 'intermediate' ? 6 : 7;
  return selected.slice(0, maxExercises);
}

function getDayNotes(day: string, goalType: string): string {
  const notes: Record<string, string> = {
    '胸+三头': '先做胸部复合动作，再做三头孤立动作。胸肌训练会预疲劳三头肌。',
    '背+二头': '先做背部拉的动作，再做二头弯举。注意肩胛骨的控制。',
    '腿+核心': '腿部训练强度大，建议充分热身。核心动作放在最后。',
    '肩+手臂': '肩部训练注意重量不要过大，避免肩峰撞击。',
    '胸': '重点日，可以安排4-5个胸部动作，从上胸到下胸全面刺激。',
    '背': '注意动作多样性，垂直拉和水平拉都要安排。',
    '腿(股四)': '以深蹲和腿举为主，注意膝盖不要内扣。',
    '腿(后链)': '以硬拉和腿弯举为主，感受腘绳肌拉伸。',
    '手臂+核心': '二头三头超级组可以节省时间，提高泵感。',
  };
  return notes[day] || '保持专注，控制动作节奏，感受目标肌肉发力。';
}

// ============ 训练理论数据 ============
export const trainingTheory = {
  repRanges: [
    {
      title: '大重量 × 小次数 (1-5RM)',
      description: '主要发展最大力量和神经募集能力。适合复合动作如深蹲、卧推、硬拉。',
      bestFor: '力量举、提升PR、神经适应',
      restTime: '3-5分钟',
    },
    {
      title: '中等重量 × 中等次数 (6-12RM)',
      description: '肌肥大黄金区间，兼顾机械张力和代谢压力。最适合增肌目标。',
      bestFor: '增肌、体型改善、力量耐力',
      restTime: '60-90秒',
    },
    {
      title: '小重量 × 多次数 (15-20+RM)',
      description: '主要发展肌肉耐力和代谢压力。适合小肌群、康复训练和减脂期保持肌肉。',
      bestFor: '耐力、减脂期、伤病恢复、小肌群',
      restTime: '30-60秒',
    },
  ],
  muscleGroups: {
    large: {
      name: '大肌群',
      muscles: ['胸大肌', '背阔肌', '股四头肌', '腘绳肌', '臀大肌'],
      recoveryTime: '48-72小时',
      frequency: '每周1-2次',
      note: '大肌群需要更多恢复时间，训练后至少休息48小时再练同一肌群。',
    },
    small: {
      name: '小肌群',
      muscles: ['三角肌', '肱二头肌', '肱三头肌', '腹直肌', '前臂肌群'],
      recoveryTime: '24-48小时',
      frequency: '每周2-3次',
      note: '小肌群恢复快，可以在大肌群训练日附带训练，也可以单独安排。',
    },
  },
  overtrainingWarning: {
    title: '️ 过度训练警示：皮质醇爆炸',
    description: '有氧和无氧训练量同时过大时，身体会进入过度训练状态，导致皮质醇（压力激素）持续升高。',
    symptoms: [
      '肌肉分解加速，增肌效果适得其反',
      '免疫力下降，容易感冒生病',
      '睡眠质量恶化，恢复能力下降',
      '情绪波动，训练欲望降低',
      '关节和肌腱受伤风险显著增加',
    ],
    recommendations: [
      '增肌期：有氧控制在每周2-3次，每次20-30分钟低强度',
      '减脂期：有氧可适当增加，但力量训练量要相应减少',
      '每周至少安排1-2天完全休息日',
      '监控静息心率：持续升高5%以上说明恢复不足',
      '保证每晚7-9小时高质量睡眠',
    ],
  },
};
