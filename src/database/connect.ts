import mongoose from "mongoose"
import config from "./config"

import {Logger} from "../logger/index"

const connect = () => {
    const dbUri = config.uri as string
    console.log(dbUri)
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