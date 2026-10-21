import { describe, expect, it, rs } from '@rstest/core';
import { Task } from './task';
import { Uploader } from './uploader';

describe('uploader queue', () => {
    it('keeps queued tasks paused and runs them with the configured concurrency', async () => {
        const uploader = new Uploader({ queueOptions: [{ autoStart: false, concurrency: 1 }] });
        const order: number[] = [];
        const completed = rs.fn();
        uploader.tasks.addEventListener('completed', completed);
        for (const value of [1, 2, 3]) {
            const task = new Task(new Blob([String(value)]));
            task.run = async () => {
                order.push(value);
            };
            await uploader.addTask(task);
        }
        expect(order).toEqual([]);
        expect(uploader.tasks.size).toBe(3);
        await uploader.runTask();
        await uploader.tasks.onIdle();
        expect(order).toEqual([1, 2, 3]);
        expect(completed).toHaveBeenCalledTimes(3);
    });

    it('clears waiting tasks without executing them or causing unhandled rejections', async () => {
        const uploader = new Uploader({ queueOptions: [{ autoStart: false }] });
        const task = new Task(new Blob(['cancelled']));
        const run = rs.spyOn(task, 'run');
        await uploader.addTask(task);
        await uploader.clearTask();
        await uploader.runTask();
        await uploader.tasks.onIdle();
        // Allow rejection reporting to run before the test completes.
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(run).not.toHaveBeenCalled();
        expect(uploader.tasks.size).toBe(0);
    });
});
