import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/icons'
import TimeDisplay from './time-display'

import './stylesheet.css'

type State = {
  display: string
  previousOperand: number | null
  currentOperand: number | null
  operator: string | null
  waitingForOperand: boolean
  lastOperation: { operator: string; operand: number } | null
  pendingLowPriorityOperation: { operator: string; operand: number } | null
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
  lastOperation: null,
  pendingLowPriorityOperation: null,
}

function getFontSizeClass(display: string): string {
  const digitCount = display.replace(/[,.-]/g, '').length
  const isNegative = display.startsWith('-')

  if (digitCount <= 4) return 'text-[64px]'
  if (digitCount === 5) return isNegative ? 'text-[61px]' : 'text-[64px]'
  if (digitCount === 6) return isNegative ? 'text-[53px]' : 'text-[60px]'
  if (digitCount === 7) return isNegative ? 'text-[45px]' : 'text-[50px]'
  if (digitCount === 8) return isNegative ? 'text-[40px]' : 'text-[44px]'
  if (digitCount === 9) return isNegative ? 'text-[36px]' : 'text-[40px]'

  return 'text-[40px]'
}

function formatNumber(num: number | string): string {
  if (typeof num === 'string') return num
  // Round to 8 decimal places to avoid floating point precision issues
  const rounded = Number(num.toFixed(8))
  const [integerPart, decimalPart] = rounded.toString().split('.')

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (decimalPart) {
    const trimmedDecimal = decimalPart.replace(/0+$/, '')
    return trimmedDecimal
      ? `${formattedIntegerPart},${trimmedDecimal}`
      : formattedIntegerPart
  }
  return formattedIntegerPart
}

function isHighPriorityOperation(op: string): boolean {
  return op === '×' || op === '÷'
}

function countSignificantDigits(numStr: string): number {
  // Remove leading zeros, decimal comma, thousands separators, and negative sign
  const trimmed = numStr.replace(/^-?0+|,|\./g, '')
  return trimmed.length
}

function calculatorReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INPUT_DIGIT':
      if (state.display === 'Error') {
        return {
          ...initialState,
          display: action.payload,
          currentOperand: parseFloat(action.payload),
        }
      }
      if (state.waitingForOperand) {
        return {
          ...state,
          display: action.payload,
          currentOperand: parseFloat(action.payload),
          waitingForOperand: false,
        }
      } else {
        let newDisplay: string
        if (state.display.includes(',')) {
          newDisplay = state.display + action.payload
        } else {
          const currentNum = parseFloat(state.display.replace(/\./g, ''))
          const newNum =
            currentNum * 10 +
            (currentNum < 0
              ? -parseInt(action.payload)
              : parseInt(action.payload))
          newDisplay = formatNumber(newNum)
        }

        if (countSignificantDigits(newDisplay) > 9) {
          return state // Ignore input if it would exceed 9 significant digits
        }
        return {
          ...state,
          display: newDisplay,
          currentOperand: parseFloat(
            newDisplay.replace(/\./g, '').replace(',', '.'),
          ),
        }
      }
    case 'INPUT_DECIMAL':
      if (state.display === 'Error') return initialState
      if (state.waitingForOperand) {
        return {
          ...state,
          display: '0,',
          currentOperand: 0,
          waitingForOperand: false,
        }
      } else if (!state.display.includes(',')) {
        return {
          ...state,
          display: state.display + ',',
        }
      }
      return state
    case 'CLEAR_ALL':
      return initialState
    case 'INPUT_PERCENT':
      if (state.display === 'Error') return initialState
      const currentValue = parseFloat(
        state.display.replace(/\./g, '').replace(',', '.'),
      )
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
      if (state.display === 'Error') return initialState
      const currentNum = parseFloat(
        state.display.replace(/\./g, '').replace(',', '.'),
      )
      const toggledValue = -currentNum
      const newDisplay = formatNumber(toggledValue)
      // Allow toggle sign for numbers up to 999999999
      if (Math.abs(toggledValue) > 999999999) {
        return state
      }
      return {
        ...state,
        display: newDisplay,
        currentOperand: toggledValue,
      }
    case 'PERFORM_OPERATION':
      if (state.display === 'Error') return initialState
      if (state.operator && !state.waitingForOperand) {
        let result: number
        if (isHighPriorityOperation(state.operator)) {
          result = calculate(
            state.previousOperand!,
            state.currentOperand!,
            state.operator,
          )
          if (Number.isNaN(result)) {
            return {
              ...state,
              display: 'Error',
              previousOperand: null,
              currentOperand: null,
              operator: null,
              waitingForOperand: true,
            }
          }
          if (isHighPriorityOperation(action.payload)) {
            return {
              ...state,
              display: formatNumber(result),
              previousOperand: result,
              currentOperand: null,
              operator: action.payload,
              waitingForOperand: true,
            }
          } else {
            if (state.pendingLowPriorityOperation) {
              result = calculate(
                state.pendingLowPriorityOperation.operand,
                result,
                state.pendingLowPriorityOperation.operator,
              )
              if (Number.isNaN(result)) {
                return {
                  ...state,
                  display: 'Error',
                  previousOperand: null,
                  currentOperand: null,
                  operator: null,
                  waitingForOperand: true,
                }
              }
            }
            return {
              ...state,
              display: formatNumber(result),
              previousOperand: result,
              currentOperand: null,
              operator: action.payload,
              waitingForOperand: true,
              pendingLowPriorityOperation: null,
            }
          }
        } else {
          if (isHighPriorityOperation(action.payload)) {
            return {
              ...state,
              previousOperand: state.currentOperand,
              currentOperand: null,
              operator: action.payload,
              waitingForOperand: true,
              pendingLowPriorityOperation: {
                operator: state.operator,
                operand: state.previousOperand!,
              },
            }
          } else {
            result = calculate(
              state.previousOperand!,
              state.currentOperand!,
              state.operator,
            )
            if (Number.isNaN(result)) {
              return {
                ...state,
                display: 'Error',
                previousOperand: null,
                currentOperand: null,
                operator: null,
                waitingForOperand: true,
              }
            }
            return {
              ...state,
              display: formatNumber(result),
              previousOperand: result,
              currentOperand: null,
              operator: action.payload,
              waitingForOperand: true,
            }
          }
        }
      } else {
        return {
          ...state,
          previousOperand: parseFloat(
            state.display.replace(/\./g, '').replace(',', '.'),
          ),
          currentOperand: null,
          operator: action.payload,
          waitingForOperand: true,
        }
      }
    case 'HANDLE_EQUALS':
      if (state.display === 'Error') return initialState
      if (
        state.operator &&
        state.previousOperand !== null &&
        state.currentOperand !== null
      ) {
        let result = calculate(
          state.previousOperand,
          state.currentOperand,
          state.operator,
        )
        if (Number.isNaN(result)) {
          return {
            ...state,
            display: 'Error',
            previousOperand: null,
            currentOperand: null,
            operator: null,
            waitingForOperand: true,
          }
        }
        if (state.pendingLowPriorityOperation) {
          result = calculate(
            state.pendingLowPriorityOperation.operand,
            result,
            state.pendingLowPriorityOperation.operator,
          )
          if (Number.isNaN(result)) {
            return {
              ...state,
              display: 'Error',
              previousOperand: null,
              currentOperand: null,
              operator: null,
              waitingForOperand: true,
            }
          }
        }
        return {
          ...state,
          display: formatNumber(result),
          previousOperand: result,
          currentOperand: null,
          operator: null,
          waitingForOperand: true,
          lastOperation: {
            operator: state.operator,
            operand: state.currentOperand,
          },
          pendingLowPriorityOperation: null,
        }
      } else if (state.lastOperation) {
        const result = calculate(
          parseFloat(state.display.replace(/\./g, '').replace(',', '.')),
          state.lastOperation.operand,
          state.lastOperation.operator,
        )
        if (Number.isNaN(result)) {
          return {
            ...state,
            display: 'Error',
            previousOperand: null,
            currentOperand: null,
            operator: null,
            waitingForOperand: true,
          }
        }
        return {
          ...state,
          display: formatNumber(result),
          previousOperand: result,
          currentOperand: null,
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
  const [state, dispatch] = React.useReducer(calculatorReducer, initialState)

  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    const key = event.key

    if (/^[0-9]$/.test(key)) {
      dispatch({ type: 'INPUT_DIGIT', payload: key })
    } else if (key === ',') {
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

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  const buttonClass =
    'w-[52px] h-[52px] rounded-full focus:outline-none flex justify-center items-center font-sf-pro'
  const operatorButtonClass = cn(
    buttonClass,
    'bg-[#FF9D0A] text-white text-[28px]',
  )
  const numberButtonClass = cn(buttonClass, 'bg-[#333333] text-white text-2xl')
  const functionButtonClass = cn(buttonClass, 'bg-[#A5A5A5] text-black text-xl')

  const fontSizeClass = getFontSizeClass(state.display)

  return (
    <div className="w-[286px] h-[586px] relative">
      <Image
        src="/playground/ios-calculator/iphone-15.png"
        alt="iphone 15"
        width={661}
        height={1355}
      />
      <div className="absolute w-full top-6 px-8 left-0 flex justify-between items-center">
        {/* <span className="font-sf-pro-semibold text-[12px]">12:33</span> */}
        <TimeDisplay />
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="9"
            fill="none"
            viewBox="0 0 13 9"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M11.704.545c-.621 0-1.125.504-1.125 1.126v5.777a1.125 1.125 0 002.251 0V1.671c0-.622-.504-1.126-1.126-1.126zM7.053 3.471a1.125 1.125 0 012.25 0v3.977a1.125 1.125 0 11-2.25 0V3.47zm-2.326.6c-.622 0-1.125.504-1.125 1.126v2.25a1.125 1.125 0 102.25 0v-2.25c0-.622-.503-1.125-1.125-1.125zM1.125 5.573C.504 5.572 0 6.076 0 6.698v.75a1.125 1.125 0 002.25 0v-.75c0-.622-.503-1.126-1.125-1.126z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="9"
            fill="none"
            viewBox="0 0 12 9"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M6.146 2.02c1.676 0 3.287.643 4.502 1.798.091.09.238.088.328-.002l.874-.883a.243.243 0 00-.002-.345 8.241 8.241 0 00-11.405 0 .243.243 0 00-.002.345l.875.883c.09.09.236.091.327.002A6.535 6.535 0 016.146 2.02zm0 2.87c.92 0 1.809.342 2.491.96a.235.235 0 00.328-.004l.873-.882a.244.244 0 00-.003-.347 5.414 5.414 0 00-7.376 0 .244.244 0 00-.003.347l.873.882c.09.09.235.092.328.004a3.711 3.711 0 012.49-.96zm1.678 2.106a.237.237 0 00-.007-.346 2.588 2.588 0 00-3.342 0 .238.238 0 00-.008.346L5.978 8.52a.236.236 0 00.335 0l1.51-1.524z"
              clipRule="evenodd"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="9"
            fill="none"
            viewBox="0 0 20 9"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M3.328 0h11.119c.936 0 1.276.097 1.618.28.342.184.61.452.794.795.183.342.28.681.28 1.618v3.241c0 .937-.097 1.276-.28 1.619a1.909 1.909 0 01-.794.794c-.343.183-.682.28-1.618.28H3.327c-.935 0-1.275-.097-1.617-.28a1.909 1.909 0 01-.794-.794C.733 7.21.636 6.87.636 5.934V2.693c0-.937.097-1.276.28-1.618.183-.343.451-.611.794-.794C2.052.097 2.392 0 3.328 0zm0 .75c-.74 0-.999.05-1.265.192a1.159 1.159 0 00-.486.486c-.142.266-.192.524-.192 1.265v3.242c0 .74.05.998.192 1.264.113.212.275.373.486.486.266.142.524.192 1.265.192h11.119c.74 0 .998-.05 1.264-.192.212-.113.373-.274.486-.486.142-.266.192-.524.192-1.264V2.693c0-.74-.05-1-.192-1.265a1.158 1.158 0 00-.486-.486C15.445.8 15.187.75 14.447.75H3.327zM19.015 4.27c0 .927-1.125 1.5-1.125 1.5v-3s1.125.572 1.125 1.5z"
              clipRule="evenodd"
            />
            <rect
              width="13.504"
              height="5.752"
              x="2.136"
              y="1.438"
              fill="#fff"
              rx="1.982"
            />
          </svg>
        </div>
      </div>
      <div className="absolute w-[260px] left-0 right-0 mx-auto bottom-0">
        <div className="px-2 pb-12">
          <div
            className={cn(
              fontSizeClass,
              'text-[#cccccc] mb-3 font-sf-pro-light !leading-none px-2 h-16 flex items-center justify-end',
            )}
          >
            <span>{state.display}</span>
          </div>
          <div className="grid grid-cols-4 gap-[10px]">
            <button
              onClick={() => dispatch({ type: 'CLEAR_ALL' })}
              className={functionButtonClass}
            >
              C
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
