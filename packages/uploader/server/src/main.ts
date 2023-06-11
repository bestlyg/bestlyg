import path from 'path';
import fs from 'fs';
import multer from 'multer';
import express from 'express';

const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);
const app = express();
const upload = multer({ dest: resolve('uploads') });
const port = 3000;

app.post('/api/v1/upload/file', upload.single('file'), function (req: any, res, next) {
    const file = req.file;
    if (!file) {
        res.json({ success: 0, message: 'empty file' });
        return;
    }
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const readStream = fs.createReadStream(resolve(file.path));
    const writeStream = fs.createWriteStream(resolve(`uploads/${file.originalname}-${Date.now()}`));
    const pipe = readStream.pipe(writeStream);
    pipe.on('finish', () => {
        res.json({ success: 1 });
    });
    pipe.on('error', e => {
        res.json({ success: 0, message: e.message });
    });
});

app.get('/api', (req, res) => {
    res.json({ success: Date.now() });
});

app.listen(port, () => {
    console.log('App listening : ' + port);
});
