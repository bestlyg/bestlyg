import React from 'react';
import { useRef, useState } from 'react';

export default function File() {
    const [file, setFile] = useState<File>(null);
    const [percent, setPercent] = useState(0);
    const fileRef = useRef<HTMLInputElement>();
    const [config, setConfig] = useState({
        multiple: false,
    });
    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const files = Array.from(e.target.files);
        const file = files[0];
        if (!file) return;
        setFile(file);
        console.log('file', file);
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/v1/upload/file');
        const form = new FormData();
        form.append('file', file);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                alert('success');
            }
        };
        xhr.upload.onprogress = e => {
            setPercent((e.loaded * 100) / e.total);
        };
        xhr.send(form);
    };
    return (
        <div>
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
                <input {...config} type="file" ref={fileRef} onChange={onChange} />
            </div>
            {file && (
                <div>
                    <div>file: </div>
                    <div>name: {file.name}</div>
                    <div>size: {file.size / 1024 / 1024}MB</div>
                    <div>type: {file.type}</div>
                    <div>percent: {percent}%</div>
                </div>
            )}
        </div>
    );
}
