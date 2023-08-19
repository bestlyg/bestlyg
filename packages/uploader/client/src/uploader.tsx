import { useEffect, useRef, useState } from 'react';
import { Button, List, Space, message, Progress } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { SingleSliceUploader, getFileData, request } from './utils';

enum FileStatus {
    Ready = 'Ready',
    Uploading = 'Uploading',
    Done = 'Done',
}

export function Uploader() {
    const fileRef = useRef<HTMLInputElement>();
    const [files, setFiles] = useState<{ file: File; percent: number; status: FileStatus }[]>([]);
    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const files = Array.from(e.target.files);
        setFiles(files.map(file => ({ file, percent: 0, status: FileStatus.Ready })));
        setTimeout(() => {
            onUpload(0);
        }, 0);
    };
    const uploaderRef = useRef(new SingleSliceUploader());
    const onUpload = useMemoizedFn((idx: number) => {
        if (idx === files.length) return;
        const uploader = uploaderRef.current = new SingleSliceUploader();

        const newFiles = [...files];
        newFiles[idx].status = FileStatus.Uploading;
        setFiles(newFiles);

        uploader.addOnProgress(({ loaded, total }) => {
            const newFiles = [...files];
            newFiles[idx].percent = (loaded * 100) / total;
            setFiles(newFiles);
        });
        const file = files[idx];
        const filedata = getFileData(file.file);

        uploader
            .upload({
                url: '/api/upload/single/slice',
                files: [file.file],
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
                const newFiles = [...files];
                newFiles[idx].status = FileStatus.Done;
                setFiles(newFiles);
                onUpload(idx + 1);
            })
            .catch(err => {
                message.error(err.toString());
                console.error(err);
            });
    });
    useEffect(() => {
        console.log('files change', files);
    }, [files]);
    return (
        <div>
            <Button
                onClick={() => {
                    // message.success('onClick');
                    fileRef.current.click();
                }}
                type="primary"
            >
                Upload
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={files}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={null}
                            title={`${index + 1}. ${item.file.name}`}
                            description={
                                <Space direction="vertical">
                                    <div>Status: {item.status}</div>
                                    <Progress percent={item.percent} />
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />
            <input
                multiple
                ref={fileRef}
                type="file"
                onChange={onFileChange}
                style={{
                    position: 'absolute',
                    left: -99999,
                }}
            />
        </div>
    );
}
