const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/UserModel')
const {serverError, resourceError} = require('../util/error')

module.exports = {
    login(req, res) {
        let {email, password} = req.body
        let validate = loginValidator({email, password})

        if(!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        User.findOne({email})
            .then(user => {
                if(!user) {
                    return resourceError(res, 'User not found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        return serverError(res, err)
                    }
                    if(!result) {
                        return resourceError(res, 'password doesnt match ')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.icnome,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))
    },
    register(req, res) {
        let {name, email, password, confirmPassword} = req.body
        let validate = registerValidator({name, email, password, confirmPassword})

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if(user) {
                        return resourceError(res, 'Email already exists')
                    }
                    
                    bcrypt.hash(password, 11, (err, hash) => {
                        if(err) {
                            return resourceError(res, 'Server error occured')
                        }
                        let user = new User({
                            name,
                            email,
                            password: hash
                        })
                        
                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User created successfull',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    }) 
                    
                })
                .catch(error => serverError(res, error))
        }
    }
}