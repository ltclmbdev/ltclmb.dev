import {
  getSingletonHighlighter,
  HighlighterGeneric,
  BundledLanguage,
  BundledTheme,
} from 'shiki'

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null

export async function getHighlighter() {
  if (highlighter) return highlighter
  highlighter = await getSingletonHighlighter({
    themes: ['nord', 'material-theme-palenight'],
    langs: [
      'typescript',
      'javascript',
      'python',
      'html',
      'css',
      'json',
      'markdown',
    ],
  })
  return highlighter
}

export function highlightCode(code: string, language: string) {
  if (!highlighter) {
    throw new Error('Highlighter not initialized')
  }

  return highlighter.codeToHtml(code, {
    lang: language as BundledLanguage,
    themes: { light: 'nord', dark: 'material-theme-palenight' },
  })
}
