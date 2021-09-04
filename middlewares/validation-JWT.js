const {response} = require('express')
const jwt = require('jsonwebtoken')
const validationJWT = (req, res = response, next) => {
    //x-token in headers

    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'there is not token',
        })
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED)
        req.uid = payload.uid
        req.name = payload.name
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'token is not valid',
        })
    }
    next()
}

module.exports = {
    validationJWT,
}
