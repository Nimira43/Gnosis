'use client'

import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { passwordSchema } from '@/validation/passwordSchema'
import { z } from 'zod'

const formSchema = z.object({
  currentPassword: passwordSchema
}).and(passwordMatchSchema)

export default function ChangePasswordForm() {
  return (
    <div>ChangePasswordForm</div>
  )
}


