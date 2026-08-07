// ============ 用户类型 ============
export type Gender = 'male' | 'female';
export type AgeGroup = 'young' | 'middle' | 'mature'; // 18-30, 30-45, 45+
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type GoalType = 'muscle_gain' | 'fat_loss' | 'recomp';

export interface UserProfile {
  age: number;
  gender: Gender;
  ageGroup: AgeGroup;
  height: number;       // cm
  weight: number;       // kg
  targetWeight: number; // kg
  goalType: GoalType;
  fitnessLevel: FitnessLevel;
  prData: PRData;
  trainingFrequency: number; // 每周训练次数
  painAreas: string[];       // 疼痛部位（自动归类）
  painDescription: string;   // 用户自由描述的疼痛/不适
}

export interface PRData {
  benchPress: number;   // 卧推 kg
  squat: number;        // 深蹲 kg
  deadlift: number;     // 硬拉 kg
  trainingYears: number; // 训练年限
}

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  muscleGroup: string;
  subMuscle: string;       // 上束/中束/下束
  equipment: string;
  difficulty: FitnessLevel;
  sets: number;
  reps: string;            // 如 "8-12"
  description: string;
  tips: string;
  imagePlaceholder: string; // 后续替换为真实图片URL
  isRehab?: boolean;        // 是否为康复/改善动作
  targetPain?: string;      // 针对的疼痛/体态问题
}

export interface TrainingPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
  cardioMinutes: number;
  notes: string;
}

// ============ 主题类型 ============
export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  gradient: string;
}

export type ThemeKey = `${Gender}_${AgeGroup}`;
