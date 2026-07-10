import { formatLogMessage } from './log-message';

describe('formatLogMessage', () => {
    it('preserves multi-argument console-style log details', () => {
        const circular: { name: string; self?: unknown } = { name: 'payload' };
        circular.self = circular;
        const error = new Error('boom');

        const message = formatLogMessage('failed', { id: 1 }, circular, error);

        expect(message).toContain('failed');
        expect(message).toContain('"id":1');
        expect(message).toContain('"name":"payload"');
        expect(message).toContain('"self":"[Circular]"');
        expect(message).toContain('Error: boom');
    });
});
