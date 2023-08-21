import React, { useEffect } from 'react';
import { SignInPrompt, SignOutButton } from '@/components/wallet';
import { Beads } from '@/components/beads';
import { InfoDrawer } from '@/components/info-drawer';
import { useStore } from '@/store';
import './global.css';

export default function App() {
    window.lyg = useStore();
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
