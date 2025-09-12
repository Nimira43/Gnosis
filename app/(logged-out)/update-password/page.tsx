import db from '@/db/drizzle'
import { passwordResetTokens } from '@/db/passwordResetTokensSchema'
import { eq } from 'drizzle-orm'

export default async function UpdatePassword({
  searchParams
}: {
  searchParams: {
    token?: string
  }
}) {
  let tokenIsValid = false
  const {token} = searchParams

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
  }

  return (
    <div>UpdatePassword</div>
  )
}