import { formatNumber } from '../utils/format-number'
import { calculate } from '../utils/calculate'
import { countSignificantDigits } from '../utils/count-significant-digits'
import { isHighPriorityOperation } from '../utils/is-high-priority-operation'
import {
  MAX_DISPLAY_DIGITS,
  DECIMAL_SEPARATOR,
  ERROR_MESSAGE,
} from '../utils/constants'

export enum ActionType {
  INPUT_DIGIT = 'INPUT_DIGIT',
  INPUT_DECIMAL = 'INPUT_DECIMAL',
  CLEAR_ALL = 'CLEAR_ALL',
  INPUT_PERCENT = 'INPUT_PERCENT',
  TOGGLE_SIGN = 'TOGGLE_SIGN',
  PERFORM_OPERATION = 'PERFORM_OPERATION',
  HANDLE_EQUALS = 'HANDLE_EQUALS',
}

export type State = {
  display: string
  previousOperand: number | null
  currentOperand: number | null
  operator: string | null
  waitingForOperand: boolean
  lastOperation: { operator: string; operand: number } | null
  pendingLowPriorityOperation: { operator: string; operand: number } | null
}

export type Action =
  | { type: ActionType.INPUT_DIGIT; payload: string }
  | { type: ActionType.INPUT_DECIMAL }
  | { type: ActionType.CLEAR_ALL }
  | { type: ActionType.INPUT_PERCENT }
  | { type: ActionType.TOGGLE_SIGN }
  | { type: ActionType.PERFORM_OPERATION; payload: string }
  | { type: ActionType.HANDLE_EQUALS }

export const initialState: State = {
  display: '0',
  previousOperand: null,
  currentOperand: null,
  operator: null,
  waitingForOperand: false,
  lastOperation: null,
  pendingLowPriorityOperation: null,
}

export const calculatorReducer = (state: State, action: Action): State => {
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
          newDisplay = state.display.replace('–', '-') + action.payload
        } else {
          const currentNum = parseFloat(
            state.display.replace(/\./g, '').replace('–', '-'),
          )
          const newNum =
            currentNum * 10 +
            (currentNum < 0
              ? -parseInt(action.payload)
              : parseInt(action.payload))
          newDisplay = formatNumber(newNum)
        }

        if (
          countSignificantDigits(newDisplay.replace('–', '')) >
          MAX_DISPLAY_DIGITS
        ) {
          return state // Ignore input if it would exceed MAX_DISPLAY_DIGITS significant digits
        }
        return {
          ...state,
          display: newDisplay,
          currentOperand: parseFloat(
            newDisplay
              .replace(/\./g, '')
              .replace(DECIMAL_SEPARATOR, '.')
              .replace('–', '-'),
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
        state.display
          .replace(/\./g, '')
          .replace(DECIMAL_SEPARATOR, '.')
          .replace('–', '-'),
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
        state.display
          .replace(/\./g, '')
          .replace(DECIMAL_SEPARATOR, '.')
          .replace('–', '-'),
      )
      const toggledValue = -currentNum
      const newDisplay = formatNumber(toggledValue).replace('-', '–')
      if (
        countSignificantDigits(newDisplay.replace('–', '')) > MAX_DISPLAY_DIGITS
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
            state.display
              .replace(/\./g, '')
              .replace(DECIMAL_SEPARATOR, '.')
              .replace('–', '-'),
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
            state.display
              .replace(/\./g, '')
              .replace(DECIMAL_SEPARATOR, '.')
              .replace('–', '-'),
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
      return state // If no operation can be performed, return the current state
    default:
      return state // Handle any unknown action types
  }
}
