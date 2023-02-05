const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true,"Must Provide Name"],
        maxlength: [50,"Name Cannot be more than 50 charachers"]
    },
    complete:{
        type:Boolean,
        default:false,
    }
})
module.exports = mongoose.model('Task',TaskSchema)