import { prisma } from "../../lib/prisma.js";

export async function listSections(filters) {
  return prisma.pageSection.findMany({
    where: {
      ...(filters.cityId ? { cityId: filters.cityId } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.sectionKey ? { sectionKey: filters.sectionKey } : {})
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      sectionKey: true,
      title: true,
      subtitle: true,
      body: true,
      contentJson: true,
      sortOrder: true,
      isVisible: true,
      status: true,
      city: {
        select: { id: true, name: true, slug: true }
      }
    }
  });
}

export async function createSection(payload) {
  return prisma.pageSection.create({
    data: {
      cityId: payload.cityId ?? null,
      sectionKey: payload.sectionKey,
      title: payload.title || null,
      subtitle: payload.subtitle || null,
      body: payload.body || null,
      contentJson: payload.contentJson,
      sortOrder: payload.sortOrder ?? 0,
      isVisible: payload.isVisible ?? true,
      status: payload.status ?? "DRAFT"
    },
    select: {
      id: true,
      sectionKey: true,
      title: true,
      status: true,
      city: { select: { name: true, slug: true } }
    }
  });
}

export async function updateSection(id, payload) {
  return prisma.pageSection.update({
    where: { id },
    data: {
      ...(payload.cityId !== undefined ? { cityId: payload.cityId ?? null } : {}),
      ...(payload.sectionKey !== undefined ? { sectionKey: payload.sectionKey } : {}),
      ...(payload.title !== undefined ? { title: payload.title || null } : {}),
      ...(payload.subtitle !== undefined ? { subtitle: payload.subtitle || null } : {}),
      ...(payload.body !== undefined ? { body: payload.body || null } : {}),
      ...(payload.contentJson !== undefined ? { contentJson: payload.contentJson } : {}),
      ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
      ...(payload.isVisible !== undefined ? { isVisible: payload.isVisible } : {}),
      ...(payload.status !== undefined ? { status: payload.status } : {})
    },
    select: {
      id: true,
      sectionKey: true,
      title: true,
      subtitle: true,
      body: true,
      contentJson: true,
      sortOrder: true,
      isVisible: true,
      status: true,
      city: { select: { id: true, name: true, slug: true } }
    }
  });
}
