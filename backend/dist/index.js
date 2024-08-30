"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imageGenerator_1 = require("./imageGenerator");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.post('/upload', upload.single('sst'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const filePath = req.file.path;
    const outputPath = path_1.default.join(__dirname, 'output.jpg');
    try {
        await (0, imageGenerator_1.generateImage)(filePath, outputPath);
        res.download(outputPath, 'sea-surface-temp.jpg');
    }
    catch (error) {
        console.error('Error generating image:', error);
        res.status(500).send('Error generating image.');
    }
});
// Добавьте этот блок для обслуживания React-приложения
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/build', 'index.html'));
});
// Запуск сервера
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
