const React = require('react');

function App() {
    const [v, setV] = React.useState(1);
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

module.exports = { App };
