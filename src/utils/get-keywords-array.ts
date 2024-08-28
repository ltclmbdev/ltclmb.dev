export const getKeywordsArray = (keywordsString: string): string[] => {
  const keywordsArray = keywordsString
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword !== '')

  const capitalizedKeywords = keywordsArray.map(keyword => {
    return keyword
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  })

  return capitalizedKeywords
}
