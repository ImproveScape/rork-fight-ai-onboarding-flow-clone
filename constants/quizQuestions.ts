import { QuizQuestion } from '@/types/fighter';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'motivation',
    question: "How badly do you want to become a better fighter?",
    type: 'select',
    options: ['I want to dominate', 'Very motivated', 'Pretty motivated', 'Somewhat interested'],
    key: 'motivation'
  },
  {
    id: 'name',
    question: "What's your name, fighter?",
    type: 'text',
    placeholder: 'Enter your name',
    key: 'name'
  },
  {
    id: 'favoriteMartialArt',
    question: "What's your favorite martial art?",
    type: 'select',
    options: ['Boxing', 'Kickboxing', 'Brazilian Jiu-Jitsu', 'Wrestling', 'MMA'],
    key: 'favoriteMartialArt'
  },
  {
    id: 'boxingExperience',
    question: "Rate your Boxing experience (1-10)",
    type: 'rating',
    key: 'boxingExperience'
  },
  {
    id: 'kickboxingExperience',
    question: "Rate your Kickboxing experience (1-10)",
    type: 'rating',
    key: 'kickboxingExperience'
  },
  {
    id: 'bjjExperience',
    question: "Rate your Brazilian Jiu-Jitsu experience (1-10)",
    type: 'rating',
    key: 'bjjExperience'
  },
  {
    id: 'wrestlingExperience',
    question: "Rate your Wrestling experience (1-10)",
    type: 'rating',
    key: 'wrestlingExperience'
  },
  {
    id: 'mmaExperience',
    question: "Rate your MMA experience (1-10)",
    type: 'rating',
    key: 'mmaExperience'
  },
  {
    id: 'trainingYears',
    question: "How many years have you been training?",
    type: 'select',
    options: ['Less than 1 year', '1-2 years', '3-5 years', '6-10 years', 'Over 10 years'],
    key: 'trainingYears'
  },
  {
    id: 'competitionExperience',
    question: "What's your competition experience?",
    type: 'select',
    options: ['Never competed', 'Local tournaments', 'Regional competitions', 'National level', 'Professional fights'],
    key: 'competitionExperience'
  },
  {
    id: 'currentFocus',
    question: "What's your current training focus?",
    type: 'multiselect',
    options: ['Striking technique', 'Grappling', 'Cardio conditioning', 'Strength training', 'Fight preparation'],
    key: 'currentFocus'
  },
  {
    id: 'weakAreas',
    question: "Which areas need the most work?",
    type: 'multiselect',
    options: ['Footwork', 'Head movement', 'Takedown defense', 'Ground control', 'Submissions', 'Cardio', 'Power punching', 'Leg kicks'],
    key: 'weakAreas'
  }
];