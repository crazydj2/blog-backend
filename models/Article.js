import mongoose from 'mongoose';

import { get as getMenu, getMenusAndAllChildren } from '../models/Menu.js';

const Schema = mongoose.Schema;
 
// Article Schema
const articleSchema = new Schema({
    title: { type: String, required: true },
    contents: { type: Schema.Types.String, required: true },
    created: { type: Date },
    parent: { type: Schema.Types.ObjectId, required: true }
});

// Article Model
// - 'marticleenu' -> collection 명
const MenuModel = mongoose.model('article', articleSchema);

export const create = async data => {
    let success = false;

    const { parent } = data;

    try {
        // parent check
        const parents = await getMenu({ _id: parent});

        if (parents?.length !== 1) {
            return false;
        }

        // set created
        data.create = (new Date()).getTime();

        const article = new MenuModel(data);
        await article.save();

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};

// query 는 _id 혹은 parent 만 허용
// parent 가 있을 경우에는 모든 자식 메뉴들도 다 대상임.
// 둘 다 없음 all
export const get = async (query = {}) => {
    let data = null;

    console.log(query);

    try {
        let parents = [];

        if (query.parent) {
            const { targets, children } = await getMenusAndAllChildren({ _id: query.parent });

            parents = [...targets, ...children].map(p => p._id);
        }

        console.log(parents);

        data = await MenuModel.find({...query, parent: parents});
    } catch (e) {
        console.error(e);
    }

    return data;
};

export const remove = async query => {
    let success = false;

    // try {
    //     // 타겟의 자식 메뉴들까지 다 지우기
    //     const menu = await MenuModel.find(query);

    //     let targets = [...menu];

    //     for (let i = 0; i < targets.length; i++) {
    //         if (targets[i].children?.length > 0) {
    //             const childrenMenu = await MenuModel.find({_id: targets[i].children});

    //             targets = targets.concat(childrenMenu);
    //         }
    //     }

    //     targets = targets.map(t => t._id);

    //     await MenuModel.deleteMany({_id: targets});

    //     // 부모 메뉴에서 자기 자신 지우기
    //     if (menu.parent) {
    //         const parentMenu = await MenuModel.findById(menu.parent);

    //         // ObjectId 타입이기 때문에 equals 로만 비교함
    //         parentMenu.children = parentMenu.children.filter(id => !id.equals(menu._id));

    //         await parentMenu.save();
    //     }

    //     success = true;
    // } catch (e) {
    //     console.error(e);
    // }

    return success;
};

export const patch = async (query, data) => {
    let success = false;

    // try {
    //     await MenuModel.findOneAndUpdate(query, { $set: data });

    //     success = true;
    // } catch (e) {
    //     console.error(e);
    // }

    return success;
};