'use server'

import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { z } from 'zod'

export const registerUser = async ({
  email,
  password,
  passwordConfirm
}: {
  email: string
  password: string
  passwordConfirm: string
}) => {
  const newUserSchema = z.object({
    email: z.string().email(),
  }).and(passwordMatchSchema)  
  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    passwordConfirm
  })

}