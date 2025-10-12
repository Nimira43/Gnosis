'use client'

import { useState } from 'react'

type Props = {
  twoFactorActivated: boolean
}

export default function TwoFactorAuthForm({twoFactorActivated} : Props) {
  const [isActivated, setIsActivated] = useState

  return (
    <div>2FA Form</div>
  )
}