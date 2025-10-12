'use client'

import { useState } from 'react'

type Props = {
  twoFactorActivated: boolean
}

export default function TwoFactorAuthForm({twoFactorActivated} : Props) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated)
  const [step, setStep] = useState(1)


  return (
    <div>
      {!isActivated &&
        <div>

        </div>
      }
    </div>
  )
}