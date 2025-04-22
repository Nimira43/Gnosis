'use server'

import { z } from 'zod'

export const registerUser = async ({
  email,
  password,
  passwordConfirm
}: {
  email: string
  password: string
  passwordConfirm: string
}) => {
  const newUserSchema = z.object()  
}