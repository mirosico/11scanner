const UserServices = require("./user.service");
const HashService = require("../pass/pass.service");
const SessionService = require("../session/session.service");

const register = async (request, response) => {
    try {
        const userExists = await UserServices.getUserByEmail(request.body.email);
        if (userExists) {
            return response.status(400).send({
                message: "Email already exists",
            });
        }
        const hashedPassword = await HashService.hashPassword(request.body.password);
        const user = UserServices.createUser({
            email: request.body.email,
            password: hashedPassword,
        });
        if (!user) {
            response.status(400).send();
        }
        response.status(201).json(user);
    } catch (e) {
        console.error(e);
        response.status(500).send();
    }
};

const login = async (request, response) => {
    try {
        const user = await UserServices.getUserByEmail(request.body.email);
        if (!user) {
            return response.status(404).send({
                message: "Email not found",
            });
        }
        const passwordCheck = await HashService.comparePassword(request.body.password, user.password);
        if (!passwordCheck) {
            return response.status(400).send({
                message: "Passwords does not match",
            });
        }
        const token = await SessionService.generateToken(user);
        if (!token) {
            return response.status(500).send();
        }
        response
            .status(200)
            .send({
                token,
                email: user.email,
            });
    } catch (e) {
        console.error(e);
        response.status(500).send();
    }
}


module.exports = {
    register,
    login,
}

