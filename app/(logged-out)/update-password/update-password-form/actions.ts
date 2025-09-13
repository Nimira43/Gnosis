'use server'

import { auth } from '@/auth'
import db from '@/db/drizzle'
import { passwordResetTokens } from '@/db/passwordResetTokensSchema'
import { eq } from 'drizzle-orm'

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
      error: true,
      message: 'You are already logged in. Please logout to reset your password.'
    }
  }

  let tokenIsValid = false

  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(
        eq(
          passwordResetTokens
            .token, token
        )
      )
    const now = Date.now()

    if (
      !!passwordResetToken?.tokenExpiry && 
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      tokenIsValid = true
    }
  }

  if (!tokenIsValid) {
    return {
      error: true,
      message: 'Your token is invalid or expired.',
      tokenInvalid: true,
    }
  }
  
}