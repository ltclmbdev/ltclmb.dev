import { DECIMAL_SEPARATOR, MAX_DISPLAY_DIGITS } from './constants'

export const formatNumber = (num: number | string): string => {
  if (typeof num === 'string') return num

  // Convert to string and split into integer and decimal parts
  const [integerPart = '0', decimalPart = ''] = num.toString().split('.')

  // Calculate how many decimal places we can show
  const integerDigits = integerPart.replace('-', '').length
  const maxDecimalPlaces = Math.max(0, MAX_DISPLAY_DIGITS - integerDigits)

  // Round to the calculated decimal places
  const rounded = Number(
    parseFloat(`${integerPart}.${decimalPart}`).toFixed(maxDecimalPlaces),
  )

  // Split again after rounding, ensuring we always have an integer part
  const [roundedInteger = '0', roundedDecimal] = rounded.toString().split('.')

  // Format the integer part with thousands separators
  const formattedIntegerPart = roundedInteger.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.',
  )

  // Construct the final formatted number
  let formattedNumber = formattedIntegerPart
  if (roundedDecimal) {
    formattedNumber += `${DECIMAL_SEPARATOR}${roundedDecimal}`
  }

  // Replace minus sign with en dash for negative numbers
  return formattedNumber.startsWith('-')
    ? `–${formattedNumber.slice(1)}`
    : formattedNumber
}
