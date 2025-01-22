import { Button, ButtonProps } from '@/shadcn/ui/button';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function ScrollToTop({
    minHeight, // Height from which button will be visible
    scrollTo, // Height to go on scroll to top
    ...props
}: ButtonProps & { minHeight?: number; scrollTo?: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(document.documentElement.scrollTop >= (minHeight ?? 0));
        };

        onScroll();
        document.addEventListener('scroll', onScroll);

        return () => document.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Button
            onClick={() =>
                window.scrollTo({
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
