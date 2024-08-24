import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { Icon } from '@/components/icons'
import TimeDisplay from './time-display'
import IphoneIcons from './iphone-icons'

import './stylesheet.css'

const MAX_DISPLAY_DIGITS = 9
const DECIMAL_SEPARATOR = ','
const ERROR_MESSAGE = 'Error'

enum ActionType {
  INPUT_DIGIT = 'INPUT_DIGIT',
  INPUT_DECIMAL = 'INPUT_DECIMAL',
  CLEAR_ALL = 'CLEAR_ALL',
  INPUT_PERCENT = 'INPUT_PERCENT',
  TOGGLE_SIGN = 'TOGGLE_SIGN',
  PERFORM_OPERATION = 'PERFORM_OPERATION',
  HANDLE_EQUALS = 'HANDLE_EQUALS',
}

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
  | { type: ActionType.INPUT_DIGIT; payload: string }
  | { type: ActionType.INPUT_DECIMAL }
  | { type: ActionType.CLEAR_ALL }
  | { type: ActionType.INPUT_PERCENT }
  | { type: ActionType.TOGGLE_SIGN }
  | { type: ActionType.PERFORM_OPERATION; payload: string }
  | { type: ActionType.HANDLE_EQUALS }

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
  const rounded = Number(num.toFixed(MAX_DISPLAY_DIGITS - 1))
  const [integerPart, decimalPart] = rounded.toString().split('.')

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  if (decimalPart) {
    const trimmedDecimal = decimalPart.replace(/0+$/, '')
    return trimmedDecimal
      ? `${formattedIntegerPart}${DECIMAL_SEPARATOR}${trimmedDecimal}`
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
    case ActionType.INPUT_DIGIT:
      if (state.display === ERROR_MESSAGE) {
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
        if (state.display.includes(DECIMAL_SEPARATOR)) {
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

        if (
          countSignificantDigits(newDisplay.replace('-', '')) >
          MAX_DISPLAY_DIGITS
        ) {
          return state // Ignore input if it would exceed MAX_DISPLAY_DIGITS significant digits
        }
        return {
          ...state,
          display: newDisplay,
          currentOperand: parseFloat(
            newDisplay.replace(/\./g, '').replace(DECIMAL_SEPARATOR, '.'),
          ),
        }
      }
    case ActionType.INPUT_DECIMAL:
      if (state.display === ERROR_MESSAGE) return initialState
      if (state.waitingForOperand) {
        return {
          ...state,
          display: `0${DECIMAL_SEPARATOR}`,
          currentOperand: 0,
          waitingForOperand: false,
        }
      } else if (!state.display.includes(DECIMAL_SEPARATOR)) {
        return {
          ...state,
          display: state.display + DECIMAL_SEPARATOR,
        }
      }
      return state
    case ActionType.CLEAR_ALL:
      return initialState
    case ActionType.INPUT_PERCENT:
      if (state.display === ERROR_MESSAGE) return initialState
      const currentValue = parseFloat(
        state.display.replace(/\./g, '').replace(DECIMAL_SEPARATOR, '.'),
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
    case ActionType.TOGGLE_SIGN:
      if (state.display === ERROR_MESSAGE) return initialState
      const currentNum = parseFloat(
        state.display.replace(/\./g, '').replace(DECIMAL_SEPARATOR, '.'),
      )
      const toggledValue = -currentNum
      const newDisplay = formatNumber(toggledValue)
      if (
        countSignificantDigits(newDisplay.replace('-', '')) > MAX_DISPLAY_DIGITS
      ) {
        return state
      }
      return {
        ...state,
        display: newDisplay,
        currentOperand: toggledValue,
      }
    case ActionType.PERFORM_OPERATION:
      if (state.display === ERROR_MESSAGE) return initialState
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
              display: ERROR_MESSAGE,
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
                  display: ERROR_MESSAGE,
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
                display: ERROR_MESSAGE,
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
            state.display.replace(/\./g, '').replace(DECIMAL_SEPARATOR, '.'),
          ),
          currentOperand: null,
          operator: action.payload,
          waitingForOperand: true,
        }
      }
    case ActionType.HANDLE_EQUALS:
      if (state.display === ERROR_MESSAGE) return initialState
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
            display: ERROR_MESSAGE,
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
              display: ERROR_MESSAGE,
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
          parseFloat(
            state.display.replace(/\./g, '').replace(DECIMAL_SEPARATOR, '.'),
          ),
          state.lastOperation.operand,
          state.lastOperation.operator,
        )
        if (Number.isNaN(result)) {
          return {
            ...state,
            display: ERROR_MESSAGE,
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
    <div className="w-[286px] h-[586px] relative select-none">
      <Image
        src="/playground/ios-calculator/iphone-15.png"
        alt="iphone 15"
        width={661}
        height={1355}
      />
      <div className="absolute w-full top-6 px-8 left-0 flex justify-between items-center">
        <TimeDisplay />
        <IphoneIcons />
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
              onClick={() => dispatch({ type: ActionType.CLEAR_ALL })}
              className={functionButtonClass}
            >
              C
            </button>
            <button
              onClick={() => dispatch({ type: ActionType.TOGGLE_SIGN })}
              className={functionButtonClass}
            >
              <Icon name="PlusMinus" size="20" />
            </button>
            <button
              onClick={() => dispatch({ type: ActionType.INPUT_PERCENT })}
              className={functionButtonClass}
            >
              %
            </button>
            <button
              onClick={() =>
                dispatch({ type: ActionType.PERFORM_OPERATION, payload: '÷' })
              }
              className={operatorButtonClass}
            >
              ÷
            </button>

            {[7, 8, 9].map(digit => (
              <button
                key={digit}
                onClick={() =>
                  dispatch({
                    type: ActionType.INPUT_DIGIT,
                    payload: digit.toString(),
                  })
                }
                className={numberButtonClass}
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({ type: ActionType.PERFORM_OPERATION, payload: '×' })
              }
              className={operatorButtonClass}
            >
              ×
            </button>

            {[4, 5, 6].map(digit => (
              <button
                key={digit}
                onClick={() =>
                  dispatch({
                    type: ActionType.INPUT_DIGIT,
                    payload: digit.toString(),
                  })
                }
                className={numberButtonClass}
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({ type: ActionType.PERFORM_OPERATION, payload: '-' })
              }
              className={operatorButtonClass}
            >
              -
            </button>

            {[1, 2, 3].map(digit => (
              <button
                key={digit}
                onClick={() =>
                  dispatch({
                    type: ActionType.INPUT_DIGIT,
                    payload: digit.toString(),
                  })
                }
                className={numberButtonClass}
              >
                {digit}
              </button>
            ))}
            <button
              onClick={() =>
                dispatch({ type: ActionType.PERFORM_OPERATION, payload: '+' })
              }
              className={operatorButtonClass}
            >
              +
            </button>

            <button
              onClick={() =>
                dispatch({ type: ActionType.INPUT_DIGIT, payload: '0' })
              }
              className={cn(
                numberButtonClass,
                'col-span-2 w-auto pl-6 justify-start',
              )}
            >
              0
            </button>
            <button
              onClick={() => dispatch({ type: ActionType.INPUT_DECIMAL })}
              className={numberButtonClass}
            >
              ,
            </button>
            <button
              onClick={() => dispatch({ type: ActionType.HANDLE_EQUALS })}
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
