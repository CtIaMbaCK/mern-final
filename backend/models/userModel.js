const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    userName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role : String,
},{
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;