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

export const create = async data => {
    let success = false;

    console.log(data);

    // data validate 코드 추가

    try {
        const menu = new MenuModel(data);
        menu.save();

        success = true;
        
        get();
    } catch (e) {
        console.error(e);
    }

    return success;
};

export const get = async query => {
    try {
        const result = await MenuModel.find();

        console.log(JSON.stringify(result));
    } catch (e) {
        console.error(e);
    }
};