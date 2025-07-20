# ใช้ base image ของ Node.js
FROM node:18


# สร้าง working directory
WORKDIR /usr/src/app 

# คัดลอกไฟล์ package.json และ package-lock.json ก่อน (เพื่อ cache npm install)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจกต์ที่เหลือ
COPY . .

# เปิด port
EXPOSE 3000

# สั่งให้รัน app
CMD ["npm", "start"]



