
import { Router } from 'express';
import { create, get, remove, patch } from '../models/Menu.js';

const router = Router();

// GET /menu
// query 에 맞는 메뉴 데이터를 리스트로 리턴 - query 가 존재하지 않으면 All
// response 는 1차원 array - 본디 트리 구조이긴 하나 이건 클라이언트에게 맡기자
router.get("/", async (req, res) => {
    console.log('get menu......');
    
    const data = await get(req.query);

    const success = !!data;

    res.send({success, data});
});

// POST /menu
// 하나의 메뉴 데이터 추가
router.post("/", async (req, res) => {
    console.log('post menu......');

    const success = await create(req.body);

    res.send({success});
});

// DELETE /menu
// 하나 이상의 메뉴 데이터 삭제
router.delete("/", async (req, res) => {
    console.log('delete menu......');

    const success = await remove(req.body);

    res.send({success});
});

// PATCH /menu
// 하나의 메뉴 데이터 수정 (반드시 query 에 _id 항목 존재해야 함)
router.patch("/", async (req, res) => {
    console.log('patch menu......');

    const success = await patch(req.body?.query, req.body?.data);

    res.send({success});
});


export default router;