'use client'

import { Button } from '@/components/ui/button'
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
          {step === 1 &&
            <Button
              onClick={handleEnableClick}
            >
              Enable Two-Factor Authentication
            </Button>
          }
        </div>
      }
    </div>
  )
}