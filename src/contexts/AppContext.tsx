import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task, Settings, AppState, Resource, Solution, Flashcard, StudyGroup, Challenge } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface AppContextType {
  state: AppState;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  getTodayTasks: () => Task[];
  getFilteredTasks: (category?: string, search?: string) => Task[];
  addResource: (taskId: string, resource: Omit<Resource, 'id'>) => void;
  removeResource: (taskId: string, resourceId: string) => void;
  updateSolution: (taskId: string, solution: Omit<Solution, 'id'>) => void;
  createFlashcard: (taskId: string) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  getFlashcardsForReview: () => Flashcard[];
  markFlashcardReviewed: (id: string, correct: boolean) => void;
  createStudyGroup: (group: Omit<StudyGroup, 'id' | 'createdAt'>) => void;
  joinStudyGroup: (groupId: string, member: Omit<GroupMember, 'id' | 'joinedAt' | 'tasksCompleted'>) => void;
  createChallenge: (challenge: Omit<Challenge, 'id' | 'createdAt'>) => void;
  joinChallenge: (challengeId: string, userId: string) => void;
  getTasksForReview: () => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  tasks: [],
  settings: {
    theme: 'light',
    username: 'DSA Enthusiast',
    targetPerDay: 3,
    enableReminders: true,
    reminderTime: '09:00',
    spacedRepetition: true
  },
  dailyStats: [],
  currentStreak: 0,
  flashcards: [],
  studyGroups: [],
  challenges: []
};

type AppAction = 
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'ADD_RESOURCE'; payload: { taskId: string; resource: Resource } }
  | { type: 'REMOVE_RESOURCE'; payload: { taskId: string; resourceId: string } }
  | { type: 'UPDATE_SOLUTION'; payload: { taskId: string; solution: Solution } }
  | { type: 'ADD_FLASHCARD'; payload: Flashcard }
  | { type: 'UPDATE_FLASHCARD'; payload: { id: string; updates: Partial<Flashcard> } }
  | { type: 'ADD_STUDY_GROUP'; payload: StudyGroup }
  | { type: 'UPDATE_STUDY_GROUP'; payload: { id: string; updates: Partial<StudyGroup> } }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'UPDATE_CHALLENGE'; payload: { id: string; updates: Partial<Challenge> } };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : undefined
              }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    case 'ADD_RESOURCE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                resources: [...(task.resources || []), action.payload.resource]
              }
            : task
        )
      };
    case 'REMOVE_RESOURCE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? {
                ...task,
                resources: (task.resources || []).filter(r => r.id !== action.payload.resourceId)
              }
            : task
        )
      };
    case 'UPDATE_SOLUTION':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, solution: action.payload.solution }
            : task
        )
      };
    case 'ADD_FLASHCARD':
      return {
        ...state,
        flashcards: [...state.flashcards, action.payload]
      };
    case 'UPDATE_FLASHCARD':
      return {
        ...state,
        flashcards: state.flashcards.map(card =>
          card.id === action.payload.id
            ? { ...card, ...action.payload.updates }
            : card
        )
      };
    case 'ADD_STUDY_GROUP':
      return {
        ...state,
        studyGroups: [...state.studyGroups, action.payload]
      };
    case 'UPDATE_STUDY_GROUP':
      return {
        ...state,
        studyGroups: state.studyGroups.map(group =>
          group.id === action.payload.id
            ? { ...group, ...action.payload.updates }
            : group
        )
      };
    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload]
      };
    case 'UPDATE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id
            ? { ...challenge, ...action.payload.updates }
            : challenge
        )
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = loadFromStorage();
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: savedState });
    }
  }, []);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      resources: [],
      reviewCount: 0
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const updateSettings = (settings: Partial<Settings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const getTodayTasks = () => {
    const today = new Date().toDateString();
    return state.tasks.filter(task => 
      new Date(task.createdAt).toDateString() === today
    );
  };

  const getFilteredTasks = (category?: string, search?: string) => {
    return state.tasks.filter(task => {
      const matchesCategory = !category || task.category === category;
      const matchesSearch = !search || 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const addResource = (taskId: string, resourceData: Omit<Resource, 'id'>) => {
    const resource: Resource = {
      ...resourceData,
      id: Date.now().toString()
    };
    dispatch({ type: 'ADD_RESOURCE', payload: { taskId, resource } });
  };

  const removeResource = (taskId: string, resourceId: string) => {
    dispatch({ type: 'REMOVE_RESOURCE', payload: { taskId, resourceId } });
  };

  const updateSolution = (taskId: string, solutionData: Omit<Solution, 'id'>) => {
    const solution: Solution = {
      ...solutionData,
      id: Date.now().toString()
    };
    dispatch({ type: 'UPDATE_SOLUTION', payload: { taskId, solution } });
  };

  const createFlashcard = (taskId: string) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task || !task.completed) return;

    const flashcard: Flashcard = {
      id: Date.now().toString(),
      taskId,
      question: `How do you solve: ${task.title}?`,
      answer: task.solution?.explanation || task.description,
      difficulty: task.difficulty,
      category: task.category,
      reviewCount: 0,
      correctCount: 0,
      nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    dispatch({ type: 'ADD_FLASHCARD', payload: flashcard });
  };

  const updateFlashcard = (id: string, updates: Partial<Flashcard>) => {
    dispatch({ type: 'UPDATE_FLASHCARD', payload: { id, updates } });
  };

  const getFlashcardsForReview = () => {
    const now = new Date();
    return state.flashcards.filter(card => 
      !card.nextReviewDate || new Date(card.nextReviewDate) <= now
    );
  };

  const markFlashcardReviewed = (id: string, correct: boolean) => {
    const card = state.flashcards.find(c => c.id === id);
    if (!card) return;

    const reviewCount = card.reviewCount + 1;
    const correctCount = card.correctCount + (correct ? 1 : 0);
    
    // Spaced repetition algorithm
    let nextReviewDays = 1;
    if (correct) {
      nextReviewDays = Math.min(reviewCount * 2, 30);
    }

    const nextReviewDate = new Date(Date.now() + nextReviewDays * 24 * 60 * 60 * 1000).toISOString();

    updateFlashcard(id, {
      reviewCount,
      correctCount,
      lastReviewed: new Date().toISOString(),
      nextReviewDate
    });
  };

  const createStudyGroup = (groupData: Omit<StudyGroup, 'id' | 'createdAt'>) => {
    const group: StudyGroup = {
      ...groupData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_STUDY_GROUP', payload: group });
  };

  const joinStudyGroup = (groupId: string, memberData: Omit<GroupMember, 'id' | 'joinedAt' | 'tasksCompleted'>) => {
    const member: GroupMember = {
      ...memberData,
      id: Date.now().toString(),
      joinedAt: new Date().toISOString(),
      tasksCompleted: 0
    };
    
    const group = state.studyGroups.find(g => g.id === groupId);
    if (group) {
      dispatch({ 
        type: 'UPDATE_STUDY_GROUP', 
        payload: { 
          id: groupId, 
          updates: { members: [...group.members, member] } 
        } 
      });
    }
  };

  const createChallenge = (challengeData: Omit<Challenge, 'id' | 'createdAt'>) => {
    const challenge: Challenge = {
      ...challengeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_CHALLENGE', payload: challenge });
  };

  const joinChallenge = (challengeId: string, userId: string) => {
    const challenge = state.challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.participants.includes(userId)) {
      dispatch({
        type: 'UPDATE_CHALLENGE',
        payload: {
          id: challengeId,
          updates: { participants: [...challenge.participants, userId] }
        }
      });
    }
  };

  const getTasksForReview = () => {
    if (!state.settings.spacedRepetition) return [];
    
    const now = new Date();
    return state.tasks.filter(task => {
      if (!task.completed || !task.completedAt) return false;
      
      const completedDate = new Date(task.completedAt);
      const daysSinceCompleted = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Review after 1 day, 3 days, 7 days, 14 days, 30 days
      const reviewIntervals = [1, 3, 7, 14, 30];
      const reviewCount = task.reviewCount || 0;
      
      if (reviewCount < reviewIntervals.length) {
        return daysSinceCompleted >= reviewIntervals[reviewCount];
      }
      
      return false;
    });
  };

  return (
    <AppContext.Provider value={{
      state,
      addTask,
      toggleTask,
      deleteTask,
      updateTask,
      updateSettings,
      getTodayTasks,
      getFilteredTasks,
      addResource,
      removeResource,
      updateSolution,
      createFlashcard,
      updateFlashcard,
      getFlashcardsForReview,
      markFlashcardReviewed,
      createStudyGroup,
      joinStudyGroup,
      createChallenge,
      joinChallenge,
      getTasksForReview
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}