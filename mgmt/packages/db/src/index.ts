import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipes'
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

const recipesSchema = new mongoose.Schema({
    title : {
       type :  String,
       require : true
    },
    description : {
        type:String,
        require : false
    },
    comments  :{
        type : [{type : mongoose.Schema.Types.ObjectId , ref : "Comments"}],
        require : false
    }
    

})

const commentSchema = new mongoose.Schema({
    feedback : String
})