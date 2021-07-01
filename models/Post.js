const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({

    Name: { 
        type: String,
        required: true,
    },
    Student_Id: { 
        type: String,
        required: true,
    },
    Faculty_Section: { 
        type: String,
        required: true,
    },
    Phone: { 
        type: String,
        required: true,
    },
    Email: { 
        type: String,
        required: true,
    },
    Address: { 
        type: String,
        required: true,
    },
    Car: { 
        type: String,
        required: true,
    },
    Motorcycle: { 
        type: String,
        required: true,
    },
    Model: { 
        type: String,
        required: true,
    },
    Plate: { 
        type: String,
        required: true,
    },
    Declare: { 
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Post',PostSchema);