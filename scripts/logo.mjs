import '@bestlyg/cli/globals';

const logo = await figletx('bestlyg'.toUpperCase(), {
    font: 'Doh',
    whitespaceBreak: true,
});

echo`${logo}`;
