import {Request, Response} from "express"
import { Cp } from "../entity/Cp";
import { Cc } from "../entity/Cc";
import { Accounts } from "../entity/AccountInterface";
import { Account } from "../entity/Account";
import { Client } from "../entity/Client";

let accounts: Accounts = {
    1: new Cc("01","01", new Client("Paulo", "Jefferson Mendes Oliveira", "000.000.000-00"), 1),
    2: new Cp("02", "01", new Client("José", "Medeiros", "100.000.000-00"), 2)
}

export class AccountController {
    static createId = async (): Promise<number> => {
        return Object.values(accounts).length + 1
    }

    static findAll = async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(accounts)
    }

    static findOne = async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id, 10)
        let account: Account = accounts[id]
        if(!account) {
            return res.status(404).send({
                'message': "Account not Found!",
                'success': false
            })
        }

        return res.status(200).send(account)
    }

    static create = async (req: Request, res: Response): Promise<Response> => {
        const id = await this.createId()
        let client: Client = new Client(req.body.name, req.body.lastName, req.body.cpf)

        let account: Account
        if(req.body.type == "cc") {
            account = new Cp(req.body.account_number, req.body.agency, client, id)
        } else {
            account = new Cc(req.body.account_number, req.body.agency, client, id)
        }
        
        const index = account.getId()
    
        accounts[index] = account
    
        return res.status(201).send(accounts[index])
    }

    static update = async (req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id, 10)
        
        const account = accounts[id]
        if(!account){
            return res.status(400).send("Account not found!")
        }

        let accountUpdate: Account = new Account(req.body.account_number, 
            req.body.agency, account.getClient(), account.getId())
        accounts[id] = accountUpdate
    
        return res.status(204).send()
    }

    static remove = async(req: Request, res: Response): Promise<Response> => {
        const id = parseInt(req.params.id, 10)
    
        const account = accounts[id]
        if(!account){
            return res.status(404).send("Account not found!")
        }
    
        delete accounts[id]

        return res.status(204).send()
    }
}