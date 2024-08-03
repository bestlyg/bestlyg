import { Transporter } from '@/class/index';

export class BinaryTransporter extends Transporter {
    constructor() {
        super();
        this.hooks.beforeSend.tap(BinaryTransporter.name, config => {
            config.headers['Content-Type'] = 'application/octet-stream';
            config.headers['Content-Disposition'] = `attachment`;
            return config;
        });
    }
}
