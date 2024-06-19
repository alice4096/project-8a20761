import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const users = await prisma.user.findMany()
  // console.log(users)
  const passwords = await prisma.password.findUnique({
    where: {
      userId: 'clxle5mgy0000w43z5t569y8l',
    }
  })
  console.log('xxx passwords')
  console.log(passwords)
}

main().then(async () => await prisma.$disconnect()).catch(async e => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

