import {Request, Response} from "express"
import jwt from "jsonwebtoken"
import config from "../config/config"

import {Client} from "../entity/Client"


export class AuthController {
    static login = async (req: Request, res: Response) => {
        let {email, password} = req.body

        if(!(email && password)) {
            return res.status(404).send()
        }

        Client.findOne({email: email})
            .then((client) => {
                if(client?.comparePassword(password)) {
                    const token = jwt.sign(
                        {clientId: client._id, full_name: client.name + client.lastName},
                        config.jwtSecret,
                        {expiresIn: "1h"}
                    )

                    return res.status(200).json({message: "You logged", token: token})
                } else {
                    return res.status(401).json({message: "Password or user not found"})
                }
            })
            .catch((error) => res.status(500).json({error: error.message}))
    }

    static changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.clientId
        const {oldPassword, newPassword} = req.body

        if(!(oldPassword && newPassword)) {
            return res.status(400).json({message: "Password not passed"})
        }

        Client.findById(id)
            .then((client) => {
                if(client?.comparePassword(oldPassword)) {
                    client.set('password', newPassword)

                    return client
                        .save()
                        .then((client) => res.status(201).json({message: "Password changed"}))
                        .catch((error) => res.status(500).json({error: error.message}))
                } else {
                    return res.status(404).json({message: "Client not found"})
                }
            })
            .catch((error) => res.status(500).json({error: error.message}))
    }
}