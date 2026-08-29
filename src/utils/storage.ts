import { AppState } from '../types';

const STORAGE_KEY = 'dsa-journey-tracker';

export function saveToStorage(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function loadFromStorage(): AppState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return null;
}

export function exportData(tasks: any[]): void {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `dsa-tasks-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}