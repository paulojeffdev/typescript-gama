import mongoose from "mongoose"
import bcrypt from "bcrypt"

export interface Client extends mongoose.Document {
    name: string
    lastName: string
    email: string
    password: string
    cpf: string
    comparePassword(passwordCompare: string) : Promise<Boolean>
}

const ClientSchema: mongoose.Schema<Client> = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        lastName: {type: String, required: true},
        password: {type: String, required: true}
    },
    {timestamps: true}
);

ClientSchema.pre("save", async (next) => {
    let client = this as unknown as Client

    if(!client.isModified("password")) return next()

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hashSync(client.password, salt)

    client.password = hash

    return next()
})

ClientSchema.methods.comparePassword = async (passwordCompare : string) => {
    const client = this as unknown as Client

    //passwordCompare = 123456 -> mdklshfçjashihh49489
    //client.password = mdklshfçjashihh49489
    return bcrypt.compare(passwordCompare, client.password).catch((e) => false)
}

const Client = mongoose.model<Client>("Client", ClientSchema)

export default Client