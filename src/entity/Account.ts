import mongoose, {Model, model, Document, Schema} from "mongoose"

export interface I_Account extends Document {
    account_number: string
    agency: string
    balance: number
    type: number
    client: string
}

const AccountSchema: Schema = new Schema(
    {
        account_number: {type: String, required: true},
        agency: {type: String, required: true},
        balance: {type: Number, required: true},
        type: {type: Number, required: true},
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    }, {
        timestamps: true
    }
)

export const Account:any = model("Account", AccountSchema)