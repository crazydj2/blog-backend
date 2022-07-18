
import { Router } from 'express';
import { create, get, remove, patch } from '../models/Article.js';

const router = Router();

// GET /article
// 모든 글을 리스트로 리턴
router.get("/", async (req, res) => {
    console.log('get article......');
    
    const data = await get(req.query);

    const success = !!data;

    res.send({success, data});
});

// POST /article
// 하나의 글 추가
router.post("/", async (req, res) => {
    console.log('post article......');

    const success = await create(req.body);

    res.send({success});
});

// DELETE /article
// 하나의 글 삭제
router.delete("/", async (req, res) => {
    console.log('delete article......');

    const success = await remove(req.body);

    res.send({success});
});

// PATCH /article
// 하나의 글 추가
router.patch("/", async (req, res) => {
    console.log('patch article......');

    const success = await patch(req.body?.query, req.body?.data);

    res.send({success});
});


export default router;