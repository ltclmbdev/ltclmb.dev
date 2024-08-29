import { isHighPriorityOperation } from './is-high-priority-operation'

describe('isHighPriorityOperation', () => {
  it('should return true for multiplication', () => {
    expect(isHighPriorityOperation('×')).toBe(true)
  })

  it('should return true for division', () => {
    expect(isHighPriorityOperation('÷')).toBe(true)
  })

  it('should return false for addition', () => {
    expect(isHighPriorityOperation('+')).toBe(false)
  })

  it('should return false for subtraction', () => {
    expect(isHighPriorityOperation('-')).toBe(false)
  })

  it('should return false for other operators', () => {
    expect(isHighPriorityOperation('^')).toBe(false)
    expect(isHighPriorityOperation('%')).toBe(false)
  })
})
