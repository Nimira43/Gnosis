'use server'

import { auth } from "@/auth"
import db from "@/db/drizzle"
import { users } from "@/db/usersSchema"
import { eq } from "drizzle-orm"

export const get2faSecret = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'true',
      message: 'Unauthorised'
    }
  }

  const [user] = await db.select({
    twoFactorSecret: users.twoFactorSecret,
  }).from(users).where(eq(users.id, parseInt(session.user.id)))
}