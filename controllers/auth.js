const {response} = require('express')

const createUser = (rep, res = response) => {
    res.json({
        ok: true,
        msg: 'register',
    })
}

const loginUser = (rep, res = response) => {
    res.json({
        ok: true,
        msg: 'login',
    })
}

const revalidationToken = (rep, res = response) => {
    res.json({
        ok: true,
        msg: 'rerew',
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidationToken,
}
