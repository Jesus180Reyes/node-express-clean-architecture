import mongoose, {Schema} from 'mongoose'


const userSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is requiered']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String, 
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        required: false
    },

    roles: {
        type: [String],
        default: ['User_Role'],
        enum: ['User_Role', 'Admin_Role'],

    }
});

export const UserModel  = mongoose.model('User', userSchema);