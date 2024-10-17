import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true,  
        unique: true
    },
    password: {
        type: String,
        // required: true
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
        ref: 'Recipe'
    }],
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });



//####### recipe


const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image:{
        type :String,
        required:true
    },
    ingredients: {
        type: [String],
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        enum: ['Dessert', 'Chinese', 'Italian','Vegetarian', 'Beverages','Vegan','Other'],
        required: true
    },
    feedback: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback"
    }],
    ratings: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    authorName:{
        type :String,
        required:true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

//////////////////////////////////////////////////////////////////////
recipeSchema.index({ title: 'text', description: 'text', ingredients: 'text' });

//########################33feedback
const feedbackSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    }
}, { timestamps: true });



export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);
export const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);