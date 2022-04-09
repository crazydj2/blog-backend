
import { Router } from 'express';

const router = Router();

router.get("/menu", (req, res) => {
    res.send("Test Menu Hello world");
});

router.post("/", (req, res) => {
    res.send("Test Menu Hello world");
});

export default router;