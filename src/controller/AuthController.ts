import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import {validate} from "class-validator"

import {Client} from "../entity/Client"
import { AccountController } from "./AccountController"


class AuthController {
    static login = async (req: Request, res: Response) => {
        let {username, password} = req.body

        if(!(username && password)) {
            return res.status(404).send()
        }
    }
}