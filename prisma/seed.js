import { PrismaClient, AdminRole, PublishStatus } from "@prisma/client";
import { hashPassword } from "../src/utils/auth.js";

const prisma = new PrismaClient();

async function main() {
  const mumbai = await prisma.city.upsert({
    where: { slug: "mumbai" },
    update: { name: "Mumbai", isActive: true },
    create: { slug: "mumbai", name: "Mumbai", isActive: true }
  });

  await prisma.city.updateMany({
    where: {
      slug: {
        not: "mumbai"
      }
    },
    data: {
      isActive: false
    }
  });

  await prisma.siteSetting.upsert({
    where: { key: "brand" },
    update: {
      valueJson: {
        lightLogo: "/DigiNext-02.png",
        darkLogo: "/DigiNext-01.png",
        supportEmail: "info@diginext.example",
        supportPhone: "+91 98765 43210"
      }
    },
    create: {
      key: "brand",
      valueJson: {
        lightLogo: "/DigiNext-02.png",
        darkLogo: "/DigiNext-01.png",
        supportEmail: "info@diginext.example",
        supportPhone: "+91 98765 43210"
      }
    }
  });

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

  await prisma.course.upsert({
    where: { slug: "ai-powered-digital-marketing-course" },
    update: {
      title: "AI-Powered Digital Marketing Course",
      cityId: mumbai.id,
      shortDescription: "Built by marketers, taught inside an agency.",
      durationText: "12 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    },
    create: {
      cityId: mumbai.id,
      title: "AI-Powered Digital Marketing Course",
      slug: "ai-powered-digital-marketing-course",
      shortDescription: "Built by marketers, taught inside an agency.",
      durationText: "12 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    }
  });

  await prisma.course.upsert({
    where: { slug: "data-science-machine-learning-course" },
    update: {
      title: "Data Science & Machine Learning Course",
      cityId: mumbai.id,
      shortDescription: "Built by analysts, taught inside a working tech team.",
      durationText: "10 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    },
    create: {
      cityId: mumbai.id,
      title: "Data Science & Machine Learning Course",
      slug: "data-science-machine-learning-course",
      shortDescription: "Built by analysts, taught inside a working tech team.",
      durationText: "10 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    }
  });

  await prisma.course.upsert({
    where: { slug: "devops-with-aws-azure" },
    update: {
      title: "DevOps with AWS & Azure",
      cityId: mumbai.id,
      shortDescription: "Real infrastructure. Real deployments. Real results.",
      durationText: "10 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    },
    create: {
      cityId: mumbai.id,
      title: "DevOps with AWS & Azure",
      slug: "devops-with-aws-azure",
      shortDescription: "Real infrastructure. Real deployments. Real results.",
      durationText: "10 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    }
  });

  await prisma.course.upsert({
    where: { slug: "web-full-stack-development" },
    update: {
      title: "Web Full Stack Development",
      cityId: mumbai.id,
      shortDescription: "Frontend. Backend. Deploy. All-in-One Bootcamp.",
      durationText: "10 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
    },
    create: {
      cityId: mumbai.id,
      title: "Web Full Stack Development",
      slug: "web-full-stack-development",
      shortDescription: "Frontend. Backend. Deploy. All-in-One Bootcamp.",
      durationText: "10 Weeks",
      deliveryMode: "Offline in Mumbai",
      status: PublishStatus.PUBLISHED
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
