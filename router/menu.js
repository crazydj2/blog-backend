
import { Router } from 'express';
import { create } from '../models/Menu.js';

const router = Router();

// GET /menu
// 모든 메뉴 데이터를 트리 형태로 만들어서 리턴 (JSON)
router.get("/", (req, res) => {
    console.log('access menu......');
    res.end("Test Menu Hello world");
});

// PUT /menu
// 하나의 메뉴 데이터 추가
router.post("/", async (req, res) => {
    console.log('post menu......');

    const success = await create(req.body);

    res.send({success});
});

export default router;