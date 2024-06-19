import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

//
// These lines left intentionally blank so line numbers below look more realistic in a screenshot of a PR
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

export async function signIn({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  })
  if (user === null) {
    throw new Error('User not found')
  }
  if (user.password === null) {
    throw new Error('User has no password')
  }

  const passwordMatch = await bcrypt.compare(password, user.password.hash)
  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  return user
}

export async function getPasswordHash(password: string) {
  return await bcrypt.hash(password, 10)
}
