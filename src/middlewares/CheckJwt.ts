import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import config from "../config/config"

/**
 * CheckJWT
 * 
 * Login: email + senha
 * JWT: token -> 054gf01gfgd352f
 * Token tem validade 2h
 * Request to /account -> Header authorization 054gf01gfgd352f
 * Token ok -> mostrar conteúdo
 * Token não ok -> Bloqueio
*/
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["authorization"]
    let jwtPayload

    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret)
        
        res.locals.jwtPayload = jwtPayload
    } catch(error) {
        return res.status(401).send('You are not logged!')
    }

    const {clientId, username} = jwtPayload
    const newToken = jwt.sign({clientId, username}, config.jwtSecret, {
        expiresIn: "1h"
    })

    res.setHeader("token", newToken)

    next()
}