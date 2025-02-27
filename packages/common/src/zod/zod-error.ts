import { ZodError } from 'zod';

export function zodErrorToMessage(error: ZodError<any>) {
    return error.errors
        .map(error => `${error.path.join('.')} is ${error.message.toLowerCase()}`)
        .join(', ');
}
