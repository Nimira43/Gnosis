'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { get2faSecret } from './actions'
import { useToast } from '@/hooks/use-toast'
import { QRCodeSVG } from 'qrcode.react'
import { InputOTP, InputOTPGroup, InputOTPSeparator } from '@/components/ui/input-otp'

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
              className='w-full my-2'
              onClick={handleEnableClick}
            >
              Enable Two-Factor Authentication
            </Button>
          }
          {step === 2 && (
            <div>
              <p className='text-xs text-muted-foreground py-2'>
                Scan the QR code below using the Google Authenticator app to activate Two-Factor Authentication.
              </p>
              <QRCodeSVG value={code} />
              <Button
                className='w-full my-2'
                onClick={() => setStep(3)}
              >
                I have scanned the QR Code
              </Button>
              <Button
                className='w-full my-2'
                onClick={() => setStep(1)}
                variant='outline'
              >
                Cancel
              </Button>
            </div>
          )}
          {step === 3 && (
            <form>
              <p className='text-xs text-muted-foreground'>
                Please enter the one-time password from Google Authenticator...
              </p>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                </InputOTPGroup>
              </InputOTP>
            </form>
          )}
        </div>
      }
    </div>
  )
}