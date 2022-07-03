const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require('crypto-js');
const randomstring = require('randomstring');

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true}, 
    isAdmin: { type: Boolean, required: true},
    salt: { type: String }
    },
    {
        timestamps: true,

    }
);

UserSchema.index({email: 1}, {unique:1});
UserSchema.plugin(mongoosePaginate);

UserSchema.methods = {
    async encryptPassword(password) {
        if(!this.salt) 
            throw new Error(`Missing password or salt for user ${this.email}`);
    
        const defaultIterations = 100;
        const defaultKeyLength = 16;
        const salt = this.salt;
        return crypto.PBKDF2(password, salt, { keySize: defaultKeyLength, iterations: defaultIterations});
    },

    makeSalt(byteSize) {
        const defaultByteSize = 16;
        return randomstring.generate(defaultByteSize);
    },
    
    async authenticate(password) {
        const encryptedPassword = (await this.encryptPassword(password)).toString(crypto.enc.Hex);
        return this.password === encryptedPassword;
    },

    userToken() {
        return {email: this.email, name: this.name, _id: this._id }
    }
};

module.exports.User = mongoose.model("User", UserSchema);