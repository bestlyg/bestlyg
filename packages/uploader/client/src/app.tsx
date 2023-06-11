import React from 'react';
import FileV1 from './v1';

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
                    health check1
                </button>
            </div>
            <FileV1 />
        </div>
    );
}
