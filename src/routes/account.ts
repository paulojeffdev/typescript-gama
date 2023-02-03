import express, {Request, Response} from 'express'
import { AccountController } from '../controller/AccountController'
import { checkJwt } from '../middlewares/CheckJwt'

const router = express.Router()

router.get("/", [checkJwt], AccountController.findAll)

router.get("/:id", [checkJwt], AccountController.findOne)

router.post("/", [checkJwt], AccountController.create)

router.put("/:id", [checkJwt], AccountController.update)

router.delete("/:id", [checkJwt], AccountController.remove)

export default router