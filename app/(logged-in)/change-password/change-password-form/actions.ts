'use server'

import { auth } from '@/auth'
import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { passwordSchema } from '@/validation/passwordSchema'
import { z } from 'zod'

export const changePassword = async ({
  currentPassword,
  password,
  passwordConfirm
}: {
  currentPassword: string
  password: string
  passwordConfirm: string
}) => {
  const session = await auth()

  if(!session?.user?.id) {
    return {
      error: true,
      mmessage: 'You must be logged in to change you password.'
    }
  }

  const formSchema = z.object({
    currentPassword: passwordSchema
  }).and(passwordMatchSchema)
}