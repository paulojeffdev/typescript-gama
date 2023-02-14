import {Request, Response, NextFunction} from "express"
import mongoose from "mongoose"
import {Client} from "../entity/Client"

export class ClientController {
    static findAll = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return Client.find()
            .then((client) => res.status(200).json({client}))
            .catch((error) => res.status(500).json({error: error.message}))
    }

    static findOne = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id //ID do mongo -> ds0f6s5a10fg56as0dsa651f0as0
        
        return Client.findById(id)
            .exec()
            .then((client) => (client ? res.status(200).json({client}) : 
                res.status(404).json({message: 'Client not found!'})))
            .catch((error) => res.status(500).json({error: error.message}))
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        const {name, lastName, email, password, cpf} = req.body

        const client = new Client({
            _id: new mongoose.Types.ObjectId(),
            name,
            lastName,
            email,
            password,
            cpf
        })

        return client
            .save()
            .then((client) => res.status(201).json({client}))
            .catch((error) => res.status(500).json({error: error.message}))
    }

    static update = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id

        return Client.findById(id)
            .then((client) => {
                if(client) {
                    client.set(req.body)

                    return client
                        .save()
                        .then((client) => res.status(201).json({client}))
                        .catch((error) => res.status(500).json({error}))
                } else {
                    return res.status(404).json({message: "Client not found!"})
                }
            })
            .catch((error) => res.status(500).json({error: error.message}))
    }

    static remove = async(req: Request, res: Response): Promise<Response> => {
        const id = req.params.id

        return Client.findByIdAndDelete(id)
            .then((client) => (client ? res.status(201).json({client, message: "Deleted"}) : 
                res.status(404).json({message: "Client not found!"})))
            .catch((error) => res.status(500).json({error: error.message}))
    }
}