
import { Router } from 'express';
import { create, get, remove, patch } from '../models/Article.js';

const router = Router();

// GET /article
// 모든 메뉴 데이터를 리스트로 리턴 (본디 트리 구조이긴 하나 이건 클라이언트에게 맡기자)
router.get("/", async (req, res) => {
    console.log('get article......');
    
    const data = await get(req.query);

    res.send({data});
});

// POST /article
// 하나의 메뉴 데이터 추가
router.post("/", async (req, res) => {
    console.log('post article......');

    const success = await create(req.body);

    res.send({success});
});

// DELETE /article
// 하나의 메뉴 데이터 삭제
router.delete("/", async (req, res) => {
    console.log('delete article......');

    const success = await remove(req.body);

    res.send({success});
});

// PATCH /article
// 하나의 메뉴 데이터 추가
router.patch("/", async (req, res) => {
    console.log('patch article......');

    const success = await patch(req.body?.query, req.body?.data);

    res.send({success});
});


export default router;