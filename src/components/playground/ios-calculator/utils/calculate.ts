export const calculate = (a: number, b: number, operator: string): number => {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b !== 0 ? a / b : NaN
    default:
      return b
  }
}
