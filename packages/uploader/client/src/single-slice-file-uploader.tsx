import React from 'react';
import { useRef, useState } from 'react';
import { SingleUploader, useUpdate } from '@/utils';

export default function File() {
    const update = useUpdate();
    const uploaderRef = useRef(new SingleUploader());
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
        uploader
            .upload({
                url: '/api/v1/upload/file',
                files,
            })
            .catch(err => {
                alert(err);
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
        </div>
    );
}
