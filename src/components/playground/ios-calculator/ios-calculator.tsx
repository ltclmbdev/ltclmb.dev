'use client'

import * as React from 'react'
import Image from 'next/image'

import { cn } from '@/utils/cn'
import { Icon } from '@/components/icons'

import { getFontSizeClass } from './utils/get-font-size-class'
import { ActionType } from './reducers/calculator-reducer'
import { useCalculator } from './hooks/use-calculator'

import TimeDisplay from './time-display'
import IphoneIcons from './iphone-icons'
import iphoneFrameImg from './assets/images/iphone-15.png'

import './stylesheet.css'

const IosCalculator: React.FC = () => {
  const { state, dispatch } = useCalculator()

  const buttonClass =
    'w-[52px] h-[52px] rounded-full focus:outline-none flex justify-center items-center font-sf-pro'
  const operatorButtonClass = cn(
    buttonClass,
    'bg-[#FF9D0A] text-white text-[28px]',
  )
  const numberButtonClass = cn(
    buttonClass,
    'bg-[#333333] text-white text-2xl active:bg-[#737373] transition-[background-color]  duration-500 ease-out active:duration-0',
  )
  const functionButtonClass = cn(
    buttonClass,
    'bg-[#A5A5A5] text-black text-xl active:bg-[#d9d9d9] transition-[background-color]  duration-500 ease-out active:duration-0',
  )

  const fontSizeClass = getFontSizeClass(state.display)

  return (
    <div className="w-[286px] h-[586px] relative select-none">
      <Image
        src={iphoneFrameImg}
        alt="iphone 15"
        width={661}
        height={1355}
        priority
      />
      <div className="absolute w-full top-5 px-10 left-0 flex justify-between items-center h-6">
        <div>
          <TimeDisplay />
        </div>
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
