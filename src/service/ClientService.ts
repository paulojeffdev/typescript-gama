import { DocumentDefinition, FilterQuery } from "mongoose";
import ClientDocument, {Client} from "../entity/Client"

export const createClient = async (input: DocumentDefinition<Client>) => {
    try {
        return await ClientDocument.create(input)
    } catch(error: any) {
        throw new Error(error)
    }
}

export const findClient = async (query: FilterQuery<Client>) => {
    return ClientDocument.findOne(query).lean()
}

export const validatePassword = async (email: string, password: string) => {
    const client = await ClientDocument.findOne({email})

    if(!client) {
        return false;
    }

    //client -> password = 123456
    //param -> password = 123456
    const isValid = await client.comparePassword(password)

    if(!isValid) {
        return false;
    }

    return client
}