import mongoose from 'mongoose';

const familySchema = new mongoose.Schema({
    picture: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    education: {
        type: String,
        required: false
    },
    grandFather: {
        type: String,
        required: false
    },
    grandMother: {
        type: String,
        required: false
    },
    family: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
});

const Family = mongoose.model('Family', familySchema);

export default Family;
