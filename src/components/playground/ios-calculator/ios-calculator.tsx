import React, { useReducer, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/icons'

import './stylesheet.css'

type State = {
  display: string
  previousOperand: number | null
  currentOperand: number | null
  operator: string | null
  waitingForOperand: boolean
  lastEqualsValue: number | null
}

type Action =
  | { type: 'INPUT_DIGIT'; payload: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'CLEAR_ALL' }
  | { type: 'INPUT_PERCENT' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERFORM_OPERATION'; payload: string }
  | { type: 'HANDLE_EQUALS' }

const initialState: State = {
  display: '0',
  previousOperand: null,
  currentOperand: null,
  operator: null,
  waitingForOperand: false,
  lastEqualsValue: null,
}

function roundToSignificantDigits(num: number, digits: number): number {
  if (num === 0) {
    return 0
  }
  const d = Math.ceil(Math.log10(num < 0 ? -num : num))
  const power = digits - d
  const magnitude = Math.pow(10, power)
  const shifted = Math.round(num * magnitude)
  return shifted / magnitude
}

function formatNumber(num: number): string {
  const roundedNum = roundToSignificantDigits(num, 9)
  return roundedNum.toString()
}

function calculatorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INPUT_DIGIT':
      if (state.waitingForOperand) {
        return {
          ...state,
          display: action.payload,
          currentOperand: parseFloat(action.payload),
          waitingForOperand: false,
        }
      } else {
        const newDisplay =
          state.display === '0'
            ? action.payload
            : state.display + action.payload
        return {
          ...state,
          display: newDisplay,
          currentOperand: parseFloat(newDisplay),
        }
      }
    case 'INPUT_DECIMAL':
      if (state.waitingForOperand) {
        return {
          ...state,
          display: '0.',
          currentOperand: 0,
          waitingForOperand: false,
        }
      } else if (!state.display.includes('.')) {
        return {
          ...state,
          display: state.display + '.',
        }
      }
      return state
    case 'CLEAR_ALL':
      return initialState
    case 'INPUT_PERCENT':
      const currentValue = parseFloat(state.display)
      let percentValue: number
      if (state.previousOperand !== null && state.operator) {
        percentValue = (state.previousOperand * currentValue) / 100
      } else {
        percentValue = currentValue / 100
      }
      return {
        ...state,
        display: formatNumber(percentValue),
        currentOperand: percentValue,
        waitingForOperand: true,
      }
    case 'TOGGLE_SIGN':
      const toggledValue = -parseFloat(state.display)
      return {
        ...state,
        display: formatNumber(toggledValue),
        currentOperand: toggledValue,
      }
    case 'PERFORM_OPERATION':
      if (state.operator && !state.waitingForOperand) {
        const result = calculate(
          state.previousOperand!,
          state.currentOperand!,
          state.operator,
        )
        if (['×', '÷'].includes(state.operator)) {
          return {
            ...state,
            display: formatNumber(result),
            currentOperand: result,
            operator: action.payload,
            waitingForOperand: true,
          }
        } else {
          return {
            ...state,
            display: formatNumber(result),
            previousOperand: result,
            currentOperand: null,
            operator: action.payload,
            waitingForOperand: true,
          }
        }
      } else {
        return {
          ...state,
          previousOperand: parseFloat(state.display),
          currentOperand: null,
          operator: action.payload,
          waitingForOperand: true,
        }
      }
    case 'HANDLE_EQUALS':
      if (
        state.operator &&
        state.previousOperand !== null &&
        state.currentOperand !== null
      ) {
        const result = calculate(
          state.previousOperand,
          state.currentOperand,
          state.operator,
        )
        return {
          ...state,
          display: formatNumber(result),
          previousOperand: result,
          currentOperand: null,
          operator: null,
          waitingForOperand: true,
          lastEqualsValue: state.currentOperand,
        }
      } else if (
        state.operator &&
        state.previousOperand !== null &&
        state.lastEqualsValue !== null
      ) {
        const result = calculate(
          state.previousOperand,
          state.lastEqualsValue,
          state.operator,
        )
        return {
          ...state,
          display: formatNumber(result),
          previousOperand: result,
          waitingForOperand: true,
        }
      }
      return state
    default:
      return state
  }
}

function calculate(a: number, b: number, operator: string): number {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b !== 0 ? a / b : NaN
    default:
      return b
  }
}

const IosCalculator: React.FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    const key = event.key

    if (/^[0-9]$/.test(key)) {
      dispatch({ type: 'INPUT_DIGIT', payload: key })
    } else if (key === '.') {
      dispatch({ type: 'INPUT_DECIMAL' })
    } else if (key === '%') {
      dispatch({ type: 'INPUT_PERCENT' })
    } else if (key === 'Backspace') {
      dispatch({ type: 'CLEAR_ALL' })
    } else if (key === 'Enter' || key === '=') {
      dispatch({ type: 'HANDLE_EQUALS' })
    } else if (['+', '-', '*', '/'].includes(key)) {
      const operatorMap: { [key: string]: string } = { '*': '×', '/': '÷' }
      dispatch({ type: 'PERFORM_OPERATION', payload: operatorMap[key] || key })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const buttonClass =
    'w-[52px] h-[52px] rounded-full focus:outline-none flex justify-center items-center font-sf-pro'
  const operatorButtonClass = cn(
    buttonClass,
    'bg-[#FF9D0A] text-white text-[28px] font-medium',
  )
  const numberButtonClass = cn(buttonClass, 'bg-[#333333] text-white text-2xl')
  const functionButtonClass = cn(
    buttonClass,
    'bg-[#A5A5A5] text-black font-medium text-xl',
  )

  return (
    <div className="w-[286px] h-[586px] relative">
      <Image
        src="/playground/ios-calculator/iphone-15.png"
        alt="iphone 15"
        width={661}
        height={1355}
      />
      <div className="absolute w-[260px] left-0 right-0 mx-auto bottom-0">
        <div className="px-[11px] pb-[50px]">
          <div className="text-right text-white text-6xl font-light mb-2 h-20 flex items-end justify-end font-sf-pro">
            {state.display}
          </div>
          <div className="grid grid-cols-4 gap-[10px]">
            <button
              onClick={() => dispatch({ type: 'CLEAR_ALL' })}
              className={functionButtonClass}
            >
              AC
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_SIGN' })}
              className={functionButtonClass}
            >
              <Icon name="PlusMinus" size="20" />
            </button>
            <button
              onClick={() => dispatch({ type: 'INPUT_PERCENT' })}
              className={functionButtonClass}
            >
              %
            </button>
            <button
              onClick={() =>
                dispatch({ type: 'PERFORM_OPERATION', payload: '÷' })
              }
              className={operatorButtonClass}
            >
              ÷
            </button>

            {[7, 8, 9].map(digit => (
              <button
                key={digit}
                onClick={() =>
                  dispatch({ type: 'INPUT_DIGIT', payload: digit.toString() })
                }
                className={numberButtonClass}
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({ type: 'PERFORM_OPERATION', payload: '×' })
              }
              className={operatorButtonClass}
            >
              ×
            </button>

            {[4, 5, 6].map(digit => (
              <button
                key={digit}
                onClick={() =>
                  dispatch({ type: 'INPUT_DIGIT', payload: digit.toString() })
                }
                className={numberButtonClass}
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({ type: 'PERFORM_OPERATION', payload: '-' })
              }
              className={operatorButtonClass}
            >
              -
            </button>

            {[1, 2, 3].map(digit => (
              <button
                key={digit}
                onClick={() =>
                  dispatch({ type: 'INPUT_DIGIT', payload: digit.toString() })
                }
                className={numberButtonClass}
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({ type: 'PERFORM_OPERATION', payload: '+' })
              }
              className={operatorButtonClass}
            >
              +
            </button>

            <button
              onClick={() => dispatch({ type: 'INPUT_DIGIT', payload: '0' })}
              className={cn(
                numberButtonClass,
                'col-span-2 w-auto pl-6 justify-start',
              )}
            >
              0
            </button>
            <button
              onClick={() => dispatch({ type: 'INPUT_DECIMAL' })}
              className={numberButtonClass}
            >
              ,
            </button>
            <button
              onClick={() => dispatch({ type: 'HANDLE_EQUALS' })}
              className={operatorButtonClass}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IosCalculator
