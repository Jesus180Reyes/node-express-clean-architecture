import { BcryptjsAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserEntityMapper } from "../mappers/user.mapper";

    type HashFunction = (password: string) => string;
    type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptjsAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptjsAdapter.compare,
    ) {

    }
   async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
        const {email,password,name } = registerUserDto;
        const exists = await UserModel.findOne({email})
        if(exists)throw CustomError.badRequest('User already Exists')
        try {
            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password)  
            })
            await user.save();
            return UserEntityMapper.userEntityFromObject(user)
            
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer();
        }
    }
   
}