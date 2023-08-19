import React from 'react';
import { Space } from 'antd';
import { HealthCheck } from './components/health-check';
import { Uploader } from './uploader';
// import SingleFile from './single-file-uploader';
// import SingleSliceFile from './single-slice-file-uploader';

export default function App() {
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <HealthCheck />
            {/* <div>
                <p>SingleFile</p>
                <SingleFile />
            </div>

            <div>
                <p>SingleSliceFile</p>
                <SingleSliceFile />
            </div> */}
            <Uploader />
        </Space>
    );
}
