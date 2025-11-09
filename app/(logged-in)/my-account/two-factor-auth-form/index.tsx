'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { activate2fa, get2faSecret } from './actions'
import { useToast } from '@/hooks/use-toast'
import { QRCodeSVG } from 'qrcode.react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'

type Props = {
  twoFactorActivated: boolean
}

export default function TwoFactorAuthForm({twoFactorActivated} : Props) {
  const {toast} = useToast()
  const [isActivated, setIsActivated] = useState(twoFactorActivated)
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')
  const [otp, setOtp] = useState('')

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

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await activate2fa(otp)

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.message
      })
      return
    }
    toast({
      className: 'bg-green-500 text-light',
      title: 'Two-Factor Authentication has been enabled',
    })

    setIsActivated(true)
  }

  return (
    <div>
      {!!isActivated && 
        <Button 
          className='uppercase'
        >
          Disable 2FA
        </Button>
      }
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
            <form 
              className='flex flex-col gap-2'
              onSubmit={handleOTPSubmit}
            >
              <p className='text-xs text-muted-foreground'>
                Please enter the one-time password from Google Authenticator...
              </p>
              <InputOTP 
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />          
                </InputOTPGroup>
              </InputOTP>
              <Button 
                disabled={otp.length !== 6}
                type='submit'
              >
                Submit and Activate
              </Button>
              <Button 
                onClick={() => setStep(2)}
                variant='outline'
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
      }
    </div>
  )
}