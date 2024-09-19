# ใช้ Node.js เวอร์ชันเบา (alpine)
FROM node:18-alpine

RUN apk add --no-cache make gcc g++ python3
# ตั้งค่าตำแหน่งทำงานใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# เปิดพอร์ต 5000
EXPOSE 5000

# รันเซิร์ฟเวอร์
CMD ["npm", "run", "dev"]
