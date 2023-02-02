import mongoose from "mongoose"
import config from "./config"

import {Logger} from "../logger/index"

const connect = () => {
    const dbUri = config.uri as string
    const log: Logger = new Logger()

    return mongoose
        .connect(dbUri)
        .then(() => {
            log.info("Database connected")
        })
        .catch((error) => {
            log.error("db error", error)
            process.exit(1)
        })
}

export default connect;