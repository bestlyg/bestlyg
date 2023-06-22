import path from 'path';
import fs from 'fs-extra';
import multer from 'multer';
import express from 'express';

const resolve = (...p: string[]) => path.resolve(__dirname, '../../', ...p);
const app = express();
const uploadPath = resolve('uploads');
const uploadTempPath = resolve('uploads_temp');
const upload = multer({ dest: uploadTempPath });
const port = 9001;

// let clearUploadTempTimeout: NodeJS.Timeout = null;
// function clearUploadTemp() {
//     if (!clearUploadTempTimeout) clearTimeout(clearUploadTempTimeout);
//     clearUploadTempTimeout = setTimeout(() => {
//         if (fs.existsSync(uploadTempPath)) fs.emptyDir(uploadTempPath).catch();
//         clearUploadTempTimeout = null;
//     }, 1000 * 60 * 3);
// }

function pipe(
    readStream: string | fs.ReadStream,
    writeStream: string | fs.WriteStream,
    options?: {
        end?: boolean;
    }
) {
    if (typeof readStream === 'string') {
        fs.ensureDirSync(path.dirname(readStream));
        readStream = fs.createReadStream(readStream);
    }
    if (typeof writeStream === 'string') {
        fs.ensureDirSync(path.dirname(writeStream));
        writeStream = fs.createWriteStream(writeStream);
    }
    return new Promise<void>((resolve, reject) => {
        const pipe = (readStream as fs.ReadStream).pipe(writeStream as fs.WriteStream, options);
        (readStream as fs.ReadStream).on('end', () => {
            resolve();
        });
        pipe.on('error', e => {
            reject(e);
        });
    });
}

function mergeFile(from: string[], to: string) {
    const writeStream = fs.createWriteStream(to);
    const load = (index: number) => {
        if (index === from.length) {
            writeStream.close();
            return Promise.resolve();
        }
        return pipe(from[index], writeStream, { end: false }).then(() => load(index + 1));
    };
    return load(0);
}

function readHeaders(headers: Record<string, string>, ...fields: string[]) {
    return fields.map(field => decodeURI(headers[field]));
}

function readFileConfig(headers: Record<string, string>) {
    const [hash, dirname, filename, ext, index] = readHeaders(
        headers,
        'x-uploader-hash',
        'x-uploader-dirname',
        'x-uploader-filename',
        'x-uploader-ext',
        'x-uploader-index'
    );
    return {
        hash: Number(hash),
        dirname,
        filename,
        ext,
        index: Number(index),
    };
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
    const { hash, dirname, index } = readFileConfig(req.headers as Record<string, string>);
    const filepath = resolve(`${uploadPath}/${dirname}`);
    console.log(['======', `name = ${dirname}`, `index = ${index}`, `hash = ${hash}`].join('\n'));
    const distpath = resolve(`${filepath}/${index}`);
    // clearUploadTemp();
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
    // clearUploadTemp();
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
    const { dirname, filename, ext } = readFileConfig(req.headers as Record<string, string>);
    const dirpath = resolve(`${uploadPath}/${dirname}`);
    const filepath = resolve(`${uploadPath}/${filename}.${ext}`);
    console.log(`dirpath = ${dirpath}, filepath = ${filepath}`);
    fs.readdir(dirpath)
        .then(list =>
            mergeFile(
                list
                    .map(v => Number(v))
                    .filter(v => !Number.isNaN(v))
                    .sort((a, b) => a - b)
                    .map(value => resolve(uploadPath, dirname, value + '')),
                filepath
            )
        )
        .then(
            () => res.json({ success: 1 }),
            e => res.json({ success: 0, message: e.message })
        );
});

app.get('/api', (req, res) => {
    console.log(req.headers);
    res.json({ success: 1, message: Date.now() });
});

app.listen(port, () => {
    console.log('App listening : ' + port);
});
