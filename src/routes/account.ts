import express, {Request, Response} from 'express'
import { AccountController } from '../controller/AccountController'

const router = express.Router()

router.get("/", [], AccountController.findAll)

router.get("/:id([0-9]+)", [], AccountController.findOne)

router.post("/", [], AccountController.create)

router.put("/:id([0-9]+)", [], AccountController.update)

router.delete("/:id([0-9]+)", [], AccountController.remove)

export default router