import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register_user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.respository";

interface UserToken {
    token: string,
    user: {
        id: string;
        name: string;
    }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null> 

interface RegisterUserUseCase {
     execute (registerUserDto: RegisterUserDto): Promise<UserToken>,

}


export class RegisterUser implements RegisterUserUseCase {

        constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken?: SignToken  ,
    ){

    }
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken!({id: user.id}, '2h');
    if(!token) {
        throw CustomError.internalServer('Error generando token')
    }
    return  {
    token: token,
       user,
    }


    }
}