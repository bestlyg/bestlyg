function App() {
    const [v, setV] = React.useState(1);
    React.useEffect(() => {
        // const timeout = setInterval(() => {
        //     console.log('1');
        // }, 1000);
        // return () => {
        //     console.log('unmount interval');
        //     clearInterval(timeout);
        // };
        console.log('useeffect', v);
    }, [v]);
    return React.createElement(
        'div',
        {
            onClick: () => {
                setV(v + 1);
            },
        },
        '[',
        v + '',
        ']'
    );
}

export { App };
