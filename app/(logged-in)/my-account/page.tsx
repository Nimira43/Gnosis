import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default async function MyAccount() {
  const session = await auth()
  
  return (
    <Card className='bg-light-extra w-[350px]'>
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
      </CardContent>
    </Card>
  )
}