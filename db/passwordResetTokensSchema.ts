import { integer, pgTable, serial } from 'drizzle-orm/pg-core'
import { users } from './usersSchema'

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    
  })
})