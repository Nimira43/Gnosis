'use server'

import { passwordSchema } from '@/validation/passwordSchema'
import { z } from 'zod'

export const loginWithCredentials = async({ 
  email, 
  password
}: {
  email: string
  password: string
}) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: passwordSchema
    })
  
    const loginValidation = loginSchema.safeParse({
      email,
      password,
    })

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.issues[0]?.message ?? 'An error occurred.'
      }
    }
  
    const hashedPassword = await hash(password, 10)
    await db.insert(users).values({
      email,
      password: hashedPassword
    })
  } catch (e: any) {
    if (e.code === '23505') {
      return {
        error: true,
        message: 'An account is already registered with that email address.'
      }
    }
    return {
      error: true,
      message: 'Oh no! Something went wrong.'
    }
  }
}