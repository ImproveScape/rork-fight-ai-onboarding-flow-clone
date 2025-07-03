import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FighterProfile, FocusArea, FightingStyle, ExperienceLevel, TrainingGoal, LearningStyle } from '@/types/fighter';

interface OnboardingState {
  currentQuestionIndex: number;
  fighterProfile: Partial<FighterProfile>;
  videoUploaded: boolean;
  profileGenerated: boolean;
  videoUri: string | null; // Add separate video URI state
  
  // Actions
  setCurrentQuestionIndex: (index: number) => void;
  updateFighterProfile: (data: Partial<FighterProfile>) => void;
  setVideoUploaded: (uploaded: boolean) => void;
  setProfileGenerated: (generated: boolean) => void;
  setVideoUri: (uri: string | null) => void; // Add video URI setter
  resetOnboarding: () => void;
}

const initialFighterProfile: Partial<FighterProfile> = {
  motivation: '',
  name: '',
  favoriteMartialArt: '',
  boxingExperience: 0,
  kickboxingExperience: 0,
  bjjExperience: 0,
  wrestlingExperience: 0,
  mmaExperience: 0,
  trainingYears: '',
  competitionExperience: '',
  currentFocus: [],
  weakAreas: [],
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      fighterProfile: initialFighterProfile,
      videoUploaded: false,
      profileGenerated: false,
      videoUri: null, // Add video URI to state
      
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      updateFighterProfile: (data) => set((state) => ({
        fighterProfile: { ...state.fighterProfile, ...data }
      })),
      setVideoUploaded: (uploaded) => set({ videoUploaded: uploaded }),
      setProfileGenerated: (generated) => set({ profileGenerated: generated }),
      setVideoUri: (uri) => set({ videoUri: uri }), // Add video URI setter
      resetOnboarding: () => set({
        currentQuestionIndex: 0,
        fighterProfile: initialFighterProfile,
        videoUploaded: false,
        profileGenerated: false,
        videoUri: null, // Reset video URI
      }),
    }),
    {
      name: 'fight-ai-onboarding',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentQuestionIndex: state.currentQuestionIndex,
        fighterProfile: state.fighterProfile,
        videoUploaded: state.videoUploaded,
        profileGenerated: state.profileGenerated,
        // Exclude videoUri from persistence to avoid quota issues
      }),
    }
  )
);