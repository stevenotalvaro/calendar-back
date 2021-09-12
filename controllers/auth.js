const {response} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {generateJWT} = require('../helpers/jwt')

const createUser = async (req, res = response) => {
    const {email, password} = req.body

    try {
        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exits with that email',
            })
        }

        user = new User(req.body)

        // password crypt
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        //JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please you talk to admin',
        })
    }
}

const loginUser = async (req, res = response) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exit with that email',
            })
        }

        // confirm password
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Incorrect Password',
            })
        }

        //JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please you talk to admin',
        })
    }
}

const revalidationToken = async (req, res = response) => {
    const uid = req.uid
    const name = req.name

    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token,
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidationToken,
}
