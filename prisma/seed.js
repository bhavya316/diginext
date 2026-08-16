import { PrismaClient, AdminRole, PublishStatus } from "@prisma/client";
import { hashPassword } from "../src/utils/auth.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@diginext.local" },
    update: {
      name: "DigiNext Admin",
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
      passwordHash: hashPassword("DigiNext@123")
    },
    create: {
      name: "DigiNext Admin",
      email: "admin@diginext.local",
      passwordHash: hashPassword("DigiNext@123"),
      role: AdminRole.SUPER_ADMIN,
      isActive: true
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
