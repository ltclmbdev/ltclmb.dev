import * as React from 'react'
import {
  calculatorReducer,
  initialState,
  State,
  Action,
  ActionType,
} from '../reducers/calculator-reducer'
import { DECIMAL_SEPARATOR } from '../utils/constants'

export function useCalculator(): {
  state: State
  dispatch: React.Dispatch<Action>
} {
  const [state, dispatch] = React.useReducer(calculatorReducer, initialState)

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    const key = event.key

    switch (true) {
      case /^[0-9]$/.test(key):
        dispatch({ type: ActionType.INPUT_DIGIT, payload: key })
        break
      case key === DECIMAL_SEPARATOR:
        dispatch({ type: ActionType.INPUT_DECIMAL })
        break
      case key === '%':
        dispatch({ type: ActionType.INPUT_PERCENT })
        break
      case key === 'Backspace':
        dispatch({ type: ActionType.CLEAR_ALL })
        break
      case key === 'Enter' || key === '=':
        dispatch({ type: ActionType.HANDLE_EQUALS })
        break
      case ['+', '-', '*', '/'].includes(key):
        const operatorMap: { [key: string]: string } = { '*': '×', '/': '÷' }
        dispatch({
          type: ActionType.PERFORM_OPERATION,
          payload: operatorMap[key] || key,
        })
        break
      default:
        // No action for other keys
        break
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return { state, dispatch }
}
