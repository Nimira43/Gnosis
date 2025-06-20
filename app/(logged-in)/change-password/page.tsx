import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import ChangePasswordForm from './change-password-form'

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
      <ChangePasswordForm />
      
    </Card>
  )
}