import { UserEntity } from "../entities/user_entity";
import { RegisterUserDto } from '../dtos/auth/register_user.dto';

export abstract class AuthDatasource {
    // abstract login(){}

    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity> 
}