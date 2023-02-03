import mongoose, {Document, Schema} from "mongoose"
import { Client } from "./Client"

export interface Account {
    account_number: string
    agency: string
    balance: number
    type: number
    client: Client
}

const AccountSchema: Schema = new Schema(
    {
        account_number: {type: String, required: true},
        agency: {type: String, required: true},
        balance: {type: Number, required: true},
        type: {type: Number, required: true},
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    }, {
        timestamps: true
    }
)

export default mongoose.model<Account>("Account", AccountSchema)