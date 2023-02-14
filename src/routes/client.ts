import express, {Request, Response} from 'express'
import { checkJwt } from '../middlewares/CheckJwt'
import { ClientController } from '../controller/ClientController'

const router = express.Router()

router.get("/", [checkJwt], ClientController.findAll)

router.get("/:id", [checkJwt], ClientController.findOne)

router.post("/", ClientController.create)

router.put("/:id", [checkJwt], ClientController.update)

router.delete("/:id", [checkJwt], ClientController.remove)

export default router