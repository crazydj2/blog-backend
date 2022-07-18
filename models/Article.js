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
const ArticleModel = mongoose.model('article', articleSchema);

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

        const article = new ArticleModel(data);
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
export const get = async query => {
    let data = null;

    try {
        let lastQuery = {};

        if (query?._id) {
            lastQuery._id = query._id;
        }

        if (query?.parent) {
            const { targets, children } = await getMenusAndAllChildren({ _id: query.parent });
            lastQuery.parent = [...targets, ...children].map(p => p._id);
        }

        if (query?.keyword) {
            const reg = new RegExp(`.*${query?.keyword}.*`, 'g');
            lastQuery.title = { $regex: reg};
        }

        console.log(lastQuery);

        lastQuery = lastQuery._id || lastQuery.parent ? lastQuery : null;

        data = await ArticleModel.find(lastQuery);
    } catch (e) {
        console.error(e);
    }

    return data;
};

// 무조건 _id or parent 로만 , "" or ["", ...]
export const remove = async body => {
    let success = false;

    try {
        const query = {};

        const { _id, parent } = body;

        if (_id) {
            query._id = _id;
        }

        if (parent) {
            query.parent = parent;
        }
        
        const targets = await ArticleModel.find(query);

        await ArticleModel.deleteMany({_id: targets.map(t => t._id)});

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};

// 무조건 _id 로
// TODO 검증은 나중에
export const patch = async (query, data) => {
    let success = false;

    try {
        const _id = query?._id;
        if (!_id?.length !== 0) {
            return false;
        }

        await ArticleModel.findOneAndUpdate({ _id }, { $set: data });

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};