/**
 * Storage operations for markdown tasks
 * Uses localStorage for browser-based persistence
 */

import type { TaskData } from './markdown'
import { createMarkdown, parseMarkdown } from './markdown'

const STORAGE_KEY = 'taskFlowData'

export interface StoredTask {
  id: string
  data: TaskData
  createdAt: string
  updatedAt: string
}

/**
 * Save a task to localStorage
 */
export function saveTask(taskId: string, taskData: TaskData): void {
  const tasks = getAllTasks()
  const existingIndex = tasks.findIndex((t) => t.id === taskId)
  
  const task: StoredTask = {
    id: taskId,
    data: taskData,
    createdAt: existingIndex >= 0 ? tasks[existingIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  if (existingIndex >= 0) {
    tasks[existingIndex] = task
  } else {
    tasks.push(task)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

/**
 * Load a task from localStorage
 */
export function loadTask(taskId: string): TaskData | null {
  const tasks = getAllTasks()
  const task = tasks.find((t) => t.id === taskId)
  return task ? task.data : null
}

/**
 * Delete a task from localStorage
 */
export function deleteTask(taskId: string): void {
  const tasks = getAllTasks()
  const filtered = tasks.filter((t) => t.id !== taskId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

/**
 * Get all tasks from localStorage
 */
export function getAllTasks(): StoredTask[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Failed to load tasks from storage:', e)
    return []
  }
}

/**
 * List all tasks with their IDs
 */
export function listTasks(): Array<{ id: string; data: TaskData }> {
  return getAllTasks().map((task) => ({
    id: task.id,
    data: task.data,
  }))
}

/**
 * Export all tasks as JSON
 */
export function exportTasks(): string {
  const tasks = getAllTasks()
  const exportData = {
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    tasks: tasks.map((t) => ({
      id: t.id,
      data: t.data,
      markdown: createMarkdown(t.data),
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    })),
  }
  return JSON.stringify(exportData, null, 2)
}

/**
 * Import tasks from an export file
 */
export function importTasks(jsonData: string): number {
  try {
    const importData = JSON.parse(jsonData)
    let count = 0

    for (const task of importData.tasks) {
      try {
        saveTask(task.id, task.data)
        count++
      } catch (e) {
        console.error(`Failed to import task ${task.id}:`, e)
      }
    }

    return count
  } catch (e) {
    console.error('Failed to parse import data:', e)
    return 0
  }
}

/**
 * Clear all tasks
 */
export function clearAllTasks(): void {
  localStorage.removeItem(STORAGE_KEY)
}

