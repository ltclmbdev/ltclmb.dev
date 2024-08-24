'use client'

import * as React from 'react'
import Calculator from '@/components/playground/ios-calculator/ios-calculator'

export default function CalculatorPage() {
  return (
    <div className="container pb-16 md:pb-24 lg:pb-40 pt-8 md:pt-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        iOS Calculator App
      </h1>
      <div className="mt-20 flex justify-center">
        <Calculator />
      </div>
    </div>
  )
}
