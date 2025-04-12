import React from 'react';
import { zeroWidth } from '@bestlyg/common';
import { Textarea } from '@/shadcn/ui/textarea';
import { Button } from '@/shadcn/ui/button';
import { ArrowLeftRightIcon, CirclePlayIcon } from 'lucide-react';
import { useBoolean } from 'ahooks';
import { Label } from '@/shadcn/ui/label';

export default function ZeroWidthUI() {
    React.useEffect(() => {
        const {
            Space,
            NonJoinerAndJoiner,
            NoBreakSpace,
            RightToLeftMark,
            LeftToRightMark,
            InvisibleSeparator,
        } = zeroWidth;
        // 打印各零宽度字符及其长度
        console.log(`零宽度空格: "${Space}", 长度: ${Space.length}`);
        console.log(
            `零宽度非换行空格和零宽度连字符组合: "${NonJoinerAndJoiner}", 长度: ${NonJoinerAndJoiner.length}`,
        );
        console.log(`零宽度不换行空格: "${NoBreakSpace}", 长度: ${NoBreakSpace.length}`);
        console.log(`零宽度右至左标记: "${RightToLeftMark}", 长度: ${RightToLeftMark.length}`);
        console.log(`零宽度左至右标记: "${LeftToRightMark}", 长度: ${LeftToRightMark.length}`);
        console.log(`零宽度间隔符: "${InvisibleSeparator}", 长度: ${InvisibleSeparator.length}`);
    }, []);
    const [encodeText, setEncodeText] = React.useState('');
    const [decodeText, setDecodeText] = React.useState('');
    const encodeNode = (
        <div className="grid w-full gap-1.5">
            <Label htmlFor="zw-encode">转译前的文本</Label>
            <Textarea
                className="h-[500px]"
                id="zw-encode"
                value={encodeText}
                onChange={e => setEncodeText(e.target.value)}
            />
        </div>
    );
    const decodeNode = (
        <div className="grid w-full gap-1.5">
            <Label htmlFor="zw-decode">转译后的文本</Label>
            <Textarea
                className="h-[500px]"
                id="zw-decode"
                value={decodeText}
                onChange={e => setDecodeText(e.target.value)}
            />
        </div>
    );
    const [swap, swapOps] = useBoolean(false);
    return (
        <div className="flex gap-[16px] items-center">
            {swap ? decodeNode : encodeNode}
            <div className="flex flex-col gap-[4px]">
                <Button onClick={swapOps.toggle}>
                    <ArrowLeftRightIcon />
                </Button>
                <Button
                    onClick={() => {
                        if (swap) {
                            setEncodeText(`${zeroWidth.decode(decodeText)}`);
                        } else {
                            setDecodeText(`[${zeroWidth.encode(encodeText)}]`);
                        }
                    }}
                >
                    <CirclePlayIcon />
                </Button>
            </div>
            {swap ? encodeNode : decodeNode}
        </div>
    );
}
