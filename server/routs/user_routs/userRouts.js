
import * as jwt from 'jsonwebtoken'
import { ROUTES_ERROR_MISSING_BODY_PARAMS, USER_ERROR_LOGIN_FAILED } from '../../tools/error'
const User = require('../../models/user/User')
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY 

module.exports =  (app) => {
    login(app)
    register(app)
}


const loginByPasswordAndEmail = async (
    email,
    password,
    res,
    body,
    Model,
) => {
    if (email && password) {
        const result = await Model.login(email, password)
        
        if (result) {
            res.send({ok: true, result: result})
        } else {
            res.send({ok: false, result: USER_ERROR_LOGIN_FAILED})
        }
    } else {
        res.send({ok: false, result: ROUTES_ERROR_MISSING_BODY_PARAMS})
    }
}




const login = (app) => {
    app.post('/auth/login', async (req, res) => {
        const { email, password } = req.body
        const token = req.headers['access-token']
        
        if (token) {
            jwt.verify (token, SECRET_KEY, async (err, decoded) => {
           
                if (err && !decoded) {
                    loginByPasswordAndEmail(email, password, res, req.body, User)
                } else {
                    // @ts-ignore
                    const user = await User.getById(decoded._id)
                    
                    const {email, _id} = decoded
                    let {user_key} = user
                    const result = { email, token, user_key,  user_id: _id }
                    res.send({ok: true, result: result})
                }
            })
        } else {
            loginByPasswordAndEmail(email, password, res, req.body, User)
        }
    })
}




const register = (app) => {
    app.post('/auth/register', async (req, res) => {

                    let result

                    if(!req.body.email && !req.body.password ){
                         result = "EMAIL_OR_PASSWORD_MISSING"
                    }else{

                         result = await User.register(req.body)
                    }

                  if(result){

                      // login
                      if(result.id ){
                        const login_result = await User.login(result.email, req.body.password)                        
        
                        if (login_result) {
                            res.send({ok: true, result: login_result})
                        } else {
                            res.send({ok: false, result: USER_ERROR_LOGIN_FAILED})
                        }
                      }else{
                        res.send({ok: true, result: result})
                      }

                  }else{
                    res.send({ok: false, result: result})
                  }

            })
        
    
}