import * as React from 'react'
import {
  calculatorReducer,
  initialState,
  State,
  Action,
  ActionType,
} from '../reducers/calculator-reducer'
import { DECIMAL_SEPARATOR } from '../utils/constants'

type ExtendedState = State & {
  selectedOperator: string | null
}

const extendedInitialState: ExtendedState = {
  ...initialState,
  selectedOperator: null,
}

export function useCalculator(): {
  state: ExtendedState
  dispatch: React.Dispatch<Action>
} {
  const [state, dispatch] = React.useReducer(
    (state: ExtendedState, action: Action): ExtendedState => {
      const newState = calculatorReducer(state, action)
      let selectedOperator = state.selectedOperator

      if (action.type === ActionType.PERFORM_OPERATION) {
        selectedOperator = action.payload
      } else if (
        action.type === ActionType.INPUT_DIGIT ||
        action.type === ActionType.INPUT_DECIMAL ||
        action.type === ActionType.HANDLE_EQUALS ||
        action.type === ActionType.CLEAR_ALL
      ) {
        selectedOperator = null
      }

      return { ...newState, selectedOperator }
    },
    extendedInitialState,
  )

  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  React.useEffect(() => {
    audioRef.current = new Audio('/sounds/click.mp3')
  }, [])

  const handleAction = React.useCallback((action: Action) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current
        .play()
        .catch(error => console.error('Error playing audio:', error))
    }
    dispatch(action)
  }, [])

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      const key = event.key

      switch (true) {
        case /^[0-9]$/.test(key):
          handleAction({ type: ActionType.INPUT_DIGIT, payload: key })
          break
        case key === DECIMAL_SEPARATOR:
          handleAction({ type: ActionType.INPUT_DECIMAL })
          break
        case key === '%':
          handleAction({ type: ActionType.INPUT_PERCENT })
          break
        case key === 'Backspace':
          handleAction({ type: ActionType.CLEAR_ALL })
          break
        case key === 'Enter' || key === '=':
          handleAction({ type: ActionType.HANDLE_EQUALS })
          break
        case ['+', '-', '*', '/'].includes(key):
          const operatorMap: { [key: string]: string } = { '*': '×', '/': '÷' }
          handleAction({
            type: ActionType.PERFORM_OPERATION,
            payload: operatorMap[key] || key,
          })
          break
        default:
          // No action for other keys
          break
      }
    },
    [handleAction],
  )

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { state, dispatch: handleAction }
}
