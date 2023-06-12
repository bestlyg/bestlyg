import React from 'react';
import { useRef, useState } from 'react';
import { SingleUploader, useUpdate } from '@/utils';

export default function File() {
    const update = useUpdate();
    const uploaderRef = useRef(new SingleUploader());
    const [percent, setPercent] = useState(0);
    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        const uploader = (uploaderRef.current = new SingleUploader());
        uploader.clear();
        uploader.addOnProgress(({ loaded, total }) => {
            setPercent((loaded * 100) / total);
            update();
        });
        uploader
            .upload({
                url: '/api/upload/single',
                files,
            })
            .then(
                () => {
                    update();
                },
                err => {
                    alert(err);
                }
            );
    };
    const blockStyle: React.CSSProperties = {
        padding: '10px',
    };
    return (
        <div>
            <button onClick={() => update()}>render</button>
            <div>
                <input type="file" onChange={onChange} />
            </div>
            {uploaderRef.current.store
                ?.entries()
                .map(([, v]) => v)
                .map((file, i) => {
                    return (
                        <div key={i} style={blockStyle}>
                            <div>current file: </div>
                            <div>name: {file.name}</div>
                            <div>size: {file.size / 1024 / 1024}MB</div>
                            <div>type: {file.type}</div>
                            <div>percent: {percent}%</div>
                        </div>
                    );
                })}
        </div>
    );
}
