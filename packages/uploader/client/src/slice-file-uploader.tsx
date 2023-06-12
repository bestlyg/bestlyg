
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
    const blockStyle: React.CSSProperties = {
        padding: '10px',
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
            {uploaderRef.current.workStore
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
            {uploaderRef.current.finishedStores.length ? (
                <div>
                    <div>finished work</div>
                    {uploaderRef.current.finishedStores.map((store, i) => {
                        return store
                            .entries()
                            .map(([, v]) => v)
                            .map((file, j) => {
                                return (
                                    <div key={`${i}:${j}`} style={blockStyle}>
                                        <div>file: </div>
                                        <div>name: {file.name}</div>
                                        <div>size: {file.size / 1024 / 1024}MB</div>
                                        <div>type: {file.type}</div>
                                    </div>
                                );
                            });
                    })}
                </div>
            ) : null}
        </div>
    );
}
