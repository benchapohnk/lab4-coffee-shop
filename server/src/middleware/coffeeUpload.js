const multer = require('multer');
const path = require('path');
const fs = require('fs'); // เพิ่ม fs เพื่อตรวจสอบโฟลเดอร์

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './public/uploads/';
        
        // ตรวจสอบว่ามีโฟลเดอร์หรือยัง ถ้าไม่มีให้สร้างอัตโนมัติ
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // ตั้งชื่อไฟล์: วันที่ปัจจุบัน + นามสกุลเดิม
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // ขยับเป็น 2MB (เผื่อรูปถ่ายจากมือถือที่ขนาดใหญ่)
    fileFilter: function (req, file, cb) {
        // เช็คนามสกุลไฟล์ที่อนุญาต (รวม jfif ที่คุณใช้ด้วย)
        const filetypes = /jpeg|jpg|png|gif|jfif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('รองรับเฉพาะไฟล์รูปภาพเท่านั้น!'));
        }
    }
}).single('image'); 

module.exports = upload;