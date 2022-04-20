
import { Router } from 'express';
import { create, get, remove, patch } from '../models/Menu.js';

const router = Router();

// GET /menu
// 모든 메뉴 데이터를 트리 형태로 만들어서 리턴 (JSON)
router.get("/", async (req, res) => {
    console.log('get menu......');
    
    const data = await get();

    res.send({data});
});

// POST /menu
// 하나의 메뉴 데이터 추가
router.post("/", async (req, res) => {
    console.log('post menu......');

    const success = await create(req.body);

    res.send({success});
});

// DELETE /menu
// 하나의 메뉴 데이터 삭제
router.delete("/", async (req, res) => {
    console.log('delete menu......');

    const success = await remove(req.body);

    res.send({success});
});

// PATCH /menu
// 하나의 메뉴 데이터 추가
router.patch("/", async (req, res) => {
    console.log('patch menu......');

    console.log(req.body);

    const success = await patch(req.body?.query, req.body?.data);

    res.send({success});
});


export default router;