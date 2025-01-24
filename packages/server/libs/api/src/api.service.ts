import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
    getHealthCheck() {
        return `health-check: ${dayjs().format('YYYY-MM-DD hh:mm:ss')}`;
    }
}
