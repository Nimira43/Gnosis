'use server'

import { auth } from "@/auth"

export const get2faSecret = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'true',
      message: 'Unauthorised'
    }

  }
}