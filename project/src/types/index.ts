export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  resources?: Resource[];
  solution?: Solution;
  lastReviewed?: string;
  nextReviewDate?: string;
  reviewCount?: number;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'GeeksforGeeks' | 'LeetCode' | 'YouTube' | 'Article' | 'Other';
}

export interface Solution {
  id: string;
  code: string;
  language: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface Flashcard {
  id: string;
  taskId: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  lastReviewed?: string;
  nextReviewDate?: string;
  reviewCount: number;
  correctCount: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  createdAt: string;
  isActive: boolean;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  joinedAt: string;
  tasksCompleted: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'custom';
  target: number;
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  deadline: string;
  participants: string[];
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface DailyStats {
  date: string;
  completed: number;
  total: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  username: string;
  targetPerDay: number;
  enableReminders: boolean;
  reminderTime: string;
  spacedRepetition: boolean;
}

export interface AppState {
  tasks: Task[];
  settings: Settings;
  dailyStats: DailyStats[];
  currentStreak: number;
  flashcards: Flashcard[];
  studyGroups: StudyGroup[];
  challenges: Challenge[];
}