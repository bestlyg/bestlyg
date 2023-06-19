import path from 'path';
import fs from 'fs-extra';
import multer from 'multer';
import express from 'express';

const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);
const app = express();
const uploadPath = resolve('uploads_temp');
const upload = multer({ dest: uploadPath });
const port = 3000;

function pipe(readStream: string | fs.ReadStream, writeStream: string | fs.WriteStream) {
    if (typeof readStream === 'string') {
        fs.ensureDirSync(path.dirname(readStream));
        readStream = fs.createReadStream(readStream);
    }
    if (typeof writeStream === 'string') {
        fs.ensureDirSync(path.dirname(writeStream));
        writeStream = fs.createWriteStream(writeStream);
    }
    return new Promise<void>((resolve, reject) => {
        const pipe = (readStream as fs.ReadStream).pipe(writeStream as fs.WriteStream, {
            end: false,
        });
        (readStream as fs.ReadStream).on('end', () => {
            resolve();
        });
        pipe.on('error', e => {
            reject(e);
        });
    });
}

app.post('/api/upload/single', upload.single('file'), function (req, res, next) {
    const file = req.file;
    if (!file) {
        res.json({ success: 0, message: 'empty file' });
        return;
    }
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const filename = `${Date.now()}-${file.originalname}`;
    pipe(resolve(file.path), resolve(`uploads/${filename}`)).then(
        () => {
            res.json({ success: 1, data: filename });
        },
        e => {
            res.json({ success: 0, message: e.message });
        }
    );
});

app.post('/api/upload/single/slice', upload.single('slice'), function (req, res, next) {
    console.log('====> slice');
    const file = req.file;
    if (!file) {
        res.json({ success: 0, message: 'empty file' });
        return;
    }
    const hash: number = Number(decodeURI(req.headers['x-uploader-hash'] as string));
    const dirname = decodeURI(req.headers['x-uploader-dirname'] as string);
    const filename = decodeURI(req.headers['x-uploader-filename'] as string);
    const ext = decodeURI(req.headers['x-uploader-ext'] as string);
    const index: number = Number(decodeURI(req.headers['x-uploader-index'] as string));
    const filepath = resolve(`uploads/${dirname}`);
    console.log(['======', `name = ${dirname}`, `index = ${index}`, `hash = ${hash}`].join('\n'));
    const distpath = resolve(`${filepath}/${index}`);
    if (fs.existsSync(distpath)) {
        fs.readdir(filepath).then(list => {
            const set = new Set(list.map(v => Number(v)));
            let i = 0;
            while (set.has(i)) i++;
            res.json({ success: 1, data: i });
        });
        return;
    }
    pipe(resolve(file.path), distpath)
        .then(() => fs.readdir(filepath))
        .then(list => {
            const set = new Set(list.map(v => Number(v)));
            let i = 0;
            while (set.has(i)) i++;
            res.json({ success: 1, data: i });
        })
        .catch(e => {
            res.json({ success: 0, message: e.message });
        });
});

app.get('/api/upload/single/exist', function (req, res, next) {
    const dirname = decodeURI(req.headers['x-uploader-dirname'] as string);
    const dirpath = resolve(`uploads/${dirname}`);
    const idx = req.query.idx;
    fs.exists(dirpath).then(f => {
        if (f) {
            fs.readdir(dirpath).then((list: any) => {
                if (new Set(list).has(idx)) {
                    res.json({ success: 1 });
                } else {
                    res.json({ success: 0 });
                }
            });
        } else {
            res.json({ success: 0 });
        }
    });
});

app.post('/api/upload/single/merge', function (req, res, next) {
    console.log('====> merge');
    const dirname = decodeURI(req.headers['x-uploader-dirname'] as string);
    const filename = decodeURI(req.headers['x-uploader-filename'] as string);
    const ext = decodeURI(req.headers['x-uploader-ext'] as string);
    const dirpath = resolve(`uploads/${dirname}`);
    const filepath = resolve(`uploads/${filename}.${ext}`);
    console.log(`dirpath = ${dirpath}, filepath = ${filepath}`);
    const writeStream = fs.createWriteStream(filepath);
    let filelist: number[] = [];
    const load = (index: number) => {
        if (index === filelist.length) {
            writeStream.close();
            return Promise.resolve();
        }
        return pipe(resolve(dirpath, filelist[index].toString()), writeStream).then(() =>
            load(index + 1)
        );
    };
    fs.readdir(dirpath)
        .then(list => {
            filelist = list
                .map(v => Number(v))
                .filter(v => !Number.isNaN(v))
                .sort((a, b) => a - b);
            console.log('filelist', filelist);
            return load(0);
        })
        .then(
            () => res.json({ success: 1 }),
            e => res.json({ success: 0, message: e.message })
        );
});

app.get('/api', (req, res) => {
    console.log(req.headers);
    res.json({ success: Date.now() });
});

app.listen(port, () => {
    console.log('App listening : ' + port);
});
