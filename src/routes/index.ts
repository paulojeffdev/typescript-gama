import express from "express"
import account from "./account"
import client from "./client"
import auth from "./auth"

const routes = express.Router()

routes.use('/account', account)
routes.use('/client', client)
routes.use('/auth', auth)

export default routes