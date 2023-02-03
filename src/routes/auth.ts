import { Router } from "express";
import { checkJwt } from "../middlewares/CheckJwt";
import { AuthController } from "../controller/AuthController"

const router = Router()
router.post("/login", AuthController.login)

router.post("change", [checkJwt], AuthController.changePassword)

export default router