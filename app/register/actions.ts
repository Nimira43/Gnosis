'use server'

import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { z } from 'zod'
import { hash } from 'bcryptjs'
import db from '@/db/drizzle'
import { users } from '@/db/usersSchema'

export const registerUser = async ({
  email,
  password,
  passwordConfirm
}: {
  email: string
  password: string
  passwordConfirm: string
}) => {
  try {
    const newUserSchema = z.object({
      email: z.string().email(),
    }).and(passwordMatchSchema)
  
    const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      passwordConfirm
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