'use client'

import { useEffect, useState } from 'react'

const TextToSpeech: React.FC = () => {
  const [isSupported, setIsSupported] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false)
    }
  }, [])

  const handleSpeak = (text: string, lang: string) => {
    if (!isSupported) return

    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang

    // Cancel any ongoing speech
    synth.cancel()

    // Start new speech
    synth.speak(utterance)
  }

  if (!isSupported) {
    return <p>Sorry, your browser does not support speech synthesis.</p>
  }

  return (
    <div>
      <button
        onClick={() => handleSpeak('Yevhen Nahalskyi', 'en-US')}
        className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        🇺🇸
      </button>
      <button
        onClick={() => handleSpeak('Евгений Нагальский', 'ru-RU')}
        className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        🇷🇺
      </button>
      <button
        onClick={() => handleSpeak('Євген Нагальський', 'uk-UA')}
        className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        🇺🇦
      </button>
    </div>
  )
}

export default TextToSpeech
