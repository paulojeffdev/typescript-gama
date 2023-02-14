import mongoose from "mongoose"
import config from "./config"
import dotenv from "dotenv"

import {Logger} from "../logger/index"

dotenv.config()

const connect = () => {
    const dbUri = process.env.MONGO_URL as string
    const log: Logger = new Logger()

    mongoose.set("strictQuery", false);
    return mongoose
        .connect(dbUri, { retryWrites: true, w: 'majority' })
        .then(() => {
            log.info("Database connected")
        })
        .catch((error) => {
            log.error("db error", error)
            process.exit(1)
        })
}

export default connect;