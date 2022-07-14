
import { Router } from 'express';
import fs from "fs";

const router = Router();

// POST /admin
// 하나의 메뉴 데이터 추가
router.post("/", async (req, res) => {
    console.log('post admin......');

    let success = false;

    try {
        const password = fs.readFileSync("admin-password.dat", "utf8");

        console.log(`####${password}#####${req.body}####${req.body.password === password}`);

        if (req.body.password && req.body.password === password) {
            success = true;
        }
    } catch (err) {
        console.log(err);
        success = false;
    }

    res.send({success});
});


export default router;