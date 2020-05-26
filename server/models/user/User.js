
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
let bcryptjs = require('bcryptjs');
import * as jwt from 'jsonwebtoken'
import { hashString } from '../../tools/hash'
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    password: String,
    user_key: String
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

userSchema.plugin(mongoosePaginate);

userSchema.set('toJSON', {
    transform(doc, ret) {
        delete ret.__v
    },
})

userSchema.set('toObject', {
    transform(doc, ret) {
        delete ret.__v
    },
})



userSchema.statics.doesExist = async function doesExist(email ) {
    const userExists = await User.find({ email }).limit(1).countDocuments().exec()
    return userExists
}



userSchema.statics.getById = async function getById(_id) {
    
    const query = this.findOne({ _id }, { _id: 0 })
    return query.exec().then((user) => (user ? user : undefined))
}



userSchema.statics.register = async function register(user) {
    const { email, password } = user
    // @ts-ignore
    if (await User.doesExist(email)) {
        return "USER_ERROR_USER_ALREADY_EXISTS"
    }
    user.password = await hashString(password)
    try {
        return new User(user).save()
    } catch (error) {
        return undefined
    }

}

userSchema.statics.login = async function login(email , password ) {
    const user = await User.findOne({ email }).exec()
    if (user) {
        // @ts-ignore
        const passwordCorrect = await bcryptjs.compare(password, user.password) || user.password === password
        if (passwordCorrect) {
            const token = jwt.sign(user.toJSON(),
                SECRET_KEY,
                {
                    expiresIn: '730h'
                }
            )

            
            // @ts-ignore
            const { email, _id , user_key } = user

            const result = {
                token,
                email,
                user_key,
                _id
            }
            return result
        } else {
            return undefined
        }
    }
}


userSchema.statics.getIdByJWT = async function getIdByJWT(token) {
    return jwt.verify(
        token,
        SECRET_KEY,
        (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    return 'Token has expired'
                }
                return false
            } else {
                const { _id,  email  } = decoded
                return { user_id: _id, email  }
            }
        }
    )
}



const User = mongoose.model("User", userSchema)

module.exports = User