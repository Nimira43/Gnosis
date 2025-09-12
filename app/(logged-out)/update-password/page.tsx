import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import db from '@/db/drizzle'
import { passwordResetTokens } from '@/db/passwordResetTokensSchema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

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
    const now = Date.now()

    if (
      !!passwordResetToken?.tokenExpiry && 
      now < passwordResetToken.tokenExpiry.getTime()
    ) {
      tokenIsValid = true
    }
  }

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>
            {
              tokenIsValid
                ? 'Update password'
                : 'Your password reset link is invalid or has expired.'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {
            tokenIsValid 
              ? 
                <div>
                  Update Password Form
                </div> 
              : 
                <Link 
                  href='/password-reset'
                  className='uppercase'
                >
                  
                  Request another password reset link
                </Link>
          }
        </CardContent>
      </Card>
    </main>
  )
}