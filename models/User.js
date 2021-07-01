const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    Name: { 
        type: String,
        required: true,
        unique:true
    },
    Student_Id: { 
        type: String,
        required: true,
        unique: true
    },
    
    Email: { 
        type: String,
        required: true,
        unique: true
    },
    Password: { 
        type: String,
        required: true,
    }

    },
    { timestamps: true }
  
);

module.exports = mongoose.model('User ',UserSchema);