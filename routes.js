import { Router } from "express";
import { db } from "./index.js"; // นำ connection ที่สร้างไว้แล้วมาใช้
const crypto = require('crypto');
const router = Router();

router.post("/login", async (req, res) => {
  const { user, password } = req.body;

  // Mockup user และ password
  const mockUser = "Johndoe"; // กำหนด user ที่ต้องการ
  const mockPassword = "john1234"; // กำหนด password ที่ต้องการ

  // เช็คว่า user และ password ตรงกับ mock หรือไม่
  if (user === mockUser && password === mockPassword) {
    // สร้าง mock token (ใช้ crypto สร้าง string แบบสุ่ม)
    const token = crypto.randomBytes(16).toString('hex'); // สร้าง token แบบสุ่ม

    res.json({ message: "เข้าสู่ระบบสำเร็จ", token, userId: 1 }); // ส่ง token กลับไป
    console.log("เข้าสู่ระบบสำเร็จ");
  } else {
    res.status(400).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
  }
});

router.post("/createtodo", async (req, res) => {
  try {
    const newNote = req.body;
    const [results] = await db.query("INSERT INTO card SET ?", [newNote]);
    console.log(newNote);
    newNote.id = results.insertId;
    res.json(newNote);
  } catch (err) {
    console.error("Error Post Note query:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/todolist", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM card");
    console.log(result); // Log the result to confirm it's an array
    res.json(result);
  } catch (error) {
    console.error("Error fetching todolist:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.put("/edittodolist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const editNote = req.body;

    const results = await db.query("UPDATE card SET ? WHERE id = ?", [
      editNote,
      id,
    ]);
    res.json(results[0])
    console.log("Update Note Successfully", editNote)
  } catch (err) {
    console.error("Error Something Wrong Update Note", err.message)
    res.status(500).json({error: "Can't Update"})
  }
});

router.delete("/todolist/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await db.query("DELETE FROM `card` WHERE id = ?", id);
    res.json({
      message: "delete ok",
      data: result[0],
    });
  } catch (err) {
    console.error("Error cannot delete data", err.message);
    res.status(500).json({ err: "Can't Delete" });
  }
});

export default router;
