import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import TwoFactorAuthForm from './two-factor-auth-form'
import db from '@/db/drizzle'
import { users } from '@/db/usersSchema'
import { eq } from 'drizzle-orm'

export default async function MyAccount() {
  const session = await auth()
  const [user] = await db
    .select({
      twoFactorActivated: users.twoFactorActivated
    })
    .from(users)
    .where(eq(users.id, parseInt(session?.user?.id!)))
  
  return (
    <Card className='bg-grey-light w-[350px]'>
      <CardHeader>
        <CardTitle 
          className='font-medium uppercase text-center'
        >
          My Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Email Address</Label>
        <div className='font-normal text-sm'>
          {session?.user?.email}
        </div>
        <TwoFactorAuthForm 
          twoFactorActivated={user.twoFactorActivated ?? false}
        />
      </CardContent>
    </Card>
  )
}