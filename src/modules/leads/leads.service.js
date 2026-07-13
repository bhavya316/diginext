import { prisma } from "../../lib/prisma.js";

export async function listLeads({ status, cityId }) {
  const where = {
    ...(status ? { status } : {}),
    ...(cityId ? { cityId } : {})
  };

  return prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      originLocation: true,
      source: true,
      status: true,
      interest: true,
      requestedAsset: true,
      brochureUrl: true,
      message: true,
      createdAt: true,
      city: { select: { name: true } },
      course: { select: { title: true } }
    }
  });
}

export async function createLead(payload) {
  return prisma.lead.create({
    data: {
      cityId: payload.cityId,
      courseId: payload.courseId,
      source: payload.source,
      name: payload.name,
      email: payload.email || null,
      phone: payload.phone,
      originLocation: payload.originLocation || null,
      interest: payload.interest || null,
      requestedAsset: payload.requestedAsset || null,
      brochureUrl: payload.brochureUrl || null,
      message: payload.message || null
    },
    select: {
      id: true,
      name: true,
      source: true,
      status: true,
      createdAt: true
    }
  });
}
