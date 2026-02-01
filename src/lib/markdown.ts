export interface TaskMetadata {
  title: string
  date: string
}

export interface TaskData extends TaskMetadata {
  content: string
  due?: string
  status?: 'new' | 'in-progress' | 'done'
}

const TASKS_DIR = 'tasks'

export function parseMarkdown(content: string): TaskData {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    throw new Error('Invalid markdown format: missing frontmatter')
  }

  const [, frontmatterStr, markdownContent] = match
  const frontmatter: Record<string, string> = {}

  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(':').trim()
    }
  })

  if (!frontmatter.title) {
    throw new Error('Frontmatter missing required field: title')
  }
  if (!frontmatter.date) {
    throw new Error('Frontmatter missing required field: date')
  }

  return {
    title: frontmatter.title,
    date: frontmatter.date,
    content: markdownContent.trim(),
  }
}

export function createMarkdown(data: TaskData): string {
  return `---
title: ${data.title}
date: ${data.date}
---
${data.content}`
}

export function getFilename(taskId: string): string {
  return `${taskId}.md`
}

export function getTaskPath(taskId: string): string {
  return `${TASKS_DIR}/${getFilename(taskId)}`
}

export function generateTaskId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function createDefaultTask(title: string = 'Untitled Task'): TaskData {
  return {
    title,
    date: new Date().toISOString().split('T')[0],
    content: '',
    due: '',
    status: 'new',
  }
}
