import express from 'express';
import multer from 'multer';
import path from 'path';
import { generateImage } from './imageGenerator';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('sst'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const outputPath = path.join(__dirname, 'output.jpg');

  try {
    await generateImage(filePath, outputPath);
    res.download(outputPath, 'sea-surface-temp.jpg');
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image.');
  }
});

// Добавьте этот блок для обслуживания React-приложения
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
