'use server'

import { auth } from "@/auth"

export const changePassword = async ({
  currentPassword,
  password,
  passwordConfirm
}: {
  currentPassword: string
  password: string
  passwordConfirm: string
}) => {
  const session = await auth()

  if(!session?.user?.id) {
    return {
      error: true,
      mmessage: 'You must be logged in to change you password.'
    }
  }
}