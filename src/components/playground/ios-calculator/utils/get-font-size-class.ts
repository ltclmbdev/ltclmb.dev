export const getFontSizeClass = (display: string): string => {
  const digitCount = display.replace(/[,.\-–]/g, '').length
  const isNegative = display.startsWith('-') || display.startsWith('–')
  console.log({ isNegative, digitCount, display })

  if (digitCount <= 4) return 'text-[64px]'
  if (digitCount === 5) return isNegative ? 'text-[61px]' : 'text-[64px]'
  if (digitCount === 6) return isNegative ? 'text-[50px]' : 'text-[60px]'
  if (digitCount === 7) return isNegative ? 'text-[44px]' : 'text-[50px]'
  if (digitCount === 8) return isNegative ? 'text-[39px]' : 'text-[44px]'
  if (digitCount === 9) return isNegative ? 'text-[35px]' : 'text-[40px]'

  return 'text-[40px]'
}
