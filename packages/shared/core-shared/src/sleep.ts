/** 等待指定毫秒数，常用于测试、轮询或节流流程。 */
export async function sleep(t = 1000) {
    return new Promise((r) => {
        setTimeout(r, t);
    });
}
