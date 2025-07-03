export type FightingStyle = 'Striker' | 'Grappler' | 'Balanced';
export type ExperienceLevel = 'Beginner' | 'Amateur' | 'Pro';
export type TrainingGoal = 'Fix technique' | 'Build fight IQ' | 'Prepare for fight';
export type LearningStyle = 'Video' | 'Written' | 'Visual drills';
export type FocusArea = 'Footwork' | 'Takedown defense' | 'Cardio' | 'Power' | 'Striking technique' | 'Ground game' | 'Clinch work' | 'Defense';

export interface FighterProfile {
  motivation?: string;
  name: string;
  age: number | string;
  favoriteMartialArt: string;
  boxingExperience: number;
  kickboxingExperience: number;
  bjjExperience: number;
  wrestlingExperience: number;
  mmaExperience: number;
  trainingYears: string;
  competitionExperience: string;
  currentFocus: string[];
  weakAreas: string[];
  
  // Legacy fields for compatibility
  muayThaiExperience?: number;
  trainingGoals?: string[];
  trainingEnvironment?: string;
  weightClass?: string;
  experienceLevel?: ExperienceLevel;
  fightingStyle?: FightingStyle;
  trainingFrequency?: number;
  trainingGoal?: TrainingGoal;
  weaknesses?: string[];
  learningStyle?: LearningStyle;
  focusAreas?: FocusArea[];
  
  // Analysis fields
  videoUrl?: string;
  analyzedStyle?: string;
  strengths?: string[];
  analyzedWeaknesses?: string[];
  skillLevel?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'rating';
  options?: string[];
  placeholder?: string;
  key: keyof FighterProfile;
}