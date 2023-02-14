import {Request, Response, NextFunction} from "express"
import mongoose from "mongoose";
import {Account} from "../entity/Account";

export class AccountController {
    static findAll = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        return Account.find()
            .then((accounts: any) => res.status(200).json({accounts}))
            .catch((error: { message: any; }) => res.status(500).json({error: error.message}))
    }

    static findOne = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id //ID do mongo -> ds0f6s5a10fg56as0dsa651f0as0
        
        return Account.findById(id)
            .exec()
            .then((account: any) => (account ? res.status(200).json({account}) : 
                res.status(404).json({message: 'Account not found!'})))
            .catch((error: { message: any; }) => res.status(500).json({error: error.message}))
    }

    static create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const {client, account_number, agency, type} = req.body

        const account = new Account({
            _id: new mongoose.Types.ObjectId(),
            account_number,
            agency,
            balance: 0.00,
            type,
            client
        })

        return account
            .save()
            .then((account: any) => res.status(201).json({account}))
            .catch((error: { message: any; }) => res.status(500).json({error: error.message}))
    }

    static update = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id

        return Account.findById(id)
            .then((account: { set: (arg0: any) => void; save: () => Promise<any>; }) => {
                if(account) {
                    account.set(req.body)

                    return account
                        .save()
                        .then((account: any) => res.status(201).json({account}))
                        .catch((error: { message: any; }) => res.status(500).json({error: error.message}))
                } else {
                    return res.status(404).json({message: "Account not found!"})
                }
            })
            .catch((error: { message: any; }) => res.status(500).json({error: error.message}))
    }

    static remove = async(req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const id = req.params.id

        return Account.findByIdAndDelete(id)
            .then((account: any) => (account ? res.status(201).json({account, message: "Deleted"}) : 
                res.status(404).json({message: "Account not found!"})))
            .catch((error: { message: any; }) => res.status(500).json({error: error.message}))
    }
}