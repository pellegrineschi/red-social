const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.png"
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(mongoosePaginate);

/** @type {import("mongoose").Model<any>} */
const User = model("User", userSchema, "users");

module.exports = User;
