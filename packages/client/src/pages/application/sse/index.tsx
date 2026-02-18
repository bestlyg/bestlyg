import { Markdown } from '@/components/markdown';
import { Button } from '@/shadcn/ui/button';
import { Textarea } from '@/shadcn/ui/textarea';
import { useBoolean } from 'ahooks';
import { useEffect, useState } from 'react';
import { apiMap, sse, ResponseEntity } from '@bestlyg/common';
import { xTokenName } from '@/utils';

const defaultInput = `
# 天 <div style={{height:30,width:30,background:'red'}} />

## 春天

春天，宛如一位轻盈的舞者，悄然降临大地。

田野间，嫩绿的小草迫不及待地从土里探出脑袋，好奇地张望着这个崭新的世界。

河边的柳树抽出了细长的枝条，新芽点点，在微风中轻轻摇曳，仿佛是柳树姑娘在梳理她那柔顺的长发。

桃花灼灼，粉绿相间，一团团，一簇簇，像天边的云霞飘落人间，散发着淡淡的芬芳，引得蜜蜂、蝴蝶在花丛中忙碌地穿梭、嬉戏。

随着时间的缓缓推移，夏天炽热登场。

阳光变得格外强烈，毫不吝啬地洒向每一个角落。

湛蓝的天空中，云朵像棉花糖般飘浮着，偶尔变幻出各种奇妙的形状。

池塘里，荷叶挨挨挤挤，像一个个碧绿的大圆盘。

荷花在这些圆盘之间冒出来，有的花瓣儿全展开了，露出嫩黄色的小莲蓬；有的还是花骨朵儿，看起来饱胀得马上要破裂似的。

蝉在枝头不知疲倦地鸣叫着，仿佛在演奏一首夏日交响曲，为这炎热的季节增添了几分热闹的气息。

## 秋天

秋天，带着丰收的喜悦翩然而至。

果园里，红彤彤的苹果挂满枝头，像一个个小灯笼，照亮了整个果园；黄澄澄的梨子你挤我碰，争着向人们展示自己饱满的身姿；一串串紫莹莹的葡萄像玛瑙似的，在阳光下闪闪发光。

田野里，金黄的稻子笑弯了腰，随着秋风翻起层层金浪。

农民伯伯们脸上洋溢着幸福的笑容，忙碌地收割着这一年辛勤劳作的成果。

枫叶也在此时换上了艳丽的红装，漫山遍野，层林尽染，宛如一幅绚丽的画卷。

## 冬天

冬天，迈着沉稳的步伐悄然来临。

寒风凛冽，吹在脸上像刀割一般。

雪花纷纷扬扬地飘落下来，宛如天女散花，不一会儿，整个世界便银装素裹。

屋顶上、树枝上、大地上，都覆盖着一层厚厚的积雪，仿佛给大地披上了一件洁白的棉袄。

孩子们在雪地里欢快地玩耍，堆雪人、打雪仗，笑声回荡在整个冬日的天空。


`;

export default function Sse() {
    const [inputVal, setInputVal] = useState(defaultInput);
    const [md, setMd] = useState('');
    const [loading, loadingOps] = useBoolean(false);
    const [eventSource, setEventSource] = useState<null | sse.EventSource>(null);
    useEffect(() => {
        if (!eventSource) return;
        setMd('');
        eventSource.on('onMessage', (msg) => {
            console.log('onMessage', msg);
            if (msg.data) {
                const data = ResponseEntity.from<string>(JSON.parse(msg.data));
                console.log(data);
                if (data.getCode() === 0) {
                    const str = data.getData() ?? '';
                    setMd((old) => old + str);
                }
            }
        });
        eventSource.on('onError', (err) => {
            console.log('onError', err);
        });
        eventSource.on('onStatusChange', (status) => {
            if (status === 'close') {
            }
        });
        const headers: HeadersInit = {};
        const token = localStorage.getItem(xTokenName);
        if (token) headers.Authorization = `Bearer ${token}`;
        loadingOps.setTrue();
        eventSource
            .fetch(apiMap.AppController.sse.path, {
                method: apiMap.AppController.sse.method,
                headers,
                body: JSON.stringify({ data: inputVal, sleepTime: 50 }),
            })
            .catch((err) => {
                console.log('SSE ERR', err);
            })
            .finally(() => {
                loadingOps.setFalse();
            });
        return () => {
            eventSource.abort();
            loadingOps.setFalse();
            setMd('');
        };
    }, [eventSource]);
    const resolvedMd = loading ? md + `<span className="sse-loading"/>` : md;
    return (
        <div className="w-full flex flex-col gap-2">
            <Textarea
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="h-[400px]"
            />
            <Button
                onClick={() => {
                    eventSource?.abort();
                    setEventSource(new sse.EventSource());
                }}
            >
                Run
            </Button>
            <Markdown md={resolvedMd} />
        </div>
    );
}
