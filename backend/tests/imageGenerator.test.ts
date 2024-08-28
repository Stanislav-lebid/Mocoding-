import { expect } from 'chai';
import { generateImage } from '../src/imageGenerator';
import fs from 'fs';

describe('generateImage', () => {
  it('should generate an image', async () => {
    await generateImage('test-data/sst.grid', 'output.jpg');
    const fileExists = fs.existsSync('output.jpg');
    expect(fileExists).to.be.true;
  });
});
