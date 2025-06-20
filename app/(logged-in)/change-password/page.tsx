import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function ChangePassword() {
  return (
    <Card className='bg-light-extra w-[350px]'>
      <CardHeader>
        <CardTitle 
          className='font-medium uppercase text-center'
        >
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Current Password</Label>
        <div className='font-normal text-sm'>
          BadPasswordPlaceholder
        </div>
      </CardContent>
      <CardContent>
        <Label>New Password</Label>
        <div className='font-normal text-sm'>
          WorstPasswordPlaceholder
        </div>
      </CardContent>
      <CardContent>
        <Label>Confirm Password</Label>
        <div className='font-normal text-sm'>
          WorstPasswordPlaceholder
        </div>
      </CardContent>
    </Card>
  )
}