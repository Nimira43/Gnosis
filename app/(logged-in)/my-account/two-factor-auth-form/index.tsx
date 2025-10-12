'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { get2faSecret } from './actions'
import { useToast } from '@/hooks/use-toast'
import { QRCodeSVG } from 'qrcode.react'

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
            <div>
              <p className='text-xs text-muted-foreground py-2'>
                Scan the QR code below using the Google Authenticator app to activate Two-Factor Authentication.
              </p>
              <QRCodeSVG value={code} />
              <Button>I have scanned the QR Code</Button>
              <Button>Cancel</Button>
            </div>
          }
        </div>
      }
    </div>
  )
}