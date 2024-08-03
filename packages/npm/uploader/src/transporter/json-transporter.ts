import { Transporter } from '@/class/index';

export class FormDataTransporter extends Transporter {
    constructor() {
        super();
        this.hooks.beforeSend.tap(FormDataTransporter.name, config => {
            config.headers['Content-Type'] = 'application/json';
            config.data = JSON.stringify(config.data);
            return config;
        });
    }
}
