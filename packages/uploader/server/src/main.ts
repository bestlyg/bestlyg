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
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const sava_path = resolve(`uploads/${file.originalname}`);
    const file_body = fs.readFileSync(resolve(file.path));
    fs.writeFileSync(sava_path, file_body);
    res.json({ success: 0 });
});

app.get('/api', (req, res) => {
    res.json({ success: Date.now() });
});

app.listen(port, () => {
    console.log('App listening : ' + port);
});
