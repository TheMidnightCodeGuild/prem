import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile:String,
  message: String,
}, {
  timestamps: true
});

export default mongoose.models.FormData || mongoose.model('FormData', formDataSchema);
