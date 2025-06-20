'use client'

import { passwordMatchSchema } from '@/validation/passwordMatchSchema'
import { passwordSchema } from '@/validation/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  currentPassword: passwordSchema
}).and(passwordMatchSchema)

export default function ChangePasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <div>ChangePasswordForm</div>
  )
}


