const mongoose = require("mongoose")
const studentSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    department:{type:String,required:true},
    studentID:{type:String,unique,required:true},
    gender:{type:String,required:true},
    dorm:{type:String,required:true}
})

module.exports.StudentSchema = studentSchema;