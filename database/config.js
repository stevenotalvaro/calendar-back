const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })

        console.log('db online')
    } catch (error) {
        console.log(error)
        throw Error('Fail with database')
    }
}

module.exports = {
    dbConnection,
}
