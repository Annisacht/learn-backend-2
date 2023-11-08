const UserModels = require('../../models').Users
const Cryptr = require('cryptr');
const { where } = require('sequelize')
const cryptr = new Cryptr('kunci')
const jwt = require('jsonwebtoken')



async function Register(req, res, next) {
    const { username, password, email, firstName, lastName } = req.body;
    const registeredUser = await UserModels.findOne({ where: { email } });

    if (registeredUser) {
        return res.status(400).send({
            message: 'This user has been registered',
            statusCode: 400
        });
    }

    const encryptedPassword = cryptr.encrypt(password);
    let dataPassingToDB = {
        username: username,
        password: encryptedPassword,
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    let createdData = await UserModels.create(dataPassingToDB)
    const token =  jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
            username: username,
            password: encryptedPassword,
            email: email
        }
      }, 'secret')
    console.log('token =',token)

    if (!createdData.dataValues) {
        res.status(400).send({
            message: 'wrong username or password',
            statusCode: 400
        });
    } else {
        res.send({
            message: 'successfully created user data!',
            access_token: token,
            statusCode: 200,
        });
    }

}


async function Login(req, res, next) {
    const getUsers = await UserModels.findOne({
        where: {username: req.body.username}
    })

    const decryptedPassword = cryptr.decrypt(getUsers.dataValues.password)
    console.log('decrypt =', decryptedPassword)
    if (req.body.password !== decryptedPassword) {
        res.status(400).send({
            message: 'wrong username or password',
            statusCode: 400
        })
    } else {
        console.log(getUsers.dataValues)
        // console.log(req.body)
        res.send('login here..')
    }
}

module.exports = {
    Register,
    Login
}