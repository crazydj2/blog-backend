import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
// Article Schema
const articleSchema = new Schema({
    title: { type: String, required: true },
    contents: { type: Schema.Types.ObjectId },
    created: { type: Date, required: true },
    menu: { type: Schema.Types.ObjectId, required: true }
});

// Article Model
// - 'marticleenu' -> collection 명
export default mongoose.model('article', articleSchema);