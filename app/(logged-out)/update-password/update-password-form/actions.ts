'use server'

import { auth } from '@/auth'

export const updatePassword = async ({
  token,
  password,
  passwordConfirm
}: {
  token: string
  password: string
  passwordConfirm: string
}) => {
  const session = await auth()
  
  if(session?.user?.id) {
    return {
      error: true
    }
  }
  
}