import { Button, message } from 'antd';
export function HealthCheck() {
    const onHealthCheck = () => {
        fetch('/api', {
            method: 'get',
        })
            .then(res => res.json())
            .then(res => {
                message.success(new Date(res.success).toString());
            })
            .catch(err => {
                message.error(err?.toString() ?? 'ERROR');
                console.error(err);
            });
    };
    return <Button onClick={() => onHealthCheck()}>health check</Button>;
}
