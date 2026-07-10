jest.mock('@bestlyg-server/common', () => ({
    leetcode: {},
}));

import { LeetcodeProblemController } from './leetcode-problem.controller';

describe('LeetcodeProblemController', () => {
    it('falls back to the file name when finding a problem by a routed path name', async () => {
        const problem = {
            id: '649fd1f3-c507-4e7d-b5ef-82f6a56aca11',
            name: '11.盛最多水的容器',
            url: 'https://leetcode.cn/problems/container-with-most-water',
            desc: 'desc',
            tags: [],
            level: 'middle',
            solutions: [],
        };
        const service = {
            findOne: jest.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(problem),
        };
        const controller = new LeetcodeProblemController(service as never, {} as never);

        const response = await controller.findByName({
            name: '1-100/11.盛最多水的容器',
        } as never);

        expect(service.findOne).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                where: { name: '1-100/11.盛最多水的容器' },
            }),
        );
        expect(service.findOne).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                where: { name: '11.盛最多水的容器' },
            }),
        );
        expect(response.data).toBe(problem);
    });
});
