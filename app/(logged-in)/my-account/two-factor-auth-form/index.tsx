'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { get2faSecret } from './actions'
import { useToast } from '@/hooks/use-toast'

type Props = {
  twoFactorActivated: boolean
}

export default function TwoFactorAuthForm({twoFactorActivated} : Props) {
  const {toast} = useToast()
  const [isActivated, setIsActivated] = useState(twoFactorActivated)
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')

  const handleEnableClick = async () => {
    const response = await get2faSecret()

    if (response.error) {
      toast({
        variant: 'destructive',
        title: response.message
      })
      return
    }
    setStep(2)
    setCode(response.twoFactorSecret ?? '')
  }

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
          {step === 2 &&
            <div>Display QR Code</div>
          }
        </div>
      }
    </div>
  )
}