import express from 'express';
import cors from 'cors';
import router from './routes.js';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// สร้าง connection เพียงครั้งเดียว
let db = null;
async function initializeDBConnection(retries = 5) {
    for (let i = 0; i < retries; i++) {
        try {
            db = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
            console.log("Connected To MySQL");
            return;
        } catch (err) {
            console.error("Error connecting to MySQL:", err.message);
            if (i < retries - 1) {
                console.log("Retrying connection...");
                await new Promise(resolve => setTimeout(resolve, 5000)); // รอ 5 วินาทีก่อนลองใหม่
            }
        }
    }
    console.error("Could not connect to MySQL after retries");
}


// เรียกใช้งานฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล
initializeDBConnection();

// ส่ง router เข้ากับแอปพลิเคชัน
app.use(router);

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// export connection
export { db };
