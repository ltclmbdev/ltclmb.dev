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

    if (/^[0-9]$/.test(key)) {
      dispatch({ type: ActionType.INPUT_DIGIT, payload: key })
    } else if (key === DECIMAL_SEPARATOR) {
      dispatch({ type: ActionType.INPUT_DECIMAL })
    } else if (key === '%') {
      dispatch({ type: ActionType.INPUT_PERCENT })
    } else if (key === 'Backspace') {
      dispatch({ type: ActionType.CLEAR_ALL })
    } else if (key === 'Enter' || key === '=') {
      dispatch({ type: ActionType.HANDLE_EQUALS })
    } else if (['+', '-', '*', '/'].includes(key)) {
      const operatorMap: { [key: string]: string } = { '*': '×', '/': '÷' }
      dispatch({
        type: ActionType.PERFORM_OPERATION,
        payload: operatorMap[key] || key,
      })
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
