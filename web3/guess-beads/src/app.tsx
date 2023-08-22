import React, { useEffect } from 'react';
import { Beads } from '@/components/beads';
import { InfoDrawer } from '@/components/info-drawer';
import { useUrlCallback } from '@/hooks/useUrlCallback';
import { useStore } from '@/store';
import './global.css';

export default function App() {
    // window.lyg = useStore();
    useUrlCallback();
    const { initWallet, isSignedIn } = useStore();
    useEffect(() => {
        initWallet();
    }, []);
    return (
        <>
            <InfoDrawer />
            {isSignedIn() && <Beads />}
        </>
    );
}
