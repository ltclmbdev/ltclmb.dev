// app/speech/TextToSpeech.tsx

'use client'

import { useState, useEffect } from 'react'

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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        🇺🇸
      </button>
      <button
        onClick={() => handleSpeak('Евгений Нагальский', 'ru-RU')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        🇷🇺
      </button>
      <button
        onClick={() => handleSpeak('Євген Нагальський', 'uk-UA')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        🇺🇦
      </button>
    </div>
  )
}

export default TextToSpeech
