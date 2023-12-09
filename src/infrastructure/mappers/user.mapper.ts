import { CustomError, UserEntity } from "../../domain";

export class UserEntityMapper {

    static userEntityFromObject(object: {[key:string]:any}) {

        const { id, _id ,name,email,password, roles} = object;

        if(!id || !_id) {
         throw  CustomError.badRequest('Missing Id');
        }
        if(!name) throw CustomError.badRequest('Missing Name')
        if(!email) throw CustomError.badRequest('Missing Email')
        if(!password) throw CustomError.badRequest('Missing Password')
        if(!roles) throw CustomError.badRequest('Missing roles')


        return new UserEntity(_id || id,name,email,password, roles)
    }

}