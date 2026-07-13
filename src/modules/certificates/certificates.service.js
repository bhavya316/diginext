import { prisma } from "../../lib/prisma.js";

function buildCertificateSelect() {
  return {
    id: true,
    title: true,
    imageUrl: true,
    sortOrder: true,
    isVisible: true,
    city: {
      select: {
        id: true,
        name: true,
        slug: true
      }
    }
  };
}

export async function listCertificates(filters) {
  return prisma.certificate.findMany({
    where: {
      ...(filters.cityId ? { cityId: filters.cityId } : {}),
      ...(filters.includeHidden ? {} : { isVisible: true })
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: buildCertificateSelect()
  });
}

export async function createCertificate(payload) {
  return prisma.certificate.create({
    data: {
      cityId: payload.cityId || null,
      title: payload.title,
      imageUrl: payload.imageUrl,
      sortOrder: payload.sortOrder ?? 0,
      isVisible: payload.isVisible ?? true
    },
    select: buildCertificateSelect()
  });
}

export async function updateCertificate(id, payload) {
  return prisma.certificate.update({
    where: { id },
    data: {
      ...(payload.cityId !== undefined ? { cityId: payload.cityId || null } : {}),
      ...(payload.title !== undefined ? { title: payload.title } : {}),
      ...(payload.imageUrl !== undefined ? { imageUrl: payload.imageUrl } : {}),
      ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
      ...(payload.isVisible !== undefined ? { isVisible: payload.isVisible } : {})
    },
    select: buildCertificateSelect()
  });
}

export async function deleteCertificate(id) {
  await prisma.certificate.delete({
    where: { id }
  });
}
