import { Router } from "express";
const router = Router();

import * as spacecraftsCtrl from "../controllers/spacecrafts.controller";
import { authJwt } from "../middlewares";

router.get("/", spacecraftsCtrl.getSpacecrafts);

router.get("/:page/pagination", spacecraftsCtrl.getSpacecraftsByPage);

router.get("/:spacecraftId", spacecraftsCtrl.getSpacecraftById);

router.get('/:spacecraftImage/image', spacecraftsCtrl.getImageFile);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  spacecraftsCtrl.createSpacecraft
);

router.put(
  "/:spacecraftId",
  [authJwt.verifyToken, authJwt.isPilot],
  spacecraftsCtrl.updateSpacecraftById
);

router.delete(
  "/:spacecraftId",
  [authJwt.verifyToken, authJwt.isAdmin],
  spacecraftsCtrl.deleteSpacecraftById
);



export default router;
