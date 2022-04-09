import mongoose from 'mongoose';

const Schema = mongoose.Schema;
 
// Menu Schema
const menuSchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId },
    children: { type: [Schema.Types.ObjectId] },
    articles: { type: [Schema.Types.ObjectId] }
});

const MenuModel = mongoose.model('menu', menuSchema);

export const create = data => {
    let success = false;

    try {
        console.log(data);

        const menu = new MenuModel(data);

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};