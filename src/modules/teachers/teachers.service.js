import { prisma } from "../../lib/prisma.js";

const teacherSelect = {
  id: true,
  name: true,
  photoUrl: true,
  linkedinUrl: true,
  employmentStatus: true,
  credentials: true,
  sortOrder: true,
  isVisible: true,
  city: {
    select: {
      id: true,
      name: true,
      slug: true
    }
  },
  createdAt: true,
  updatedAt: true
};

export async function listTeachers(filters) {
  return prisma.teacher.findMany({
    where: {
      ...(filters.cityId ? { cityId: filters.cityId } : {}),
      ...(filters.includeHidden ? {} : { isVisible: true })
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: teacherSelect
  });
}

export async function createTeacher(payload) {
  return prisma.teacher.create({
    data: {
      cityId: payload.cityId ?? null,
      name: payload.name,
      photoUrl: payload.photoUrl || null,
      linkedinUrl: payload.linkedinUrl || null,
      employmentStatus: payload.employmentStatus || null,
      credentials: payload.credentials || null,
      sortOrder: payload.sortOrder ?? 0,
      isVisible: payload.isVisible ?? true
    },
    select: teacherSelect
  });
}

export async function updateTeacher(id, payload) {
  return prisma.teacher.update({
    where: { id },
    data: {
      ...(payload.cityId !== undefined ? { cityId: payload.cityId ?? null } : {}),
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.photoUrl !== undefined ? { photoUrl: payload.photoUrl || null } : {}),
      ...(payload.linkedinUrl !== undefined ? { linkedinUrl: payload.linkedinUrl || null } : {}),
      ...(payload.employmentStatus !== undefined ? { employmentStatus: payload.employmentStatus || null } : {}),
      ...(payload.credentials !== undefined ? { credentials: payload.credentials || null } : {}),
      ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
      ...(payload.isVisible !== undefined ? { isVisible: payload.isVisible } : {})
    },
    select: teacherSelect
  });
}
