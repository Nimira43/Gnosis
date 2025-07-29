'use server'

import { auth } from '@/auth'

export const passwordReset = async (emailAddress: string) => {
  const session = await auth()
  
  if (!!session?.user?.id) {
    return {
      error: true,
      message: 'You are already logged in.'
    }
  }
}