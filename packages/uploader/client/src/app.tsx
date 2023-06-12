import React from 'react';
import SingleFile from './single-file-uploader';

export default function App() {
    return (
        <div>
            <div>
                <button
                    onClick={() => {
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
                    }}
                >
                    health check
                </button>
            </div>
            <SingleFile />
        </div>
    );
}
