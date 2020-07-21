const registerValidator = require('../validator/registerValidator')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')

module.exports = {
    login(req, res) {
        let name = req.body.name
        let email = req.body.email
        res.json({
            message: `Hello ${name} how are you? we will contact with you via ${email}`
        })
    },
    register(req, res) {
        let {name, email, password, confirmPassword} = req.body
        let validate = registerValidator({name, email, password, confirmPassword})

        if (!validate.isValid) {
            res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if(user) {
                        return res.status(400).json({
                            message: 'Email already exists'
                        })
                    }
                    
                    bcrypt.hash(password, 11, (err, hash) => {
                        if(err) {
                            return res.status(500).json({
                                message: 'Server error occured'
                            })
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
                            .catch(error => {
                                console.log(error)
                                res.status(500).json({
                                    message: 'Server error occured'
                                })
                            })
                    }) 
                    
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({
                        message: 'Server error occured'
                    })
                })
        }
    }
}