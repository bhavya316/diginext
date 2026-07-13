import { prisma } from "../../lib/prisma.js";

export async function listSettings() {
  return prisma.siteSetting.findMany({
    orderBy: { key: "asc" },
    select: {
      id: true,
      key: true,
      valueJson: true,
      updatedAt: true
    }
  });
}

export async function upsertSetting(payload) {
  return prisma.siteSetting.upsert({
    where: { key: payload.key },
    update: { valueJson: payload.valueJson },
    create: {
      key: payload.key,
      valueJson: payload.valueJson
    },
    select: {
      id: true,
      key: true,
      valueJson: true,
      updatedAt: true
    }
  });
}
