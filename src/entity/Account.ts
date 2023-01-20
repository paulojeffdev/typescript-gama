import { Client } from "./Client"

export class Account {
    private id: number
    protected account_number: string
    protected agency: string
    private balance: number
    protected client: Client

    constructor(account_number: string, agency: string, client: Client, id: number) {
        this.account_number = account_number
        this.agency = agency
        this.balance = 0.0
        this.client = client
        this.id = id
    }

    public getClient(): Client {
        return this.client
    }

    public getId(): number {
        return this.id
    }

    public setId(id: number) {
        this.id = id
    }
}