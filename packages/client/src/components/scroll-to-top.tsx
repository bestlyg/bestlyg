import { Button, ButtonProps } from '@/shadcn/ui/button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function ScrollToTop({
    minHeight, // Height from which button will be visible
    scrollTo, // Height to go on scroll to top
    getContainer = () => document,
    ...props
}: ButtonProps & {
    minHeight?: number;
    scrollTo?: number;
    getContainer?: () => Document | Element | null | undefined;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const container = getContainer();
        if (!container) return;
        const onScroll = (e?: Event) => {
            const target = e?.target;
            if (!target) return;
            let scrollTop = 0;
            if (target === document) {
                scrollTop = document.documentElement.scrollTop;
            } else {
                scrollTop = (target as Element).scrollTop;
            }
            setVisible(scrollTop >= (minHeight ?? 0));
        };
        container.addEventListener('scroll', onScroll);
        return () => container.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Button
            onClick={() => {
                const container = getContainer();
                const scrollToOptions: ScrollToOptions = {
                    top: scrollTo ?? 0,
                    behavior: 'smooth',
                };
                if (container === document) {
                    window.scrollTo(scrollToOptions);
                } else {
                    (container as Element).scrollTo(scrollToOptions);
                }
            }}
            {...props}
            className={clsx(
                visible ? `opacity-100` : 'opacity-0',
                'transition-all bg-[rgba(0,0,0,0.6)]',
                props.className,
            )}
        />
    );
}
