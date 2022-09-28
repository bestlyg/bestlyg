import { useMemo, useState } from 'react';

export function HashMode() {
  const [hashLoading, setHashLoading] = useState(-1);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    hash: string;
    type: string;
  } | null>(null);
  const modeList: { label: string; onChange: (file: File) => void }[] = useMemo(
    () => [
      {
        label: 'all hash',
        onChange: file => {
          setFileInfo({
            name: file.name,
            size: file.size,
            type: file.type,
            hash: '',
          });
        },
      },
    ],
    []
  );
  return (
    <div>
      <p>Upload Hash Mode</p>
      {fileInfo && (
        <ul>
          <li>name : {fileInfo.name}</li>
          <li>size : {fileInfo.size}</li>
          <li>hash : {fileInfo.hash}</li>
          <li>type : {fileInfo.type}</li>
        </ul>
      )}
      {hashLoading >= 0 && <p>hashloading : {hashLoading}%...</p>}
      <ol>
        {modeList.map((item, i) => (
          <li key={i}>
            <div>{item.label}</div>
            <input
              type="file"
              onChange={e => {
                const files = Array.from(e.target.files ?? []);
                files.length && item.onChange(files[0]);
              }}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
