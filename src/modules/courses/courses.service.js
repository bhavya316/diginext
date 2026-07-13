import { prisma } from "../../lib/prisma.js";

const courseSelect = {
  id: true,
  title: true,
  slug: true,
  status: true,
  shortDescription: true,
  durationText: true,
  deliveryMode: true,
  brochureUrl: true,
  isFeatured: true,
  sortOrder: true,
  city: {
    select: { id: true, name: true, slug: true }
  },
  faqs: {
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      question: true,
      answer: true,
      sortOrder: true,
      status: true
    }
  },
  _count: {
    select: { modules: true, leads: true }
  }
};

function mapFaqsForWrite(faqs, cityId, fallbackStatus) {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return [];
  }

  return faqs.map((faq, index) => ({
    cityId,
    question: faq.question,
    answer: faq.answer,
    sortOrder: faq.sortOrder ?? index,
    status: faq.status ?? fallbackStatus ?? "PUBLISHED"
  }));
}

export async function listCourses(filters) {
  return prisma.course.findMany({
    where: {
      ...(filters.cityId ? { cityId: filters.cityId } : {}),
      ...(filters.status ? { status: filters.status } : {})
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: courseSelect
  });
}

export async function createCourse(payload) {
  return prisma.course.create({
    data: {
      cityId: payload.cityId,
      title: payload.title,
      slug: payload.slug,
      shortDescription: payload.shortDescription || null,
      durationText: payload.durationText || null,
      deliveryMode: payload.deliveryMode || null,
      brochureUrl: payload.brochureUrl || null,
      sortOrder: payload.sortOrder ?? 0,
      isFeatured: payload.isFeatured ?? false,
      status: payload.status ?? "DRAFT",
      ...(payload.faqs
        ? {
            faqs: {
              create: mapFaqsForWrite(payload.faqs, payload.cityId, payload.status ?? "DRAFT")
            }
          }
        : {})
    },
    select: courseSelect
  });
}

export async function updateCourse(id, payload) {
  return prisma.course.update({
    where: { id },
    data: {
      ...(payload.cityId ? { cityId: payload.cityId } : {}),
      ...(payload.title !== undefined ? { title: payload.title } : {}),
      ...(payload.slug !== undefined ? { slug: payload.slug } : {}),
      ...(payload.shortDescription !== undefined ? { shortDescription: payload.shortDescription || null } : {}),
      ...(payload.durationText !== undefined ? { durationText: payload.durationText || null } : {}),
      ...(payload.deliveryMode !== undefined ? { deliveryMode: payload.deliveryMode || null } : {}),
      ...(payload.brochureUrl !== undefined ? { brochureUrl: payload.brochureUrl || null } : {}),
      ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
      ...(payload.isFeatured !== undefined ? { isFeatured: payload.isFeatured } : {}),
      ...(payload.status !== undefined ? { status: payload.status } : {}),
      ...(payload.faqs !== undefined
        ? {
            faqs: {
              deleteMany: {},
              ...(payload.faqs.length > 0
                ? {
                    create: mapFaqsForWrite(
                      payload.faqs,
                      payload.cityId,
                      payload.status
                    )
                  }
                : {})
            }
          }
        : {})
    },
    select: courseSelect
  });
}
