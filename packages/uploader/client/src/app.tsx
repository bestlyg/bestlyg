import React from 'react';
import SingleFile from './single-file-uploader';
import SingleSliceFile from './single-slice-file-uploader';

export default function App() {
    const onHealthCheck = () => {
        fetch('/api', {
            method: 'get',
        })
            .then(res => res.json())
            .then(res => {
                alert(new Date(res.success));
            })
            .catch(err => {
                alert(err);
            });
    };
    return (
        <div>
            <div>
                <button onClick={() => onHealthCheck()}>health check</button>
            </div>
            <div>
                <p>SingleFile</p>
                <SingleFile />
            </div>

            <div>
                <p>SingleSliceFile</p>
                <SingleSliceFile />
            </div>
        </div>
    );
}
