import React from 'react';
import { useRef, useState } from 'react';
import { SingleSliceUploader, request, useUpdate, getFileData } from '@/utils';

export default function File() {
    const update = useUpdate();
    const uploaderRef = useRef(new SingleSliceUploader());
    const [percent, setPercent] = useState(0);
    const [config, setConfig] = useState({
        multiple: !false,
    });
    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const uploader = uploaderRef.current;
        uploader.clear();
        uploader.addOnProgress(({ loaded, total }) => {
            setPercent((loaded * 100) / total);
            update();
        });
        const filedata = getFileData(files[0]);
        uploader
            .upload({
                url: '/api/upload/single/slice',
                files,
                index: 0,
            })
            .then(() =>
                request({
                    url: '/api/upload/single/merge',
                    method: 'post',
                    headers: {
                        'x-uploader-dirname': filedata.name,
                        'x-uploader-filename': filedata.name,
                        'x-uploader-ext': filedata.ext,
                    },
                })
            )
            .then(() => {
                alert('Success');
            })
            .catch(err => {
                alert(err.toString());
                console.error(err);
            });
    };
    return (
        <div>
            <button onClick={() => update()}>render</button>
            {Object.entries(config).map(([k, v], i) => (
                <div key={i}>
                    {k}
                    <input
                        type="checkbox"
                        checked={v}
                        onChange={e => {
                            const cur = e.target.checked;
                            setConfig({
                                ...config,
                                [k]: cur,
                            });
                        }}
                    />
                </div>
            ))}
            <div>
                <input {...config} type="file" onChange={onChange} />
            </div>
            <div>percent: {percent}</div>
        </div>
    );
}
