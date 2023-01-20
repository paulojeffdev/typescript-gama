export class Client {
    public name: string
    public lastName: string
    protected cpf: string

    constructor(name: string, lastName: string, cpf: string) {
        this.name = name
        this.lastName = lastName
        this.cpf = cpf
    }

    public getCPf(): string {
        return this.cpf
    }

    public setCpf(cpf: string) :void {
        this.cpf = cpf
    }
}