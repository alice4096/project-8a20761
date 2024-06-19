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

export async function requestPasswordReset(email: string) {
  // TODO
}

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

const PASSWORD_RESET_TOKEN_EXPIRATION = 1000 * 60 * 20 // 20 minutes

export async function resetPassword({
  newPassword,
  passwordResetToken,
  userId,
}: {
  newPassword: string
  passwordResetToken: string
  userId: string
}) {
  return prisma.$transaction(async prisma => {
    // throws if the reset token wasn't issued for this user or has expired
    await prisma.passwordResetToken.delete({
      where: {
        createdAt: {
          gte: new Date(Date.now() - PASSWORD_RESET_TOKEN_EXPIRATION),
        },
        token: passwordResetToken,
        userId,
      },
    })

    const hashedPassword = await getPasswordHash(newPassword)

    // throws if record is not updated as expected
    await prisma.password.update({
      where: { userId },
      data: {
        createdAt: new Date(),
        hash: hashedPassword,
        userId,
      },
    })

    await prisma.apiKey.deleteMany({ where: { userId } })
  })
}
