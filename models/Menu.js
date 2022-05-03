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

    const { name, parent } = data;
    let siblingNames = [];    

    try {
        // parent 가 있을 경우
        if (parent) {
            const parentMenu = await MenuModel.findById(parent);
            if (!parentMenu) {
                return false;
            }

            siblingNames = parentMenu.children.map(child => child.name);
        } else {
            siblingNames = (await MenuModel.find({parent: null})).map(child => child.name);
        }
    
        // 같은 이름의 메뉴가 있는지 검사
        if (siblingNames.includes(name)) {
            return false;
        }

        const menu = new MenuModel(data);
        await menu.save();

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};

export const get = async query => {
    let data = null;

    try {
        data = await MenuModel.find(query);
    } catch (e) {
        console.error(e);
    }

    return data;
};

export const remove = async query => {
    let success = false;

    try {
        await MenuModel.findOneAndDelete(query);

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};

export const patch = async (query, data) => {
    let success = false;

    try {
        await MenuModel.findOneAndUpdate(query, { $set: data });

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};