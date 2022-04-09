
import { Router } from 'express';

const router = Router();

router.get("/", (req, res) => {
    console.log('access menu......');
    res.end("Test Menu Hello world");
});

router.post("/", (req, res) => {
    console.log('access menu......');
    res.send("Test Menu Hello world");
});

export default router;