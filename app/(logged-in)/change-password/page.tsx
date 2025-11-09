import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ChangePasswordForm from './change-password-form'

export default function ChangePassword() {
  return (
    <Card className='bg-grey-light w-[350px]'>
      <CardHeader>
        <CardTitle 
          className='font-medium uppercase text-center'
        >
          Change Password
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChangePasswordForm />
      </CardContent>
    </Card>
  )
}