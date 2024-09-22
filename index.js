import express from 'express';
import cors from 'cors';
import router from './routes.js';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

// สร้าง connection เพียงครั้งเดียว
let db = null;
async function initializeDBConnection() {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,      
        });
        console.log("Connected To MySQL");
    } catch (err) {
        console.error("Error connecting to MySQL:", err.message);
    }
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
