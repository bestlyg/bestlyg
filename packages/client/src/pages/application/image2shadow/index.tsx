import React from 'react';
import { Input } from '@/shadcn/ui/input';
import { Label } from '@/shadcn/ui/label';
import { useToast } from '@/shadcn/hooks/use-toast';

function getImageData(image: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const imageData = ctx.getImageData(0, 0, image.width, image.height).data;
    return imageData;
}

export default function Image2Shadow() {
    const { toast } = useToast();
    const [file, setFile] = React.useState<File | null>(null);
    const shadowRef = React.useRef<HTMLDivElement>({} as HTMLDivElement);
    const [options, setOptions] = React.useState<{
        imageData: number[];
        image: HTMLImageElement;
        blurPx: number;
    }>({
        imageData: [],
        image: new Image(),
        blurPx: 0,
    });
    React.useEffect(() => {
        console.log('Input File', file);
        if (!file || !shadowRef.current) return;
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.src = url;
        new Promise<void>((resolve, reject) => {
            image.onload = () => {
                console.log('image load success', image, image.width, image.height);
                toast({
                    title: 'Image load success',
                    description: `image load success, width : ${image.width} height : ${image.height}`,
                });
                resolve();
            };
            image.onerror = e => {
                console.log('image load error', e);
                toast({
                    variant: 'destructive',
                    title: 'Image load error',
                    description: `image load error, ${e.toString()}`,
                });
                reject();
            };
        }).then(() => {
            setOptions({
                image,
                imageData: Array.from(getImageData(image)),
                blurPx: 0,
            });
        });
    }, [file]);

    React.useLayoutEffect(() => {
        if (!shadowRef.current) return;
        console.log('options', options);
        const { image, imageData } = options;
        const dom: HTMLDivElement = shadowRef.current;
        dom.style.marginRight = image.width + 'px';
        dom.style.marginBottom = image.height + 'px';
        const shadowList: string[] = [];
        for (let i = 0; i < imageData.length; i += 4) {
            const [r, g, b, a] = [
                imageData[i],
                imageData[i + 1],
                imageData[i + 2],
                imageData[i + 3],
            ];
            const [widthOffset, heightOffset] = [
                (i / 4) % image.width,
                Math.floor(i / 4 / image.width),
            ];
            shadowList.push(
                `${widthOffset}px ${heightOffset}px  ${
                    options.blurPx
                }px 1px rgba(${r}, ${g}, ${b}, ${a / 255})`,
            );
        }
        dom.style.boxShadow = shadowList.join(',');
    }, [options]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full max-w-sm items-center gap-3">
                <Input
                    type="file"
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setFile(file);
                        }
                    }}
                    className="h-[32px] leading-3 w-[200px]"
                />
                <div className="flex items-center justify-center gap-1.5">
                    <Label htmlFor="BlurPx">BlurPx</Label>
                    <Input
                        type="number"
                        id="BlurPx"
                        className="w-[180px]"
                        value={options.blurPx}
                        onChange={e => {
                            console.log(e);
                            const num = Number(e.target.value);
                            if (!Number.isNaN(num)) {
                                setOptions({ ...options, blurPx: num });
                            }
                        }}
                    />
                </div>
            </div>
            <div ref={shadowRef} id="image2Shadow" style={{ width: 0, height: 0 }}></div>
        </div>
    );
}
