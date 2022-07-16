import mongoose from 'mongoose';

import { remove as removeArticle } from './Article.js';

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
    let parentMenu = null;
    let siblingNames = [];    

    try {
        // parent 가 있을 경우
        if (parent) {
            parentMenu = await MenuModel.findById(parent);

            if (!parentMenu) {
                return false;
            }

            siblingNames = (await MenuModel.find({_id: parentMenu.children})).map(child => child.name);
        } else {
            siblingNames = (await MenuModel.find({parent: null})).map(child => child.name);
        }
    
        // 같은 이름의 메뉴가 있는지 검사
        if (siblingNames.includes(name)) {
            return false;
        }

        const menu = new MenuModel(data);
        await menu.save();

        // parent 가 있는 경우, parent 의 children 에 추가되어야 함;
        if (parentMenu) {
            parentMenu.children.push(menu._id);
            await parentMenu.save();
        }

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

// 무조건 _id 기준, "" 아니면 ["", ...]
// TODO 검증은 나중에......
export const remove = async body => {
    let success = false;

    try {
        const _id = body._id;
        if (_id.length === 0) {
            return false;
        }

        // 타겟의 자식 메뉴들까지 다 지우기
        let { targets, children } = await getMenusAndAllChildren({ _id });

        const allTarget = [...targets, ...children].map(t => t._id);

        await MenuModel.deleteMany({_id: allTarget});

        const parentMap = new WeakMap();

        // 타겟의 부모 메뉴에서 자기 자신 지우기
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];

            if (target.parent) {
                if (!parentMap.has(target.parent)) {
                    parentMap.set(target.parent, await MenuModel.findById(target.parent));
                }

                const parentMenu = parentMap.get(target.parent);

                // ObjectId 타입이기 때문에 equals 로만 비교함
                parentMenu.children = parentMenu.children.filter(id => !id.equals(target._id));
            }
        }

        console.log(parentMap)

        for (const parentMenu of parentMap) {
            await parentMenu.save();
        }

        // 타겟들의 글 삭제
        removeArticle({parent: allTarget});

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};

// 무조건 _id 기준
// TODO 검증은 나중에......
export const patch = async (query, data) => {
    let success = false;

    try {
        const _id = query?._id;
        if (!_id?.length !== 0) {
            return false;
        }

        await MenuModel.findOneAndUpdate({ _id }, { $set: data });

        success = true;
    } catch (e) {
        console.error(e);
    }

    return success;
};

// target 메뉴들 + 자신의 모든 자식 메뉴들을 array 로 리턴
export const getMenusAndAllChildren = async query => {
    let targets = [];
    let children = [];

    console.log(query);

    try {
        // 타겟의 자식 메뉴들까지 다 지우기
        targets = await MenuModel.find(query);
        console.log(targets);
        children = [...targets];

        for (let i = 0; i < children.length; i++) {
            if (children[i].children?.length > 0) {
                const newChildren = await MenuModel.find({_id: children[i].children});
                children = [...children, ...newChildren]
            }
        }

        children = children.slice(targets.length);
    } catch (e) {
        console.error(e);
        targets = [];
        children = [];
    }

    return { targets, children };
}