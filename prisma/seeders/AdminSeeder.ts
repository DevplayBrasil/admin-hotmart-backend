import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AdminSeederSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    const safePassword = await Hash.make("123qweQ!")

    await prisma.user.upsert({
      where: { email: 'admin@devplay.com.br' },
      update: {},
      create: {
        email: 'admin@devplay.com.br',
        role: "ADMIN",
        password: safePassword,
        name: 'Administrador',
      },
    });
  }
}
