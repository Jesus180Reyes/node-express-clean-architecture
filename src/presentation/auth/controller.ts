import {Request, Response} from 'express'
import { AuthRepository, RegisterUserDto } from '../../domain'
import { JwtAdapter } from '../../config'
import { UserModel } from '../../data/mongodb'
import { RegisterUser } from '../../domain/use-cases/auth/register.user.use_case'
export class AuthController {
    constructor(private readonly authRepository: AuthRepository){}


    registerUser =  async (req:Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body)
        if(error) return res.status(400).json({error})
        new RegisterUser(this.authRepository)
                .execute(registerDto!)
                .then(data => res.json(data))
                // .catch(err => res.status(500).json(err))

    }
    loginUser = async(req: Request, res: Response) => {
        res.json({
            ok: true,
            msg: "Login User"
        })
    }

    getUsers = async(req: Request, res: Response) => {
        UserModel.find()
            .then( users => res.json({users, user: req.body.user}))
            .catch((err) => res.status(500).json({ok: false,err}))
      
    }
}