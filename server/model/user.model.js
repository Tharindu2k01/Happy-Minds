const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    lastname: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    password: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3
    },
},{
    timestamps : true,
});

const User = mongoose.model('User', userSchema)

module.exports = User;