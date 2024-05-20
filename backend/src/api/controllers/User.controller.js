import userService from "../services/User.service";
import User from "../models/User.model";
import bcrypt from "bcryptjs";

const signupUser = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });

    await userService
        .signupUser(user)
        .then(async (data) => {
            req.handleResponse.successRespond(res)(data);
            next();
        })
        .catch((err) => {
            req.handleResponse.errorRespond(res)(err);
            next();
        });
};

export const loginUser = async (req, res, next) => {
    await userService
        .loginUser(req.body.email, req.body.password)
        .then((data) => {
            req.handleResponse.successRespond(res)(data);
            next();
        })
        .catch((err) => {
            req.handleResponse.errorRespond(res)(err);
            next();
        });
};

module.exports = {
    signupUser,
    loginUser,
};
