import user from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signupUser = async (userObj) => {
    const emailExists = await user.findOne({ email: userObj.email });
    if (emailExists) {
        throw new Error("Email already exists");
    } else {
        return await user
            .create(userObj)
            .then(async (data) => {
                await data.save();
                return data;
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    }
};

export const loginUser = async (email, password) => {
    return await user
        .findOne({ email })
        .then((data) => {
            if (data) {
                if (bcrypt.compareSync(password, data.password)) {
                    const accessToken = jwt.sign(
                        {
                            _id: data._id,
                            email: data.email,
                            role: "user",
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: "1d",
                        }
                    );
                    //create response object
                    const responseObj = {
                        _id: data._id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        accessToken: accessToken,
                    };
                    return responseObj;
                } else {
                    throw new Error("Invalid Login Credentials");
                }
            } else {
                throw new Error("Invalid Login Credentials");
            }
        })
        .catch((err) => {
            throw new Error(err.message);
        });
};

export default {
    signupUser,
    loginUser,
};
