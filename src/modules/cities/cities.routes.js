import { Router } from "express";
import { asyncHandler } from "../../utils/async-handler.js";
import { listCities } from "./cities.service.js";

export const citiesRouter = Router();

citiesRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const cities = await listCities();

    res.json({
      ok: true,
      data: cities
    });
  })
);
