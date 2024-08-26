'use client'

import * as React from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { cn } from '@/utils/cn'
import iphoneFrameImg from './assets/images/iphone-15.png'
import { useCalculator } from './hooks/use-calculator'
import IphoneIcons from './iphone-icons'
import { ActionType } from './reducers/calculator-reducer'
import TimeDisplay from './time-display'
import { getFontSizeClass } from './utils/get-font-size-class'
import './stylesheet.css'

const IosCalculator: React.FC = () => {
  const { state, dispatch } = useCalculator()

  const buttonClass =
    'w-[52px] h-[52px] rounded-full focus:outline-none flex justify-center items-center font-sf-pro'
  const operatorButtonClass = (operator: string) =>
    cn(
      buttonClass,
      'text-[28px] transition-colors duration-500 active:bg-[#fcc78d]',
      state.selectedOperator === operator
        ? 'bg-white text-[#FF9D0A] active:bg-white active:text-[#FF9D0A]'
        : 'bg-[#FF9D0A] text-white',
    )
  const numberButtonClass = cn(
    buttonClass,
    'bg-[#333333] text-white text-2xl active:bg-[#737373] transition-[background-color] duration-500 ease-out active:duration-0',
  )
  const functionButtonClass = cn(
    buttonClass,
    'bg-[#A5A5A5] text-black text-xl active:bg-[#d9d9d9] transition-[background-color] duration-500 ease-out active:duration-0',
  )

  const fontSizeClass = getFontSizeClass(state.display)

  // Function to format the display, replacing minus sign with en dash for negative numbers
  const formatDisplay = (display: string) => {
    return display.startsWith('-') ? `–${display.slice(1)}` : display
  }

  return (
    <div className="relative h-[586px] w-[286px] select-none">
      <Image
        src={iphoneFrameImg}
        alt="iphone 15"
        width={661}
        height={1355}
        priority
      />
      <div className="absolute left-0 top-5 flex h-6 w-full items-center justify-between px-10">
        <div>
          <TimeDisplay />
        </div>
        <IphoneIcons />
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto w-[260px]">
        <div className="px-2 pb-12">
          <div
            className={cn(
              fontSizeClass,
              'font-sf-pro-light mb-3 flex h-16 items-center justify-end px-2 !leading-none text-[#cccccc]',
            )}
          >
            <span>{formatDisplay(state.display)}</span>
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
              className={operatorButtonClass('÷')}
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
              className={operatorButtonClass('×')}
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
              className={operatorButtonClass('-')}
            >
              –
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
              className={operatorButtonClass('+')}
            >
              +
            </button>

            <button
              onClick={() =>
                dispatch({ type: ActionType.INPUT_DIGIT, payload: '0' })
              }
              className={cn(
                numberButtonClass,
                'col-span-2 w-auto justify-start pl-6',
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
              className={operatorButtonClass('=')}
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
