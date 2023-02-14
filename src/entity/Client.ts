import {Model, model, Schema, Document} from "mongoose"
import bcrypt from "bcrypt"

export interface I_Client extends Document {
    name: string
    lastName: string
    email: string
    password: string
    cpf: string
    comparePassword(passwordCompare: string) : Promise<Boolean>
}

const ClientSchema: Schema = new Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        password: {type: String, required: true}
    },
    {timestamps: true}
);

ClientSchema.pre<I_Client>("save", async function (next) {
    if(!this.isModified("password")) return next()

    const salt = bcrypt.genSalt(10)

    const hash = bcrypt.hashSync(this.password, await salt)

    this.password = hash

    return next()
})

ClientSchema.methods.comparePassword = async function (passwordCompare : string) {
    //passwordCompare = 123456 -> mdklshfçjashihh49489
    //client.password = mdklshfçjashihh49489
    return bcrypt.compare(passwordCompare, this.password).catch((e) => false)
}

export const Client:Model<I_Client> = model("Client", ClientSchema)