const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const BINARY_DIMENSION_X = 36000;
const BINARY_DIMENSION_Y = 17999;

export const generateImage = async (binaryFilePath: string, outputPath: string) => {
  const binaryData = fs.readFileSync(binaryFilePath);

  const mapBuffer = fs.readFileSync(path.join(__dirname, '../public/empty-map.jpg'));

  const image = await sharp(mapBuffer)
    .raw()
    .resize(BINARY_DIMENSION_X, BINARY_DIMENSION_Y)
    .toBuffer();

  for (let y = 0; y < BINARY_DIMENSION_Y; y++) {
    for (let x = 0; x < BINARY_DIMENSION_X; x++) {
      const index = y * BINARY_DIMENSION_X + x;
      const temperature = binaryData[index];
      // Преобразуйте температуру в цвет
      const color = temperatureToColor(temperature);
      // Примените цвет к карте
      image[index * 3] = color[0];     // R
      image[index * 3 + 1] = color[1]; // G
      image[index * 3 + 2] = color[2]; // B
    }
  }

  await sharp(image, { raw: { width: BINARY_DIMENSION_X, height: BINARY_DIMENSION_Y, channels: 3 } })
    .jpeg()
    .toFile(outputPath);
};

const temperatureToColor = (temperature: number) => {
  // Простой градиент от синего (холодно) до красного (жарко)
  const ratio = (temperature - 32) / (100 - 32);
  const red = Math.min(255, Math.max(0, Math.round(ratio * 255)));
  const blue = 255 - red;
  return [red, 0, blue];
};
