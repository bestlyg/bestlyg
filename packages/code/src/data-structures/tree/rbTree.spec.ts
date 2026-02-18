import { IRBTree, RBTree } from './rbTree';
import { RBTree2 } from './rbTree2';
import { RBTree3 } from './rbTree3';

const list = [RBTree, RBTree2, RBTree3];
list.forEach(run);
function run(Cstr: new (compare) => IRBTree<number>) {
    describe(`RedBlackTree 【${Cstr.name}】`, () => {
        let tree: IRBTree<number>;
        beforeEach(() => {
            tree = new Cstr((t1, t2) => t1 - t2);
        });
        test('printer', () => {
            [50, 24, 80].forEach((v) => tree.add(v));
            tree.print();
        });
        describe('add', () => {
            beforeEach(() => {
                /**
                 * 52
                 * ├─ R 86(R)
                 * │     ├──── R 97
                 * │     │      └── L 94(R)
                 * │     └──── L 63
                 * └─ L 22(R)
                 *       ├──── R 42
                 *       │      ├── R 48(R)
                 *       │      └── L 30(R)
                 *       └──── L 11
                 *              └── R 12(R)
                 */
                [52, 11, 63, 48, 97, 22, 42, 30, 86, 94, 12].forEach((v) => {
                    tree.add(v);
                });
            });
            describe('parent is black', () => {
                describe('degree 1', () => {
                    test('add right', () => {
                        tree.add(100);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 94, 100].join(''),
                        );
                    });
                    test('add left', () => {
                        tree.add(1);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 1, 12, 30, 48, 94].join(''),
                        );
                    });
                });
                describe('degree 0', () => {
                    test('add left', () => {
                        tree.add(62);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 62, 94].join(''),
                        );
                    });
                    test('add right', () => {
                        tree.add(64);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 64, 94].join(''),
                        );
                    });
                });
            });
            describe('parent is red', () => {
                describe('degree 1', () => {
                    test('LL', () => {
                        tree.add(93);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 94, 12, 30, 48, 93, 97].join(''),
                        );
                    });
                    test('LR', () => {
                        tree.add(95);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 95, 12, 30, 48, 94, 97].join(''),
                        );
                    });
                    test('RL', () => {
                        tree.add(11.5);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11.5, 42, 63, 97, 11, 12, 30, 48, 94].join(''),
                        );
                    });
                    test('RR', () => {
                        tree.add(13);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 12, 42, 63, 97, 11, 13, 30, 48, 94].join(''),
                        );
                    });
                });
                describe('degree 2', () => {
                    test('LL', () => {
                        tree.add(29);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 94, 29].join(''),
                        );
                    });
                    test('LR', () => {
                        tree.add(31);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 94, 31].join(''),
                        );
                    });
                    test('RL', () => {
                        tree.add(47);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 94, 47].join(''),
                        );
                    });
                    test('RR', () => {
                        tree.add(49);
                        expect(tree.levelOrder().join('')).toBe(
                            [52, 22, 86, 11, 42, 63, 97, 12, 30, 48, 94, 49].join(''),
                        );
                    });
                });
            });
        });
        describe('remove', () => {
            describe('node is red', () => {
                beforeEach(() => {
                    [50, 24, 80, 12, 30].forEach((v) => tree.add(v));
                });
                test('node is left child', () => {
                    tree.remove(12);
                    expect(tree.levelOrder().join('')).toBe([50, 24, 80, 30].join(''));
                });
                test('node is right child', () => {
                    tree.remove(30);
                    expect(tree.levelOrder().join('')).toBe([50, 24, 80, 12].join(''));
                });
            });
            describe('node is black', () => {
                beforeEach(() => {
                    [50, 24, 80].forEach((v) => tree.add(v));
                });
                describe('node is right child', () => {
                    describe('node has 1 child', () => {
                        test('left', () => {
                            tree.add(60);
                            tree.remove(80);
                            expect(tree.levelOrder().join('')).toBe([50, 24, 60].join(''));
                        });
                        test('right', () => {
                            tree.add(100);
                            tree.remove(80);
                            expect(tree.levelOrder().join('')).toBe([50, 24, 100].join(''));
                        });
                    });
                    describe('sibling is black', () => {
                        test('sibling has two red children', () => {
                            tree.add(12);
                            tree.add(30);
                            tree.remove(80);
                            expect(tree.levelOrder().join('')).toBe([24, 12, 50, 30].join(''));
                        });
                        test('sibling has left red children', () => {
                            tree.add(12);
                            tree.remove(80);
                            expect(tree.levelOrder().join('')).toBe([24, 12, 50].join(''));
                        });
                        test('sibling has right red children', () => {
                            tree.add(30);
                            tree.remove(80);
                            expect(tree.levelOrder().join('')).toBe([30, 24, 50].join(''));
                        });
                        test('sibling has no red child', () => {
                            tree.add(30);
                            tree.remove(30);
                            tree.remove(80);
                            expect(tree.levelOrder().join('')).toBe([50, 24].join(''));
                        });
                    });
                    test('sibling is red', () => {
                        [12, 30, 32].forEach((v) => tree.add(v));
                        tree.remove(80);
                        expect(tree.levelOrder().join('')).toBe([24, 12, 32, 30, 50].join(''));
                    });
                });
                describe('node is left child', () => {
                    describe('node has 1 child', () => {
                        test('left', () => {
                            tree.add(12);
                            tree.remove(24);
                            expect(tree.levelOrder().join('')).toBe([50, 12, 80].join(''));
                        });
                        test('right', () => {
                            tree.add(25);
                            tree.remove(24);
                            expect(tree.levelOrder().join('')).toBe([50, 25, 80].join(''));
                        });
                    });
                    describe('sibling is black', () => {
                        test('sibling has two red children', () => {
                            tree.add(60);
                            tree.add(90);
                            tree.remove(24);
                            expect(tree.levelOrder().join('')).toBe([80, 50, 90, 60].join(''));
                        });
                        test('sibling has left red children', () => {
                            tree.add(60);
                            tree.remove(24);
                            expect(tree.levelOrder().join('')).toBe([60, 50, 80].join(''));
                        });
                        test('sibling has right red children', () => {
                            tree.add(90);
                            tree.remove(24);
                            expect(tree.levelOrder().join('')).toBe([80, 50, 90].join(''));
                        });
                        test('sibling has no red child', () => {
                            tree.add(60);
                            tree.remove(60);
                            tree.remove(24);
                            expect(tree.levelOrder().join('')).toBe([50, 80].join(''));
                        });
                    });
                    test('sibling is red', () => {
                        [60, 90, 95].forEach((v) => tree.add(v));
                        tree.remove(24);
                        expect(tree.levelOrder().join('')).toBe([80, 50, 90, 60, 95].join(''));
                    });
                });
            });
        });
    });
}
