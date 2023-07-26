var mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    mobilenumber: String,
    password: String,
    status: {
        type: String,
        enum: ["ACTIVE", "BLOCK", "DELETE"],
        default: "ACTIVE"
    }
}, {
    timestamps: true
});
const user = mongoose.model("User", userSchema);

module.exports = user;