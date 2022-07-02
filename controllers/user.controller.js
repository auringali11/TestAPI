const repository = require("../db/repository")
const { schema } = require('../models/users.model');
const { login, passwordHashing, getDate } = require('../services/user.service')

module.exports = {
    signUpUser: async (req, res) => {
        try {
            const body = req.body;
            await schema.validateAsync(body);
            body.password = await passwordHashing(body.password)
            const date = await getDate()
            const message = await repository.users.insertingIntoUsers(body, date)
            res.send(message)
        } catch {
            res.status(500).send();
        }
    },
    loginUser: async (req, res) => {
        try{
            const body = req.body;
            const data = await repository.users.getUsersByFirstName(body.firstName)
            res.send(await login(body, data))
        } catch {
            res.status(500).send();
        }
    },
    updateUserProfileByID: async (req, res) => {
        let body = req.body
        var message = await repository.users.updateUserProfile(body, req.params.id)
        res.send(message)
    },
    getUserByID: async (req, res) => {
        try {
            const data = await repository.users.getUsersByID(req.params.id)
            res.send(data)
        } catch {
            res.status(500).send()
        }
    }
}
