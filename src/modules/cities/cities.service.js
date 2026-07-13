import { prisma } from "../../lib/prisma.js";

export async function listCities() {
  return prisma.city.findMany({
    where: {
      isActive: true
    },
    orderBy: { name: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      isActive: true,
      _count: {
        select: {
          courses: true,
          sections: true,
          leads: true
        }
      }
    }
  });
}
