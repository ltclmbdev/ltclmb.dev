export const countSignificantDigits = (numStr: string): number => {
  // Remove leading zeros, decimal comma, thousands separators, and negative sign
  const trimmed = numStr.replace(/^-?0+|,|\./g, '')
  return trimmed.length
}
