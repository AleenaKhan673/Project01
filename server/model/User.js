let mongoose = require ('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')
let UserSchema = mongoose.Schema({
    username: 
    {
        type:String,
        default:"",
        trim:true, 
        required:'Username is required'
    },
    /*
    password: 
    {
        type:String,
        default:"",
        trim:true, 
        required:'Password is required'
    }, 
    */
    email: 
    {
        type:String, 
        default:"",
        trim:true,
        required:'Email is required'
    }, 
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required: 'Display name is required'
    },
    created:
    {
        type:Date,
        default:Date.now
    }, 
    update:
    {
        type:Date,
        default:Date.now

    }
}, 
{
    collection: "user"
})
// config options for user model.

let options = ({MissingPasswordError: 'Wrong/Missing Password'}) 
UserSchema.plugin(passportLocalMongoose, options),
module.exports.User = mongoose.model('user',UserSchema); 