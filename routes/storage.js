const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Налаштування multer для зберігання файлів
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Маршрут для завантаження аватара
router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    console.log('upload-avatar')
    res.json({
        message: 'Файл успішно завантажено',
        filePath: `/uploads/${req.file.filename}`
    });
});

// Віддаємо статичні файли для перегляду
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = router;