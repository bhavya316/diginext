import { prisma } from "../lib/prisma.js";
import { verifyAdminToken } from "../utils/auth.js";

export async function requireAuth(req, _res, next) {
  try {
    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.slice("Bearer ".length).trim()
      : "";

    if (!token) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      throw error;
    }

    const payload = verifyAdminToken(token);
    const admin = await prisma.admin.findUnique({
      where: { id: BigInt(payload.sub) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true
      }
    });

    if (!admin || !admin.isActive) {
      const error = new Error("Admin account is inactive");
      error.statusCode = 401;
      throw error;
    }

    req.admin = admin;
    next();
  } catch (error) {
    error.statusCode = error.statusCode || 401;
    next(error);
  }
}
