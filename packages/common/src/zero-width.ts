// 零宽度空格
export const Space = '\u200b';
// 零宽度非换行空格和零宽度连字符组合
export const NonJoinerAndJoiner = '\u200c\u200d';
// 零宽度不换行空格
export const NoBreakSpace = '\uFEFF';
// 零宽度右至左标记
export const RightToLeftMark = '\u200F';
// 零宽度左至右标记
export const LeftToRightMark = '\u200E';
// 零宽度间隔符
export const InvisibleSeparator = '\u2060';

// 将文本编码为零宽字符
export function encode(text: string) {
    let zeroWidthText = '';
    for (let i = 0; i < text.length; i++) {
        // 获取字符的 Unicode 码点
        const charCode = text.codePointAt(i)!;
        // 将码点转换为 16 位二进制字符串
        const binary = charCode.toString(2).padStart(16, '0');
        for (let j = 0; j < binary.length; j++) {
            if (binary[j] === '0') {
                // 零宽度空格表示 0
                zeroWidthText += '\u200b';
            } else {
                // 零宽度非换行空格表示 1
                zeroWidthText += '\u200c';
            }
        }
    }
    return zeroWidthText;
}

// 将零宽字符解码为文本
export function decode(zeroWidthText: string) {
    let text = '';
    const binaryChunks = [];
    let currentChunk = '';
    for (let i = 0; i < zeroWidthText.length; i++) {
        if (zeroWidthText[i] === '\u200b') {
            currentChunk += '0';
        } else if (zeroWidthText[i] === '\u200c') {
            currentChunk += '1';
        }
        if (currentChunk.length === 16) {
            binaryChunks.push(currentChunk);
            currentChunk = '';
        }
    }
    binaryChunks.forEach(chunk => {
        const charCode = parseInt(chunk, 2);
        text += String.fromCodePoint(charCode);
    });
    return text;
}
