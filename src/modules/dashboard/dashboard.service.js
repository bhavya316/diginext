import { prisma } from "../../lib/prisma.js";

export async function getDashboardSnapshot() {
  const [cities, courses, leadsByStatus, recentLeads] = await Promise.all([
    prisma.city.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        slug: true,
        name: true,
        _count: { select: { leads: true, courses: true } }
      },
      orderBy: { name: "asc" }
    }),
    prisma.course.count({
      where: { status: "PUBLISHED" }
    }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: { _all: true }
    }),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        phone: true,
        status: true,
        source: true,
        createdAt: true,
        city: { select: { name: true } },
        course: { select: { title: true } }
      }
    })
  ]);

  return {
    cities,
    publishedCourses: courses,
    leadsByStatus,
    recentLeads
  };
}
