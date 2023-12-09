import { NextFunction,Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddleware {
    
    static  validateJwt = async (req:Request, res: Response, next: NextFunction) => {
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({ok: false, error: 'No token en la peticion'})
        if(!authorization.startsWith('Bearer')) return res.status(401).json({ok: false, error: 'Invalid bearer token'})

        const token = authorization.split(' ').at(1) || '';

        try {
        const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload) return res.status(401).json({ok: false, error: 'Invalid Token'})
            console.log(payload);
        const user = await UserModel.findById(payload.id);
        console.log(user);
        if(!user) return res.status(401).json({ok: false,error: 'Invalid token - user not found'})
        req.body.user = user 
        next()
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Error internal server",
                error
            })
            
        }
    }
}