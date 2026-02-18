import { Transporter } from '@/class/index';

export class FormDataTransporter extends Transporter {
    constructor() {
        super();
        this.hooks.beforeSend.tap(FormDataTransporter.name, (config) => {
            const formData = new FormData();
            const data = (config.data ?? []) as {
                name: string;
                value: string | Blob;
                filename?: string;
            }[];
            for (let i = 0; i < data.length; i++) {
                const { name, value, filename } = data[i];
                if (typeof value === 'string') {
                    formData.append(name, value);
                } else {
                    formData.append(name, value, filename);
                }
            }
            config.data = formData;
            return config;
        });
    }
}
