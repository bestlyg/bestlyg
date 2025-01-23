import { Button, ButtonProps } from '@/shadcn/ui/button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function ScrollToTop({
    minHeight, // Height from which button will be visible
    scrollTo, // Height to go on scroll to top
    getContainer = () => document.documentElement,
    ...props
}: ButtonProps & {
    minHeight?: number;
    scrollTo?: number;
    getContainer?: () => Element | null | undefined;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const container = getContainer();
        if (!container) return;
        const onScroll = () => {
            setVisible(container.scrollTop >= (minHeight ?? 0));
        };

        onScroll();
        container.addEventListener('scroll', onScroll);

        return () => container.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Button
            onClick={() =>
                getContainer()?.scrollTo({
                    top: scrollTo ?? 0,
                    behavior: 'smooth',
                })
            }
            {...props}
            className={clsx(
                visible ? `opacity-100` : 'opacity-0',
                'transition-all bg-[rgba(0,0,0,0.6)]',
                props.className,
            )}
        />
    );
}
