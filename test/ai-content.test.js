import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('AI & Agent 知识库与题库数据完整性校验', () => {
  const rootDir = process.cwd()
  const modulesPath = path.join(rootDir, 'src/data/ai/knowledge_modules.json')
  const questionsPath = path.join(rootDir, 'src/data/ai/interview_questions.json')

  it('AI 知识体系数据结构完整性 (8 阶 Stage 0 ~ Stage 7)', () => {
    expect(fs.existsSync(modulesPath)).toBe(true)
    const modules = JSON.parse(fs.readFileSync(modulesPath, 'utf-8'))
    expect(Array.isArray(modules)).toBe(true)
    expect(modules.length).toBe(8)

    const expectedStages = ['0', '1', '2', '3', '4', '5', '6', '7']
    modules.forEach((mod, idx) => {
      expect(mod.stageNum).toBe(expectedStages[idx])
      expect(mod.id).toBe(`stage${idx}`)
      expect(typeof mod.title).toBe('string')
      expect(mod.title.length).toBeGreaterThan(3)
      expect(typeof mod.summary).toBe('string')
      expect(typeof mod.analogy).toBe('string')
      expect(mod.analogy.length).toBeGreaterThan(10)
      expect(Array.isArray(mod.sections)).toBe(true)
      expect(mod.sections.length).toBeGreaterThanOrEqual(2)

      mod.sections.forEach((sec) => {
        expect(typeof sec.title).toBe('string')
        expect(typeof sec.content).toBe('string')
      })

      // 校验随堂自测题
      if (mod.quiz) {
        expect(typeof mod.quiz.question).toBe('string')
        expect(Array.isArray(mod.quiz.options)).toBe(true)
        expect(mod.quiz.options.length).toBeGreaterThanOrEqual(2)
        expect(typeof mod.quiz.answer).toBe('string')
        expect(typeof mod.quiz.analysis).toBe('string')
      }
    })
  })

  it('AI 大厂面试题库数据结构完整性 (双层解析)', () => {
    expect(fs.existsSync(questionsPath)).toBe(true)
    const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'))
    expect(Array.isArray(questions)).toBe(true)
    expect(questions.length).toBeGreaterThanOrEqual(10)

    const validCategories = new Set(['rag', 'embedding', 'rank', 'memory', 'agent', 'dify', 'architecture'])
    const validLevels = new Set(['Junior', 'Mid', 'Senior', 'Lead'])

    questions.forEach((q) => {
      expect(typeof q.id).toBe('string')
      expect(typeof q.title).toBe('string')
      expect(validCategories.has(q.category)).toBe(true)
      expect(validLevels.has(q.level)).toBe(true)
      expect(Array.isArray(q.tags)).toBe(true)
      expect(q.tags.length).toBeGreaterThan(0)

      // 必须包含小白通俗人话解读
      expect(typeof q.plainAnalogy).toBe('string')
      expect(q.plainAnalogy.length).toBeGreaterThan(15)

      // 必须包含架构师深度解答与考点
      expect(typeof q.analysis).toBe('string')
      expect(typeof q.coreAnswer).toBe('string')
      expect(typeof q.bonusPoints).toBe('string')
    })
  })
})
