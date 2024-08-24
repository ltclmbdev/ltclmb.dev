import { MAX_DISPLAY_DIGITS, DECIMAL_SEPARATOR } from './constants'

export const formatNumber = (num: number | string): string => {
  if (typeof num === 'string') return num
  // Round to MAX_DISPLAY_DIGITS - 1 decimal places to avoid floating point precision issues
  const rounded = Number(num.toFixed(MAX_DISPLAY_DIGITS - 1))
  const [integerPart, decimalPart] = rounded.toString().split('.')

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (decimalPart) {
    const trimmedDecimal = decimalPart.replace(/0+$/, '')
    return trimmedDecimal
      ? `${formattedIntegerPart}${DECIMAL_SEPARATOR}${trimmedDecimal}`
      : formattedIntegerPart
  }
  return formattedIntegerPart
}
