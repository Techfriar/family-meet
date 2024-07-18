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
  relatedTo: {
    type: String,
    required: false
  },
  relatedTo2: {
    type: String,
    required: false
  },
  family: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  employment: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false,
    enum: ['en', 'ml']
  }
});

const Family = mongoose.model('Family', familySchema);
export default Family;