export const isHighPriorityOperation = (op: string): boolean => {
  return op === '×' || op === '÷'
}
