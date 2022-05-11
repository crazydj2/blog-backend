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
    let parentMenu = null;
    let siblingNames = [];    

    try {
        // parent 가 있을 경우
        if (parent) {
            parentMenu = await MenuModel.findById(parent);

            console.log(parentMenu);

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

export const remove = async query => {
    let success = false;

    try {
        // 타겟의 자식 메뉴들까지 다 지우기
        const menu = await MenuModel.find(query);

        let targets = [...menu];

        for (let i = 0; i < targets.length; i++) {
            if (targets[i].children?.length > 0) {
                const childrenMenu = await MenuModel.find({_id: targets[i].children});

                targets = targets.concat(childrenMenu);
            }
        }

        targets = targets.map(t => t._id);

        await MenuModel.deleteMany({_id: targets});

        // 부모 메뉴에서 자기 자신 지우기
        if (menu.parent) {
            const parentMenu = await MenuModel.findById(menu.parent);

            // ObjectId 타입이기 때문에 equals 로만 비교함
            parentMenu.children = parentMenu.children.filter(id => !id.equals(menu._id));

            await parentMenu.save();
        }

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